from pydantic import BaseModel, Field
from typing import List, Dict, Optional, Union, Any


class Urls(BaseModel):
    website: List[str]
    twitter: List[str]
    message_board: List[str]
    chat: List[str]
    facebook: List[str]
    explorer: List[str]
    reddit: List[str]
    technical_doc: List[str]
    source_code: List[str]
    announcement: List[str]

class Platform(BaseModel):
    id: Optional[int]
    name: Optional[str]
    slug: Optional[str]
    symbol: Optional[str]
    token_address: Optional[str]

class ContractAddress(BaseModel):
    contract_address: str
    platform: Platform

class Coin(BaseModel):
    id: int
    name: str
    symbol: str
    category: str
    description: str
    slug: str
    logo: str
    subreddit: Optional[str]
    notice: Optional[str]
    tags: List[str]
    tag_names: List[str] = Field(..., alias='tag-names')
    tag_groups: List[str] = Field(..., alias='tag-groups')
    urls: Urls
    platform: Optional[Platform]  # Puede ser None
    date_added: str
    twitter_username: Optional[str]
    is_hidden: int
    date_launched: Optional[str]
    contract_address: List[Optional[Dict[str, Any]]]
    self_reported_circulating_supply: Optional[Any]
    self_reported_tags: Optional[Any]
    self_reported_market_cap: Optional[Any]
    infinite_supply: bool


class Status(BaseModel):
    timestamp: str
    error_code: int
    error_message: Optional[str]
    elapsed: int
    credit_count: int
    notice: Optional[str]

class ApiResponseMeta(BaseModel):
    status: Status
    data: Dict[str, Coin]


class Cryptocurrency(BaseModel):
    id: int
    name: str
    symbol: str
    category: str
    description: str
    slug: str
    logo: str
    subreddit: str
    notice: str
    tags: List[str]
    tag_names: List[str]
    tag_groups: List[str]
    urls: Dict[str, List[str]]
    platform: Platform
    date_added: str
    twitter_username: str
    is_hidden: int
    date_launched: Optional[str]
    contract_address: List[ContractAddress]
    self_reported_circulating_supply: Optional[str]
    self_reported_tags: Optional[Union[str, None]]
    self_reported_market_cap: Optional[Union[str, None]]
    infinite_supply: bool

