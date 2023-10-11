import tweepy
import dotenv
import os
import json
dotenv.load_dotenv()

# Configura tus credenciales aquí
TW_API_KEY = os.getenv("TW_API_KEY")
TW_API_SECRET_KEY = os.getenv("TW_API_SECRET_KEY")
TW_ACCESS_TOKEN = os.getenv("TW_ACCESS_TOKEN")
TW_ACCESS_SECRET_TOKEN = os.getenv("TW_ACCESS_SECRET_TOKEN")

def get_tweets(url: str, token: str):
    splitedURL = url.split('/')
    username = splitedURL[len(splitedURL) - 1]
    
    auth = tweepy.OAuth1UserHandler(
        TW_API_KEY, TW_API_SECRET_KEY, TW_ACCESS_TOKEN, TW_ACCESS_SECRET_TOKEN
    )

    api = tweepy.API(auth)
    user = api.get_user(screen_name=username)
    profile = user._json
    with open(f"data/tokens/{token}/twitter.json", 'w') as f:
        json.dump(profile, f, indent=4)
