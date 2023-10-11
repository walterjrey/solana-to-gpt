import requests
import json
import dotenv
import logging
import os
from models import coinmarketcap
from models.meta import Cryptocurrency, ApiResponseMeta, Coin
from cachetools import cached, LRUCache, TTLCache
import time

dotenv.load_dotenv()

CMC_BASE_URL = os.getenv("CMC_BASE_URL")
CMC_BASE_URL_V2 = os.getenv("CMC_BASE_URL_V2")

CMC_KEY = os.getenv("CMC_KEY")

HEADETRS = {
    'Accepts': 'application/json',
    'X-CMC_PRO_API_KEY': CMC_KEY,
}

def get_cmc_map():
    url = f"{CMC_BASE_URL}/cryptocurrency/map"

    response = requests.get(url, headers=HEADETRS)

    if response.status_code == 200:
        with open('data/cryptocurrency_data.json', 'w') as f:
            json.dump(response.json(), f, indent=4)
    else:
        print(f"Error: {response.status_code}")



def get_cmc_fiat():
    url = f"{CMC_BASE_URL}/fiat/map?include_metals=true"

    response = requests.get(url, headers=HEADETRS)

    if response.status_code == 200:
        with open('fiat.json', 'w') as f:
            json.dump(response.json(), f, indent=4)
    else:
        print(f"Error: {response.status_code}")


def get_cmc_exchange():
    url = f"{CMC_BASE_URL}/exchange/map"

    response = requests.get(url, headers=HEADETRS)

    if response.status_code == 200:
        with open('exchange_map.json', 'w') as f:
            json.dump(response.json(), f, indent=4)
    else:
        print(f"Error: {response.status_code}")
         

def get_cmc_categories():
    url = f"{CMC_BASE_URL}/cryptocurrency/categories"

    response = requests.get(url, headers=HEADETRS)

    if response.status_code == 200:
        with open('categories.json', 'w') as f:
            json.dump(response.json(), f, indent=4)
    else:
        print(f"Error: {response.status_code}")

@cached(cache=TTLCache(maxsize=1024, ttl=12 * 60 * 60))
def read_cmc_categories():
    with open('data/categories.json', 'r') as f:
        data = json.load(f)
        return data


def get_cmc_category():
    categories = read_cmc_categories()

    coins = []

    for cat in categories['data']:
        url = f"{CMC_BASE_URL}/cryptocurrency/category?symbol=SOL"# + cat['id']

        response = requests.get(url, headers=HEADETRS)

        if response.status_code == 200:
            data = response.json()
            print(data)
            if 'coins' in data['data']:
                for coin in data['data']['coins']:
                    if coin['platform'] is not None and coin['platform']['name'] == 'Solana':
                        coins.append(coin)
            else:
                if 'platform' in data and data['platform']['name'] == 'Solana':
                        coins.append(data)
        else:
            print(f"Error: {response.status_code}")

        time.sleep(15)

    with open(f"data/category_solana.json", 'w') as f:
        json.dump(coins, f, indent=4)


def get_cmc_quota(category: str):
    headers = {
    'Accepts': 'application/json',
    'X-CMC_PRO_API_KEY': CMC_KEY,
    }

    url = f"{CMC_BASE_URL_V2}/cryptocurrency/quotes/latest?id=" + category

    response = requests.get(url, headers=HEADETRS)

    if response.status_code == 200:
        with open('category_quota.json', 'w') as f:
            json.dump(response.json(), f, indent=4)
    else:
        print(f"Error: {response.status_code}")


def get_cmc_quota(id: str):
    url = f"{CMC_BASE_URL}/exchange/assets?id=" + id

    response = requests.get(url, headers=HEADETRS)

    if response.status_code == 200:
        with open('asset_quota.json', 'w') as f:
            json.dump(response.json(), f, indent=4)
    else:
        print(f"Error: {response.status_code}")
 


def get_cmc_conversions(id: str):
    url = f"{CMC_BASE_URL_V2}/tools/price-conversion?amount=1&id=" + id

    response = requests.get(url, headers=HEADETRS)

    if response.status_code == 200:
        with open('conversions.json', 'w') as f:
            json.dump(response.json(), f, indent=4)
    else:
        print(f"Error: {response.status_code}") 
 
 

@cached(cache=TTLCache(maxsize=1024, ttl=12 * 60 * 60))
def get_solana_coins():
    cryptocurrencies = []
    with open('data/cryptocurrency_data.json', 'r') as f:
        data = json.load(f)
        for item in data['data']:
            platform_data = item.get('platform')
            if platform_data:
                platform = coinmarketcap.Platform(**platform_data)
                if platform.name == "Solana":
                    item.pop('platform', None)
                    cryptocurrency = coinmarketcap.Cryptocurrency(platform=platform, **item)
                    cryptocurrencies.append(cryptocurrency)

    return cryptocurrencies


