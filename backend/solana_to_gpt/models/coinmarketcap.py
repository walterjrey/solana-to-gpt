class Platform:
    def __init__(self, id, name, symbol, slug, token_address):
        self.id = id
        self.name = name
        self.symbol = symbol
        self.slug = slug
        self.token_address = token_address

class Cryptocurrency:
    def __init__(self, id, rank, name, symbol, slug, is_active, first_historical_data, last_historical_data, platform):
        self.id = id
        self.rank = rank
        self.name = name
        self.symbol = symbol
        self.slug = slug
        self.is_active = is_active
        self.first_historical_data = first_historical_data
        self.last_historical_data = last_historical_data
        self.platform = platform