import { useToast, useColorMode } from "@chakra-ui/react";
import { useState, ChangeEvent, useEffect } from "react";
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, SystemProgram, Transaction } from '@solana/web3.js';

export const useSearch: IUseSearch = (kind, query) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [tokens, setTokens] = useState<ITokenSearch[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [currentKind, setCurrentKind] = useState(kind);
  const [currentQuery, setCurrentQuery] = useState(query);
  const { publicKey } = useWallet();

  useEffect(() => {
    loadTokens();
  }, [currentKind, currentQuery]);

  const handleClick = async () => {
    if(inputValue === currentQuery) return;
    setLoaded(true);
    setIsLoading(true);
    setCurrentKind("query");
    setCurrentQuery(inputValue)
  }

  const handleChangeText = (event: ChangeEvent<HTMLInputElement>) =>
  setInputValue(event.target.value);


  const loadTokens = async () => {
    console.log(currentKind, currentQuery);
    if(currentKind === "" || currentQuery === "") return;
    try {
      setIsLoading(true);
      const res = await fetch(`${process.env.API_URL}/search/tokens/${currentKind}?query=${currentQuery}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", "X-Solana-Key": publicKey?.toString()|| "" }
      });
      const response = await res.json();
      setTokens(response);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description:
          "There was an error while loading the tags. Please try again.",
        status: "error",
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    loaded,
    tokens,
    inputValue,
    currentKind,
    currentQuery,
    loadTokens,
    setIsLoading,
    setLoaded,
    handleClick,
    handleChangeText,
    setCurrentKind,
    setCurrentQuery,
  };
};
