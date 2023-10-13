import json
import os
from services import coinmarketcap
from services.embeddings import create_embeddings_for_token
from services.web import get_web_links, get_latest_post_twitter

def create_token_metadata(token:str, id: str):
    print(f"Creating token metadata for {token}")
    if os.path.isfile(f"data/tokens/{token}/content.txt") is True:
        return

    meta = coinmarketcap.read_token_metadata(token, id)
    links = {'links': [], 'pdfs': [], 'docs': [], 'txts': []}
    base_links = []

    if meta['urls'] is not None and meta['urls']['website'] is not None:
        if len(meta['urls']['website'] ) > 0:
            base_links.append(meta['urls']['website'] [0])

    if meta['urls'] is not None and meta['urls']['facebook'] is not None:
        if len(meta['urls']['facebook']) > 0:
            base_links.append(meta['urls']['facebook'][0])

    if meta['urls'] is not None and meta['urls']['technical_doc'] is not None:
        if len(meta['urls']['technical_doc']) > 0:
            base_links.append(meta['urls']['technical_doc'][0])

    for lnk in base_links:
        current_links = get_web_links(lnk)
        with open(f"data/tokens/{token}/links.json", 'w') as f:
            json.dump(links, f, indent=4)
            
        links['links'].extend(current_links['links'])
        links['pdfs'].extend(current_links['pdfs'])
        links['docs'].extend(current_links['docs'])
        links['txts'].extend(current_links['txts'])

    if meta['urls'] is not None and meta['urls']['twitter'] is not None:
        if len(meta['urls']['twitter'])  > 0:
            twitter_docs = get_latest_post_twitter(meta['urls']['twitter'][0])

    create_embeddings_for_token(token, links, twitter_docs, meta['name'])

    return False