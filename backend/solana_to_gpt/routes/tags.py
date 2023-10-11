from fastapi import APIRouter, Header
from services.tokens import get_tags, get_tokens_by_tag
from databases.pg import insert_stat
from typing import Annotated
from cachetools import cached, TTLCache

router = APIRouter()

@cached(cache=TTLCache(maxsize=1024, ttl=4 * 60 * 60))
@router.get("/")
async def tags():
    return get_tags()

@cached(cache=TTLCache(maxsize=1024, ttl=4 * 60 * 60))
@router.get("/{tag}")
async def search_by_tags(tag: str, X_Solana_Key: Annotated[str | None, Header()] = None):
    insert_stat("tags", tag, X_Solana_Key)
    return get_tokens_by_tag(tag)