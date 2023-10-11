import requests
import json
import dotenv
import os

dotenv.load_dotenv()
GH_TOKEN = os.getenv("GH_TOKEN")

HEADERS = {
    'Authorization': f'token {GH_TOKEN}'
}

def buscar_repositorios_solana():
    url = 'https://api.github.com/search/repositories'
    params = {'q': 'solana', 'sort': 'stars', 'order': 'desc', 'per_page': 2}
    all_repos = []
    page = 1

    while True:
        params['page'] = page
        response = requests.get(url, headers=HEADERS, params=params)

        if response.status_code == 200:
            repos = response.json()['items']
            if not repos:
                break

            all_repos.extend(repos)
            page += 1
            if page > 4:
                break
        else:
            print(f"Error: {response.status_code}")
            break

    for repo in all_repos:
        print(f"Nombre: {repo['name']}")
        print(f"Estrellas: {repo['stargazers_count']}")
        print(f"URL: {repo['html_url']}")
        print('---')