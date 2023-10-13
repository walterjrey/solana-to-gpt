from services.coinmarketcap import read_token_quote, read_token_metadata, get_solana_coins
from services.web import get_stats_from_solana
from databases.pg import insert_price, get_stats_rank, get_count_stats
from services.sessions import create_token_metadata
from cachetools import cached, TTLCache
from models.tag import Tag
from services import coinmarketcap
from services.web import get_web_links
import json

@cached(cache=TTLCache(maxsize=1024, ttl=7 * 24 * 60 * 60))
def get_token_summary(token: str):
    with open(f"data/tokens/{token}/summary.txt") as f:
        contents = f.read()
        return contents
    
@cached(cache=TTLCache(maxsize=1024, ttl=12 * 60 * 60))
def get_pdfs(token: str):
    pdfs = []
    with open(f"data/tokens/{token}/links.json", 'r') as f:
        links  = json.load(f)
        if "pdfs" in links and len(links["pdfs"]) > 0:
            for pdf in links["pdfs"]: 
                if pdf not in pdfs:
                    pdfs.append(pdf)

    return pdfs


#@cached(cache=TTLCache(maxsize=1024, ttl=12 * 60 * 60))
def get_tokens_by_stats():
    addresses_int = []
    addresses_vis = []

    tokens_interactions = get_stats_rank("token_interaction", 3)
    for tk in tokens_interactions:
        addresses_int.append(tk[0])

    tokens_visit = get_stats_rank("tokens", 6)
    for tkv in tokens_visit:
        if tkv[0] not in addresses_int and len(addresses_vis) < 3:
            addresses_vis.append(tkv[0])
    
    tokens = coinmarketcap.get_solana_coins_with_price()
    filtered_int = [item for item in tokens if item['meta'] is not None and item['meta']['platform']['token_address'] in addresses_int]
    results = []
    for item in filtered_int:
        direction = 'increase'
        if item['quote']['quote']['USD']['percent_change_24h'] < 0:
            direction = 'decrease'
        results.append({
            'name': item['meta']['name'],
            'symbol': item['meta']['symbol'],
            'price': item['quote']['quote']['USD']['price'],
            'percent_change_24h': item['quote']['quote']['USD']['percent_change_24h'],
            'direction': direction,
            'logo': item['meta']['logo'],
            'token_address': item['data']['platform']['token_address'],
            'description': item['meta']['description'],
            'result_type': 'Top Interactions'
        })
    filtered_vis = [item for item in tokens if item['meta'] is not None and item['meta']['platform']['token_address'] in addresses_vis]
    for item in filtered_vis:
        direction = 'increase'
        if item['quote']['quote']['USD']['percent_change_24h'] < 0:
            direction = 'decrease'
        results.append({
            'name': item['meta']['name'],
            'symbol': item['meta']['symbol'],
            'price': item['quote']['quote']['USD']['price'],
            'percent_change_24h': item['quote']['quote']['USD']['percent_change_24h'],
            'direction': direction,
            'logo': item['meta']['logo'],
            'token_address': item['data']['platform']['token_address'],
            'description': item['meta']['description'],
            'result_type': 'Top visited'
        })

    return results

#@cached(cache=TTLCache(maxsize=1024, ttl=12 * 60 * 60))
def get_inc_dec_top():
    tokens = coinmarketcap.get_solana_coins_with_price()
    tokens.sort(key=lambda x: x['quote']['quote']['USD']['percent_change_24h'])
    down = tokens[:2]
    up = tokens[-2:][::-1]
    return up, down

#@cached(cache=TTLCache(maxsize=1024, ttl=12 * 60 * 60))
def get_inc_dec_top_volume():
    tokens = coinmarketcap.get_solana_coins_with_price()
    tokens.sort(key=lambda x: x['quote']['quote']['USD']['volume_change_24h'])
    down = tokens[:2]
    up = tokens[-2:][::-1]
    return up, down

#@cached(cache=TTLCache(maxsize=1024, ttl=12 * 60 * 60))
def get_tokens_with_title_or_description(query: str):
    tokens = coinmarketcap.get_solana_coins_with_price()
    filtered = []
    for item in tokens:
        found = False
        if query in item['meta']['name'] or query in item['meta']['description'] or (item['meta']['tags'] is not None and query in item['meta']['tags']):
            found = True
        with open(f"data/tokens/{item['data']['platform']['token_address']}/content.txt") as f:
            contents = f.read()
            if query in contents:
                found = True
        if found == True:
            filtered.append(item)                                                                            

    filtered.sort(key=lambda x: x['meta']['name'])
    results = []
    for item in filtered:
        direction = 'increase'
        if item['quote']['quote']['USD']['percent_change_24h'] < 0:
            direction = 'decrease'
        results.append({
            'name': item['meta']['name'],
            'symbol': item['meta']['symbol'],
            'price': item['quote']['quote']['USD']['price'],
            'percent_change_24h': item['quote']['quote']['USD']['percent_change_24h'],
            'direction': direction,
            'logo': item['meta']['logo'],
            'token_address': item['data']['platform']['token_address'],
            'description': item['meta']['description'],
            'result_type': 'Token Medatada'
        })

    return results


