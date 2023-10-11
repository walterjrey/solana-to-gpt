import re
import os
import requests
from langchain.docstore.document import Document
from urllib.request import urlretrieve

def parse_document(documents: list[Document]):
    document = ""
    for doc in documents:
        document += doc.text

    document = document.replace(".\n", "[SEP.]")
    document = document.replace(":\n", "[SEP:]")
    document = document.replace("- \n", "[SEP-]")
    document = re.sub(
        r'([a-z]) ([A-Z])([a-z]+) ([a-z])',
        r'\1\n\2\3 \4',
        document
    )
    document = document.replace("\n", " ")
    document = re.sub(' +', ' ', document)
    document = document.replace("[SEP.]", ".\n")
    document = document.replace("[SEP:]", ":\n")
    document = document.replace("[SEP-]", "- ")

    return document

def download_tmp_file(url: str, filename: str):
    print(f"download_tmp_file ------------> {filename} {url}")
    response = requests.get(url)
    with open(filename, 'wb') as f:
        f.write(response.content)


def remove_tmp_file(filename: str):
    if os.path.isfile(filename):
        os.remove(filename)
