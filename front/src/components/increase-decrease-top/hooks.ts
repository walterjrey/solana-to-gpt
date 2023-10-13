import { useToast, useColorMode } from "@chakra-ui/react";
import { useState, ChangeEvent, useId } from "react";

export const useIncreaseDecrease = () => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [up, setUp] = useState<ITokenIncDec[]>([]);
  const [down, setDown] = useState<ITokenIncDec[]>([]);
  const [upv, setUpv] = useState<ITokenIncDec[]>([]);
  const [downv, setDownv] = useState<ITokenIncDec[]>([]);

  const loadTokens = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${process.env.API_URL}/tokens/load-tokens-inc-dec`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      const response = await res.json();
      setUp(response.up);
      setDown(response.down);
      setUpv(response.upv);
      setDownv(response.downv);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description:
          "There was an error while loading the tokens. Please try again.",
        status: "error",
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    up,
    down,
    upv,
    downv,
    loaded,
    loadTokens,
    setIsLoading,
    setLoaded,
  };
};
