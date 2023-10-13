from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from routes import users, tokens, search, tags, solana_to_gpt
from databases.pg import migrate
from services.tokens import update_prices_daily, update_metas
from services.coinmarketcap import reload_tokens_meta
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
    "https://solanatogpt.com",
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
