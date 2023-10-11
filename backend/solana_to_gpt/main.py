from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from routes import users, tokens, search, tags, solana_to_gpt
from services.sessions import create_token_metadata
from services.web import get_stats_from_solana
from services.tweeter import get_tweets
from services.embeddings import search_on_token_index, search_on_index, create_embeddings_index, rebuild_tokens_indexes
from databases.pg import migrate
from services.tokens import update_prices_daily, update_metas, scrape_token_web_links
from services.coinmarketcap import get_cmc_category, get_cmc_category_meta, get_cmc_category_quote, reload_tokens_price, reload_tokens_meta
from apscheduler.schedulers.asyncio import AsyncIOScheduler

migrate()

scheduler = AsyncIOScheduler()

app = FastAPI()

async def async_task_prices():
    print("Async task executed!")
    update_prices_daily()

async def async_task_metas():
    print("Async task executed!")
    reload_tokens_meta()
    update_metas()

    

@app.on_event("startup")
async def on_startup():
    scheduler.add_job(async_task_prices, trigger="interval", minutes=240)
    scheduler.add_job(async_task_metas, trigger="interval", minutes=10080)
    scheduler.start()

origins = [
    "http://localhost:3000",  # Ajustar para tu configuración
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hello, World!"}

app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(tokens.router, prefix="/tokens", tags=["tokens"])
app.include_router(search.router, prefix="/search", tags=["search"])
app.include_router(tags.router, prefix="/tags", tags=["tags"])
app.include_router(solana_to_gpt.router, prefix="/solana-to-gpt", tags=["Solana to GPT Chat"])

#update_prices_daily()
#rebuild_tokens_indexes()
#update_metas()
#get_cmc_category_meta("9348")
#get_cmc_category()
#price_list()
#quotes()
#reload_tokens_price()
#reload_tokens_meta()
#create_embeddings_index()
#scrape_token_web_links()

