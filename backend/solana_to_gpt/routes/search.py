from fastapi import APIRouter, Header
from services.embeddings import search_on_token_index, search_on_index
from services.tokens import get_tokens_by_tag, get_tokens_by_addresses, get_tokens_with_title_or_description, get_tokens_by_stats
from databases.pg import insert_stat
from typing import Annotated
from cachetools import cached, TTLCache

router = APIRouter()

@cached(cache=TTLCache(maxsize=1024, ttl=4 * 60 * 60))
@router.get("/tokens/stats")
async def get_all_by_stats(query: str):
    return get_tokens_by_stats()

@cached(cache=TTLCache(maxsize=1024, ttl=4 * 60 * 60))
@router.get("/tokens/{kind}")
async def get_tokens(kind: str, query: str, X_Solana_Key: Annotated[str | None, Header()] = None):
    if kind == "tag":
        insert_stat("tags", query, X_Solana_Key)
        return get_tokens_by_tag(query)
    else:
        result = []
        result_by_title_or_description = get_tokens_with_title_or_description(query)
        result.extend(result_by_title_or_description)
        used_addresses = [item['token_address'] for item in result_by_title_or_description]

        result_by_embeddings = search_on_index(query)
        
        tokens_addresses = []
        for doc in result_by_embeddings:
            if doc['metadata']['token'] not in used_addresses:
                tokens_addresses.append(doc['metadata']['token'])

        result_by_addresses = get_tokens_by_addresses(tokens_addresses)
        result.extend(result_by_addresses)
        
        return result



@router.get("/{token}")
async def serch_token(token: str, query: str):
    return search_on_token_index(token, query)

