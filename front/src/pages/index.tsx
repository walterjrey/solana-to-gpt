import { NextPage } from "next";
import React, { useState } from 'react';

import {
  Box,
  Heading,
  CardFooter,
  VStack,
  Stack,
  Card,
  Button,
  CardBody,
  Text,
  CardHeader,
  Tag,
  Flex,
  InputGroup,
  Input,
  InputRightElement,
  Avatar,
  Badge,
  Image,
  Stat,
  StatLabel,
  StatNumber,
  StatArrow,
  StatHelpText,
  HStack,
  Skeleton,
  CircularProgress,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";

import IncreaseDecreaseTop from "components/increase-decrease-top/increase-decrease-top";
import TagsList from "components/tags-list/tags-list";
import HomeSearch from "components/home-search/home-search";


const App: NextPage = () => {
  const handleClick = () => { };
  const [isLoaded, setIsLoaded] = useState(false);
  const [kind, setKind] = useState("stats");
  const [query, setQuery] = useState("all");

  const handleTagSelected = async (tag: string) => {
    setKind("tag");
    setQuery(tag);
    console.log(tag);
  }



  return (

    <VStack
      w="100%"
      minH="100vh"
      gap={12}
      p={4}
      align="start"
      fontFamily="Montserrat"
      position="relative"
    >

      <Stack spacing={8} direction="row" w="100%" minH="85vh">
        <IncreaseDecreaseTop />
        <Flex w="60%">
          <HomeSearch kind={kind} query={query} />
        </Flex>
        <Flex w="20%">
          <TagsList tagSelected={handleTagSelected} />
        </Flex>
      </Stack>
    </VStack>


  );
};

export default App;
