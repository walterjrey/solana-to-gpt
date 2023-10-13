import { FC, useEffect } from "react";
import { useRouter } from "next/router";
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
  TagLeftIcon,
  Kbd,
  SkeletonCircle,
  SkeletonText,
  ScaleFade,
} from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";

import { useSearch } from "./hooks";

const HomeSearch: FC<ISearchParams> = ({ kind, query }) => {
  const {
    isLoading,
    tokens,
    handleClick,
    handleChangeText,
    setCurrentKind,
    setCurrentQuery,
  } = useSearch(kind, query);

  const router = useRouter();

  const goTokenDetail = (token_address: string) => {
    router.push(`/token/${token_address}`);
  };

  useEffect(() => {
    setCurrentKind(kind);
    setCurrentQuery(query);
  }, [kind, query]);

  return (
    <Card align="center" w="100%">
      <CardHeader>
        <Heading size="md">
          Search for a Solana Token and chat with it...
        </Heading>
      </CardHeader>
      <CardBody w="100%">
        <InputGroup size="lg" mb={4}>
          <Input
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                handleClick();
              }
            }}
            onChange={handleChangeText}
            pr="4.5rem"
            type="text"
            placeholder="Search tokens.."
          />
          <InputRightElement width="4.5rem" pr={2}>
            <Button bg="#ff5100" h="1.75rem" size="sm" onClick={() => handleClick()}>
              Search
            </Button>
          </InputRightElement>
        </InputGroup>

        {isLoading && (
          <Box padding="6" boxShadow="lg" bg="white">
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
          </Box>
        )}

        <VStack direction="row" gap={2} spacing={2}>
          {tokens.map((item) => (
            <ScaleFade initialScale={0.9} in={true}>
              <Card
                onClick={() => goTokenDetail(item.token_address)}
                key={item.token_address}
                cursor="pointer"
                direction={{ base: "column", sm: "row" }}
                overflow="hidden"
                variant="outline"
              >
                <CardBody>
                  <HStack spacing={8}>
                    <Flex w="20%" justifyContent="center" textAlign="center">
                      <VStack direction="row">
                        <Image maxW="2rem" src={item.logo} alt={item.name} />
                        <Stat>
                          <StatNumber fontSize="1.2rem">
                            {" "}
                            <Badge ml="1" colorScheme="green">
                              USD
                            </Badge>
                            {item.price.toFixed(8)}
                          </StatNumber>
                          <StatHelpText>
                            <StatArrow
                              type={
                                item.direction === "increase"
                                  ? "increase"
                                  : "decrease"
                              }
                            />
                            {item.percent_change_24h.toFixed(2)}%
                          </StatHelpText>
                        </Stat>

                      </VStack>
                    </Flex>
                    <Flex w="80%">
                      <VStack
                        direction="row"
                        justifyContent="left"
                        textAlign="left"
                      >
                         <Text
                          fontWeight="700"
                          fontSize="0.9rem"
                          size="md"
                          w="100%"
                        >
                          {item.name} <Kbd>{item.symbol}</Kbd>
                        </Text>      
                        <Text fontSize="0.9rem" py="2">
                          {item.description}
                        </Text>
                        <Text w="100%" textAlign="left" fontSize="0.7rem" fontWeight="300">Found by <strong>{item.result_type}</strong></Text>
                      </VStack>
                    </Flex>
                  </HStack>
                </CardBody>
              </Card>
            </ScaleFade>
          ))}
        </VStack>
      </CardBody>
    </Card>
  );
};

export default HomeSearch;
