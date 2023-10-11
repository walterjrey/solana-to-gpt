from llama_hub.web.async_web.base import AsyncWebPageReader
from llama_index import download_loader
from utils.documents import parse_document
from langchain.embeddings import OpenAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import FAISS
from langchain.docstore.document import Document
from langchain.embeddings.spacy_embeddings import SpacyEmbeddings
import dotenv
import logging
import openai
import pickle
import spacy.cli
import json
from models.meta import Coin
from utils.documents import download_tmp_file, remove_tmp_file
from urllib.parse import urlparse
from pathlib import Path
import os
from transformers import pipeline
from transformers import AutoTokenizer, TFPegasusForConditionalGeneration, TFBartForConditionalGeneration
from transformers import TFBartModel
import tensorflow as tf
from services.coinmarketcap import get_solana_coins

dotenv.load_dotenv()

OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
GPT_MODEL = "gpt-3.5-turbo-16k-0613"



#spacy.cli.download("en_core_web_sm")

def create_embeddings_for_token(token: str, links: {}, twitter_docs: list[str], token_name: str):
    print(links)
    documents = []
    if len(links['links']) > 0:
        try:
            BeautifulSoupWebReader = download_loader("BeautifulSoupWebReader")
            loader = BeautifulSoupWebReader()
            documents_web = loader.load_data(urls=links['links'])
            documents.extend(documents_web)
        except Exception as err:
            print(f"LINKS: {err}")

    if len(links['pdfs']) > 0:
        PDFReader = download_loader("PDFReader")
        loader = PDFReader()
        for link in links['pdfs']:
            path = urlparse(link).path
            splitedPath = path.split('/')
            filename = f"tmp/{splitedPath[len(splitedPath) - 1]}"
            try:
                print(filename, link)
                download_tmp_file(link, filename)
                documents_pdf = loader.load_data(file=Path(filename))
                print(documents_pdf)
                documents.extend(documents_pdf)
                remove_tmp_file(filename)
            except Exception as err:
                print(f"pdfs: {err}")
                #return False
                

    if len(links['docs']) > 0:
        DocxReader = download_loader("DocxReader")
        loader = DocxReader()
        for link in links['docs']:
            path = urlparse(link).path
            splitedPath = path.split('/')
            filename = f"tmp/{splitedPath[len(splitedPath) - 1]}"
            try:
                download_tmp_file(link, filename)
                documents_word = loader.load_data(file=Path(filename))
                documents.extend(documents_word)
                remove_tmp_file(filename)
            except Exception as err:
                print(f"docs: {err}")
                #return False

    if len(links['txts']) > 0:
        TXTReader = download_loader("TXTReader")
        loader = TXTReader()
        for link in links['txts']:
            path = urlparse(link).path
            splitedPath = path.split('/')
            filename = f"tmp/{splitedPath[len(splitedPath) - 1]}"
            try:
                download_tmp_file(link, filename)
                documents_txt = loader.load_data(file=Path(filename))
                documents.extend(documents_txt)
                remove_tmp_file(filename)
            except Exception as err:
                print(f"txts: {err}")
                #return False

    document = parse_document(documents)

    source_documents = []

    splitter = RecursiveCharacterTextSplitter(
        length_function=len,
        chunk_size=1024,
        chunk_overlap=500
    )

    summary = ""
    openai_summary = []

    chunks = splitter.split_text(document)
    print("chunks count: " + str(len(chunks)))
    current = 0
    for chunk in chunks:
        current += 1
        print("current chunk: " + str(current) + " of " + str(len(chunks)))
        summary += "\n\n" + chunk

        if len("".join(openai_summary)) <= 10000:
            system_prompt = f"""
            The user will provide you with a transcription of a documentation of Token called {token_name} from the Solana Network.
            Your goal is to create a list highlighting the main points described
            in the transcription.

            And, in the end, compile a summary containing all relevant information.
            """

            messages = [{"role": "system", "content": system_prompt},
                        {"role": "user", "content": chunk[:1023]}]

            completion = openai.ChatCompletion.create(
                model=GPT_MODEL,
                messages=messages
            )

            openai_summary.append(completion.choices[0].message['content'])
            
    with open(f"data/tokens/{token}/openai_summary.txt", 'w') as f:
        print(openai_summary)
        f.write("\n\n".join(openai_summary))


    chunks = splitter.split_text(summary + "\n\n".join(openai_summary))
    for chunk in chunks:
        source_documents.append(
            Document(page_content=chunk)
        )

    system_prompt = f"""
    The user will provide you with a list of summaries regarding
    the transcription of a documentation of a Token called {token_name} from the Solana Network.

    Your objective is to infer the relevant information
    and create a summary in about 50 words.

    IT IS VERY IMPORTANT THAT THE SUMMARY USE AT MOST 50 WORDS.
    """
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": "\n\n".join(openai_summary)}
    ]

    completion = openai.ChatCompletion.create(
        model=GPT_MODEL,
        messages=messages
    )
    finalSummary = completion.choices[0].message['content']

    with open(f"data/tokens/{token}/summary.txt", 'w') as f:
        f.write(finalSummary)


    with open(f"data/tokens/{token}/content.txt", 'w') as f:
        f.write(summary + "\n\n".join(openai_summary) + "\n\n" + summary + "\n\n" + "\n\n".join(twitter_docs))

    for twit in twitter_docs:
        if twit == '':
            continue
        source_documents.append(
            Document(page_content=twit)
        ) 

    if len(source_documents) > 0:
        try:
            embeddings_generator = SpacyEmbeddings()
            faiss_index = FAISS.from_documents(source_documents, embeddings_generator)
            index_file_path = f"data/tokens/{token}/index.pkl"

            with open(index_file_path, 'wb') as f:
                pickle.dump(faiss_index, f)
        except Exception as err:
            print(f"embeddings: {err}")