@cached(cache=TTLCache(maxsize=1024, ttl=12 * 60 * 60))
def get_solana_coins_with_price():
    cryptocurrencies = []
    with open('data/cryptocurrency_data.json', 'r') as f:
        data = json.load(f)
        for item in data['data']:
            platform_data = item.get('platform')
            if platform_data and platform_data['name'] == "Solana":
                quote = read_token_quote(platform_data['token_address'], item['id'])
                meta = read_token_metadata(platform_data['token_address'], item['id'])
                cryptocurrencies.append({'data': item, 'meta': meta, 'quote': quote})

    return cryptocurrencies

@cached(cache=TTLCache(maxsize=1024, ttl=12 * 60 * 60))
def read_cmc_tokens():
    with open('data/category_solana.json', 'r') as f:
        data = json.load(f)
        return data
    
def get_cmc_category_quote(category: str, token: str):
    url = f"{CMC_BASE_URL_V2}/cryptocurrency/quotes/latest?id=" + str(category)
    response = requests.get(url, headers=HEADETRS)

    if response.status_code == 200:
        with open(f"data/tokens/{token}/quote.json", 'w') as f:
            print(response.json())
            json.dump(response.json(), f, indent=4)
    else:
        print(f"Error: {response.status_code}")


@cached(cache=TTLCache(maxsize=1024, ttl=12 * 60 * 60))
def read_token_quote(token: str, id: str):
    if os.path.isfile(f"data/tokens/{token}/quote.json") is False:
        if os.path.isdir(f"data/tokens/{token}") is False:
            os.makedirs(f"data/tokens/{token}")
        get_cmc_category_quote(id, token)
        
    with open(f"data/tokens/{token}/quote.json", 'r') as f:
        metadata = json.load(f)

        return metadata


def get_cmc_category_meta(category: str):
    url = f"{CMC_BASE_URL_V2}/cryptocurrency/info?id=" + str(category)
    response = requests.get(url, headers=HEADETRS)

    if response.status_code == 200:
        data = response.json()
        #meta = ApiResponseMeta(**data)
        print(data)
        _, metadata = next(iter(data['data'].items()))
        token = metadata['platform']['token_address']
        
        with open(f"data/tokens/{token}/meta.json", 'w') as f:
            json.dump(metadata, f, indent=4)

        get_cmc_category_quote(category, token)
        return True
    else:
        print(f"Error: {response.status_code}")
        return False

    
@cached(cache=TTLCache(maxsize=1024, ttl=12 * 60 * 60))
def read_token_metadata(token: str, id: str):
    if os.path.isfile(f"data/tokens/{token}/meta.json") is False:
        if os.path.isdir(f"data/tokens/{token}") is False:
            os.makedirs(f"data/tokens/{token}")
        created = get_cmc_category_meta(id)
        if created is False:
            return None
        
    with open(f"data/tokens/{token}/meta.json", 'r') as f:
        metadata = json.load(f)

        return metadata


def reload_tokens_price():
    categories = []
    with open('data/cryptocurrency_data.json', 'r') as f:
        data = json.load(f)
        for item in data['data']:
            platform_data = item.get('platform')
            if platform_data and platform_data['name'] == "Solana":
                categories.append(str(item['id']))


    url = f"{CMC_BASE_URL_V2}/cryptocurrency/quotes/latest?id=" + ','.join(categories)
    response = requests.get(url, headers=HEADETRS)

    if response.status_code == 200:
        data = response.json()
        for _, value in data['data'].items():
            print(f"Name: {value['name']}")
            print(f"Name: {value['quote']['USD']['price']}")
            token = value['platform']['token_address']
            if os.path.isdir(f"data/tokens/{token}") is not False:
                with open(f"data/tokens/{token}/quote.json", 'w') as f:
                    json.dump(value, f, indent=4)

        with open(f"data/quotes.json", 'w') as f:
            print(response.json())
            json.dump(response.json(), f, indent=4)
    else:
        print(f"Error: {response.status_code}")


def reload_tokens_meta():
    categories = []
    with open('data/cryptocurrency_data.json', 'r') as f:
        data = json.load(f)
        for item in data['data']:
            platform_data = item.get('platform')
            if platform_data and platform_data['name'] == "Solana":
                categories.append(str(item['id']))

    url = f"{CMC_BASE_URL_V2}/cryptocurrency/info?id=" + ','.join(categories)
    response = requests.get(url, headers=HEADETRS)

    if response.status_code == 200:
        data = response.json()
        for _, value in data['data'].items():
            print(f"Name: {value['name']}")
            token = value['platform']['token_address']
            with open(f"data/tokens/{token}/meta.json", 'w') as f:
                json.dump(value, f, indent=4)

        with open(f"data/metas.json", 'w') as f:
            json.dump(response.json(), f, indent=4)
    else:
        print(f"Error: {response.status_code}")



