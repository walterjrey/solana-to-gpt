import datetime
import psycopg

def migrate():
    with psycopg.connect("dbname=solanai user=solanai password=solanai123 host=0.0.0.0") as conn:
        with conn.cursor() as cur:

            cur.execute("""
                CREATE TABLE IF NOT EXISTS prices (
                    id serial PRIMARY KEY,
                    token text,
                    price numeric,
                    market_cap numeric,
                    daily_hour_volume numeric,
                    direction text,
                    timestamp timestamp
                    )
                """)
            
            cur.execute("""
                CREATE TABLE IF NOT EXISTS stats (
                    id serial PRIMARY KEY,
                    kind text,
                    value text,
                    solana_pk text,
                    timestamp timestamp,
                    UNIQUE (solana_pk, kind, value)
                    )
                """)

            conn.commit()


def insert_price(token, price, market_cap, daily_hour_volume, direction):
    with psycopg.connect("dbname=solanai user=solanai password=solanai123 host=0.0.0.0") as conn:
        timestamp = datetime.datetime.now()
        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO prices (token, price, market_cap, daily_hour_volume, direction, timestamp) VALUES (%s, %s, %s, %s, %s, %s)",
                (token, price, market_cap, daily_hour_volume, direction, timestamp)
                )
            conn.commit()

def insert_stat(kind, value, solana_pk):
    with psycopg.connect("dbname=solanai user=solanai password=solanai123 host=0.0.0.0") as conn:
        timestamp = datetime.datetime.now()
        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO stats (kind, value, solana_pk, timestamp) VALUES (%s, %s, %s, %s) ON CONFLICT (solana_pk, kind, value) DO NOTHING",
                (kind, value, solana_pk, timestamp)
                )
            conn.commit()



def get_prices(token: str):
    prices = []
    with psycopg.connect("dbname=solanai user=solanai password=solanai123 host=0.0.0.0") as conn:
        with conn.cursor() as cur:
            for record in cur.execute("SELECT * FROM prices WHERE token = %s ORDER BY timestamp ASC", (token,)):
                prices.append(record)

    return prices


def get_stats_rank(kind: str, limit: int):
    stats = []
    with psycopg.connect("dbname=solanai user=solanai password=solanai123 host=0.0.0.0") as conn:
        with conn.cursor() as cur:
            for record in cur.execute("SELECT value, count(1) as cant FROM stats WHERE kind = %s group by value order by cant desc limit %s", (kind, str(limit),)):
                stats.append(record)

    return stats

def get_count_stats(kind: str, value: int):
    stats = []
    with psycopg.connect("dbname=solanai user=solanai password=solanai123 host=0.0.0.0") as conn:
        with conn.cursor() as cur:
            for record in cur.execute("SELECT count(1) FROM stats WHERE kind = %s and value = %s", (kind, value,)):
                stats.append(record)

    return stats