def create_embeddings_index():
    documents = []

    coins = get_solana_coins()

    splitter = RecursiveCharacterTextSplitter(
        length_function=len,
        chunk_size=500,
        chunk_overlap=50
    )

    for coin in coins:
        if coin.is_active == 1:
            token_address = coin.platform.token_address
            metadata = {"token": token_address}
            with open(f"data/tokens/{token_address}/content.txt") as f:
                contents = f.read()
                chunks = splitter.split_text(contents)
                for chunk in chunks:
                    documents.append(
                        Document(page_content=chunk, metadata=metadata)
                    )
                    print(chunk, token_address)

    embeddings_generator = SpacyEmbeddings()
    faiss_index = FAISS.from_documents(documents, embeddings_generator)

    index_file_path = f"data/index.pkl"

    with open(index_file_path, 'wb') as f:
        pickle.dump(faiss_index, f)


def rebuild_tokens_indexes():
    coins = get_solana_coins()

    splitter = RecursiveCharacterTextSplitter(
        length_function=len,
        chunk_size=500,
        chunk_overlap=50
    )

    embeddings_generator = SpacyEmbeddings()

    for coin in coins:
        if coin.is_active == 1:
            token_address = coin.platform.token_address
            documents = []
            print(f"""Rebuilding index for {token_address}""")
            with open(f"data/tokens/{token_address}/content.txt") as f:
                contents = f.read()
                chunks = splitter.split_text(contents)
                for chunk in chunks:
                    documents.append(
                        Document(page_content=chunk)
                    )
                
                try:
                    faiss_index = FAISS.from_documents(documents, embeddings_generator)
                    index_file_path = f"data/tokens/{token_address}/index.pkl"

                    with open(index_file_path, 'wb') as f:
                        pickle.dump(faiss_index, f)
                except Exception as err:
                    print(f"embeddings: {err}")


def search_on_token_index(token: str, query: str):
    results = []

    metadata_path = f"data/tokens/{token}/meta.json"
    with open(metadata_path, 'r') as f:
        metadata = json.load(f)

    quote_path = f"data/tokens/{token}/quote.json"
    with open(quote_path, 'r') as f:
        quote = json.load(f)

    index_file_path = f"data/tokens/{token}/index.pkl"

    if os.path.isfile(index_file_path) is False:
        return {'results': results, 'meta': metadata, 'quote': quote}

    with open(index_file_path, "rb") as index_file:
        search_index = pickle.load(index_file)

    results_with_scores = search_index.similarity_search_with_score(query, k=6)
    print("similarity_search_with_score query", query)
    for doc, score in results_with_scores:
        print(doc.page_content, score)
        results.append({'doc': doc.page_content, 'score': str(score)})

    return {'results': results, 'meta': metadata, 'quote': quote}

def search_on_index(query: str):
    results = []
    index_file_path = f"data/index.pkl"
    with open(index_file_path, "rb") as index_file:
        search_index = pickle.load(index_file)

    results_with_scores = search_index.similarity_search_with_score(query, k=10)
    for doc, score in results_with_scores:
        print(doc, score)
        results.append({'doc': doc.page_content, 'metadata': doc.metadata, 'score': str(score)})

    return results
