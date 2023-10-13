interface IChatWithToken {
  token: string;
  section: string;
}

type Message = {
  role: string;
  content: string;
  chunks?: {
    chunk: string;
  }[]
};

interface DataChart {
  name: string;
  amt: number;
  uv: number;
  pv: number;
}

type IUseChat = (token: string) => {
  isLoading: boolean;
  loaded: boolean;
  tokenMeta: ITokenMeta | undefined;
  pubKey: string;
};

interface ITokenMeta {
  meta: Meta;
  quote: Quote;
  prices: [number, string, number, number, number, string, string][];
  pricesPrediction: [string, number, number, number][];
  about: string;
  pdfs: string[];
}

interface Meta {
  id: number;
  name: string;
  symbol: string;
  category: string;
  description: string;
  slug: string;
  logo: string;
  subreddit: string;
  notice: string;
  tags: string[];
  "tag-names": string[];
  "tag-groups": string[];
  urls: Urls;
  platform: Platform;
  date_added: string;
  twitter_username: string;
  is_hidden: number;
  date_launched: any;
  contract_address: ContractAddress[];
  self_reported_circulating_supply: any;
  self_reported_tags: any;
  self_reported_market_cap: any;
  infinite_supply: boolean;
}

interface Urls {
  website: string[];
  twitter: string[];
  message_board: string[];
  chat: string[];
  facebook: any[];
  explorer: string[];
  reddit: any[];
  technical_doc: any[];
  source_code: string[];
  announcement: any[];
}

interface Platform {
  id: string;
  name: string;
  slug: string;
  symbol: string;
  token_address: string;
}

interface ContractAddress {
  contract_address: string;
  platform: Platform2;
}

interface Platform2 {
  name: string;
  coin: Coin;
}

interface Coin {
  id: string;
  name: string;
  symbol: string;
  slug: string;
}

interface Quote {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  num_market_pairs: number;
  date_added: string;
  tags: any[];
  max_supply: any;
  circulating_supply: number;
  total_supply: number;
  platform: Platform3;
  is_active: number;
  infinite_supply: boolean;
  cmc_rank: number;
  is_fiat: number;
  self_reported_circulating_supply: any;
  self_reported_market_cap: any;
  tvl_ratio: any;
  last_updated: string;
  quote: Quote2;
}

interface Platform3 {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  token_address: string;
}

interface Quote2 {
  USD: Usd;
}

interface Usd {
  price: number;
  volume_24h: number;
  volume_change_24h: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_60d: number;
  percent_change_90d: number;
  market_cap: number;
  market_cap_dominance: number;
  fully_diluted_market_cap: number;
  tvl: any;
  last_updated: string;
}

