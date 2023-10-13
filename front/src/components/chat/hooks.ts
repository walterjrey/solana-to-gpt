import { useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useWallet } from '@solana/wallet-adapter-react';


export const useChat: IUseChat = (token: string) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [tokenMeta, setTokenMeta] = useState<ITokenMeta>();
  const { publicKey } = useWallet();
  const [ pubKey, setPubKey ] = useState<string>("");

  const loadToken = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${process.env.API_URL}/tokens/info/${token}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", "X-Solana-Key": publicKey?.toString() || "" },
      });
      const response = await res.json();
      setTokenMeta(response);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description:
          "There was an error while loading the token. Please try again.",
        status: "error",
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log(token);
    if (token === "") return;
    loadToken();
  }, [token]);

  useEffect(() => {
    setLoaded(true);
  }, [tokenMeta]);

  useEffect(() => {
    setPubKey(publicKey?.toString() || "")
  }, [publicKey]);

  return {
    isLoading,
    loaded,
    tokenMeta,
    pubKey,
  };
};
