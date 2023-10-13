import { useToast, useColorMode } from "@chakra-ui/react";
import { useState, ChangeEvent, useId } from "react";

export const useTags = () => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [tags, setTags] = useState<ITag[]>([]);
  const [filteredTags, setFilteredTags] = useState<ITag[]>([]);


  const filerTags = (text: string) => {
    const filtered = tags.filter((tag) =>
      tag.tag.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredTags(filtered.slice(0, 18));
    if (filtered.length === 0) {
      setFilteredTags(tags.slice(0, 18));
    }
  
  }

  const handleChangeText = (event: ChangeEvent<HTMLInputElement>) =>
  filerTags(event.target.value);

  const loadTags = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${process.env.API_URL}/tags`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      const response = await res.json();
      setTags(response);
      setFilteredTags(response.slice(0, 18));
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
    tags,
    loaded,
    filteredTags,
    loadTags,
    setIsLoading,
    setLoaded,
    handleChangeText,
  };
};
