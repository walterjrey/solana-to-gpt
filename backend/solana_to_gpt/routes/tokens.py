from fastapi import APIRouter, Header
from services import coinmarketcap
from services.tokens import get_inc_dec_top, get_inc_dec_top_volume, get_token_summary, get_pdfs
from databases.pg import get_prices, insert_stat
from cachetools import cached, TTLCache
from datetime import datetime, date, timedelta
from services.prices import forecast_multistep, prophet_prices_prediction
from typing import Annotated

router = APIRouter()

@cached(cache=TTLCache(maxsize=1024, ttl=4 * 60 * 60))
@router.get("/")
async def get_tokens():
    return coinmarketcap.get_solana_coins()


@router.get("/info/{token}")
async def get_token_info(token: str, X_Solana_Key: Annotated[str | None, Header()] = None):
    insert_stat("tokens", token, X_Solana_Key)
    meta = coinmarketcap.read_token_metadata(token, "")
    quote = coinmarketcap.read_token_quote(token, "")
    about = get_token_summary(token)
    prices = get_prices(token)
    pdfs = get_pdfs(token)
    
    pricesValue = []
    for price in prices:
        pricesValue.append([price[6], price[2]])

    predictions = prophet_prices_prediction(pricesValue, 7)

    return {'meta': meta, 'quote': quote, 'prices': prices, 'pricesPrediction': predictions, 'about': about, 'pdfs': pdfs}


@router.get("/meta/{token}")
async def get_tokens(token: str):
    meta = coinmarketcap.read_token_metadata(token, "")
    quote = coinmarketcap.read_token_quote(token, "")
    prices = get_prices(token)
    return {'meta': meta, 'quote': quote, 'prices': prices}

@cached(cache=TTLCache(maxsize=1024, ttl=4 * 60 * 60))
@router.get("/load-tokens-inc-dec")
async def get_tokens_inc_dec():
    up, down = get_inc_dec_top()
    up_array = []
    down_array = []

    for u in up:
        up_array.append({
            'name': u['data']['name'],
            'symbol': u['data']['symbol'],
            'token_address': u['data']['platform']['token_address'],
            'logo': u['meta']['logo'],
            'percent': u['quote']['quote']['USD']['percent_change_24h'],
            'direction': 'increase'
        })

    for d in down:
        down_array.append({
            'name': d['data']['name'],
            'symbol': d['data']['symbol'],
            'token_address': d['data']['platform']['token_address'],
            'logo': d['meta']['logo'],
            'percent': d['quote']['quote']['USD']['percent_change_24h'],
            'direction': 'decrease'
        })


    upv, downv = get_inc_dec_top_volume()
    upv_array = []
    downv_array = []

    for u in upv:
        upv_array.append({
            'name': u['data']['name'],
            'symbol': u['data']['symbol'],
            'token_address': u['data']['platform']['token_address'],
            'logo': u['meta']['logo'],
            'percent': u['quote']['quote']['USD']['volume_change_24h'],
            'direction': 'increase'
        })

    for d in downv:
        downv_array.append({
            'name': d['data']['name'],
            'symbol': d['data']['symbol'],
            'token_address': d['data']['platform']['token_address'],
            'logo': d['meta']['logo'],
            'percent': d['quote']['quote']['USD']['volume_change_24h'],
            'direction': 'decrease'
        })

    return {'up': up_array, 'down': down_array, 'upv': upv_array, 'downv': downv_array}