#@cached(cache=TTLCache(maxsize=1024, ttl=12 * 60 * 60))
def get_tokens_by_addresses(addresses: list[str]):
    tokens = coinmarketcap.get_solana_coins_with_price()
    filtered = [item for item in tokens if item['meta'] is not None and item['meta']['platform']['token_address'] in addresses]
    filtered = sorted(filtered, key=lambda x: addresses.index(x['meta']['platform']['token_address']))
    results = []
    for item in filtered:
        direction = 'increase'
        if item['quote']['quote']['USD']['percent_change_24h'] < 0:
            direction = 'decrease'
        results.append({
            'name': item['meta']['name'],
            'symbol': item['meta']['symbol'],
            'price': item['quote']['quote']['USD']['price'],
            'percent_change_24h': item['quote']['quote']['USD']['percent_change_24h'],
            'direction': direction,
            'logo': item['meta']['logo'],
            'token_address': item['data']['platform']['token_address'],
            'description': item['meta']['description'],
            'result_type': 'Similarity Search'
        })

    return results

@cached(cache=TTLCache(maxsize=1024, ttl=12 * 60 * 60))
def get_tokens_by_tag(tag: str):
    tokens = coinmarketcap.get_solana_coins_with_price()
    filtered = [item for item in tokens if item['meta']['tags'] is not None and tag in item['meta']['tags']]
    filtered.sort(key=lambda x: x['meta']['name'])
    results = []
    for item in filtered:
        direction = 'increase'
        if item['quote']['quote']['USD']['percent_change_24h'] < 0:
            direction = 'decrease'
        results.append({
            'name': item['meta']['name'],
            'symbol': item['meta']['symbol'],
            'price': item['quote']['quote']['USD']['price'],
            'percent_change_24h': item['quote']['quote']['USD']['percent_change_24h'],
            'direction': direction,
            'logo': item['meta']['logo'],
            'token_address': item['data']['platform']['token_address'],
            'description': item['meta']['description'],
            'result_type': 'Tag Search'
        })

    return results


def scrape_token_web_links():
    coins = get_solana_coins()
    for coin in coins:
        if coin.is_active == 1:
            token_address = coin.platform.token_address
            meta = read_token_metadata(token_address, coin.id)
            if meta is not None and meta['urls'] is not None and meta['urls']['website'] is not None:
                if len(meta['urls']['website']) > 0:
                    links = get_web_links(meta['urls']['website'][0])
                    with open(f"data/tokens/{token_address}/links.json", 'w') as f:
                        json.dump(links, f, indent=4)

def update_prices_hourly():
    print("Starting update_prices_hourly")
    coins = get_solana_coins()
    for coin in coins:
        if coin.is_active == 1:
            token_address = coin.platform.token_address
            print(token_address)
            values = get_stats_from_solana(token_address)
            if values['price'] is not None:
                insert_price(token_address, 
                                values['price'], 
                                values['market_cap'], 
                                values['24_hour_volume'], 
                                values['direction'])


def update_prices_daily():
    coinmarketcap.reload_tokens_price()
    coins = get_solana_coins()
    print("Starting update_prices_daily for " + str(len(coins)) + " coins.")
    for coin in coins:
        if coin.is_active == 1:
            token_address = coin.platform.token_address
            quote = read_token_quote(token_address, coin.id)
            if quote['quote']['USD']['price'] is not None:
                direction = ''
                if quote['quote']['USD']['volume_change_24h'] > 0:
                    direction = 'up'
                else:
                    direction = 'down'
                insert_price(token_address, 
                    quote['quote']['USD']['price'], 
                    quote['quote']['USD']['market_cap'], 
                    quote['quote']['USD']['volume_24h'], 
                    direction)
            else:
                values = get_stats_from_solana(token_address)
                if values['price'] is not None:
                    insert_price(token_address, 
                                 values['price'], 
                                 values['market_cap'], 
                                 values['24_hour_volume'], 
                                 values['direction'])
                    

def update_metas():
    coins = get_solana_coins()
    for coin in coins:
        if coin.is_active == 1:
            token_address = coin.platform.token_address
            create_token_metadata(token_address, coin.id)

@cached(cache=TTLCache(maxsize=1024, ttl=12 * 60 * 60))
def get_tags():
    tags = []
    coins = get_solana_coins()
    for coin in coins:
        if coin.is_active == 1:
            token_address = coin.platform.token_address
            meta = read_token_metadata(token_address, coin.id)
            if meta is not None and meta['tag-names'] is not None:
                for index, tag in enumerate(meta['tag-names']):
                    tag_visits = get_count_stats("tags", meta['tags'][index])
                    newTag = Tag(tag=tag, slug=meta['tags'][index], count=tag_visits[0][0])
                    if newTag not in tags:
                        tags.append(newTag)
                        
    tags.sort(key=lambda x: x.count, reverse=True)

    return tags

