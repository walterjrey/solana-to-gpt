from fastapi import APIRouter, Header
from fastapi.responses import StreamingResponse
from services.tokens import get_tags, get_tokens_by_tag
from services.embeddings import search_on_token_index
from models.messages import MessageList
from services.streams import response_stream
from databases.pg import insert_stat
from typing import Annotated
from cachetools import cached, TTLCache

router = APIRouter()

@cached(cache=TTLCache(maxsize=1024, ttl=12 * 60 * 60))
@router.post("/stream")
async def solana_to_gpt(payload: MessageList, X_Solana_Key: Annotated[str | None, Header()] = None):
    print(payload)
    payload_dict = payload.dict()
    insert_stat("token_interaction", payload_dict["token"], X_Solana_Key)
    try:
        return StreamingResponse(response_stream(payload_dict, {}))
    except Exception as err:
        print(err)
        return {'error': "Error getting stream"}, 500

