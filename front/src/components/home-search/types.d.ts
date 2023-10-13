interface ISearchParams {
    kind: string;
    query: string;
  }

  type IUseSearch = (
    kind: string,
    query: string,
  ) => {
    isLoading: boolean;
    loaded: boolean;
    tokens: ITokenSearch[];
    inputValue: string;
    setIsLoading: (isLoading: boolean) => void;
    setLoaded: (loaded: boolean) => void;
    handleClick: () => void;
    handleChangeText: (event: React.ChangeEvent<HTMLInputElement>) => void;
    setCurrentKind: (kind: string) => void;
    setCurrentQuery: (query: string) => void;
  };
  

interface ITokenSearch {
    token_address: string;
    symbol: string;
    name: string;
    logo: string;
    percent_change_24h: number;
    direction: string;
    description: string;
    price: number;
    result_type: string;
}