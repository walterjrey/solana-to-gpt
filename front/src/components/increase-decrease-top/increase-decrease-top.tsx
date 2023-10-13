import { FC, useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Heading,
  VStack,
  Card,
  CardBody,
  Text,
  Flex,
  Avatar,
  Badge,
  Stat,
  StatArrow,
  StatHelpText,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";

import { useIncreaseDecrease } from "./hooks";

const IncreaseDecreaseTop: FC = () => {
  const { isLoading, up, down, upv, downv, loaded, loadTokens, setIsLoading, setLoaded } =
    useIncreaseDecrease();

  const router = useRouter();

  useEffect(() => {}, []);

  const goTokenDetail = (token_address: string) => {
    router.push(`/token/${token_address}`);
  };

  if (!loaded) {
    setLoaded(true);
    setIsLoading(true);
    loadTokens();
  }

  if (isLoading) {
    return (
      <Flex w="20%">
        <Box padding="6" w="100%" boxShadow="lg" bg="white">
          <SkeletonCircle size="10" />
          <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
        </Box>
      </Flex>
    );
  }

  return (
    <VStack w="20%" direction="row">
      <Heading as="h4" size="md">
        Top increase price
      </Heading>
      {up.map((upItem) => {
        return (
          
            <Card
              key={upItem.token_address}
              align="center"
              w="100%"
              variant="outline"
              onClick={() => goTokenDetail(upItem.token_address)}
            >
              <CardBody w="100%">
                <Flex cursor="pointer">
                  <Avatar src={upItem.logo} />
                  <Box ml="3">
                    <Text fontWeight="bold">
                      {upItem.name}
                      <Badge ml="1" colorScheme="green">
                        {upItem.symbol}
                      </Badge>
                    </Text>
                    <Stat>
                      <StatHelpText>
                        <StatArrow type="increase" />
                        {upItem.percent.toFixed(2)}%
                      </StatHelpText>
                    </Stat>
                  </Box>
                </Flex>
              </CardBody>
            </Card>
          
        );
      })}

      <Heading as="h4" size="md">
        Top decrease price
      </Heading>
      {down.map((downItem) => {
        return (
          <Card
            key={downItem.token_address}
            align="center"
            w="100%"
            variant="outline"
            onClick={() => goTokenDetail(downItem.token_address)}
          >
            <CardBody w="100%">
              <Flex cursor="pointer">
                <Avatar src={downItem.logo} />
                <Box ml="3">
                  <Text fontWeight="bold">
                    {downItem.name}
                    <Badge ml="1" colorScheme="green">
                      {downItem.symbol}
                    </Badge>
                  </Text>
                  <Stat>
                    <StatHelpText>
                      <StatArrow type="decrease" />
                      {downItem.percent.toFixed(2)}%
                    </StatHelpText>
                  </Stat>
                </Box>
              </Flex>
            </CardBody>
          </Card>
        );
      })}

      <Heading as="h4" size="md">
        Top increase volume
      </Heading>
      {upv.map((downItem) => {
        return (
          <Card
            key={downItem.token_address}
            align="center"
            w="100%"
            variant="outline"
            onClick={() => goTokenDetail(downItem.token_address)}
          >
            <CardBody w="100%">
              <Flex cursor="pointer">
                <Avatar src={downItem.logo} />
                <Box ml="3">
                  <Text fontWeight="bold">
                    {downItem.name}
                    <Badge ml="1" colorScheme="green">
                      {downItem.symbol}
                    </Badge>
                  </Text>
                  <Stat>
                    <StatHelpText>
                      <StatArrow type="increase" />
                      {downItem.percent.toFixed(2)}%
                    </StatHelpText>
                  </Stat>
                </Box>
              </Flex>
            </CardBody>
          </Card>
        );
      })}

      <Heading as="h4" size="md">
        Top decrease volume
      </Heading>
      {downv.map((downItem) => {
        return (
          <Card
            key={downItem.token_address}
            align="center"
            w="100%"
            variant="outline"
            onClick={() => goTokenDetail(downItem.token_address)}
          >
            <CardBody w="100%">
              <Flex cursor="pointer">
                <Avatar src={downItem.logo} />
                <Box ml="3">
                  <Text fontWeight="bold">
                    {downItem.name}
                    <Badge ml="1" colorScheme="green">
                      {downItem.symbol}
                    </Badge>
                  </Text>
                  <Stat>
                    <StatHelpText>
                      <StatArrow type="decrease" />
                      {downItem.percent.toFixed(2)}%
                    </StatHelpText>
                  </Stat>
                </Box>
              </Flex>
            </CardBody>
          </Card>
        );
      })}
      
    </VStack>
  );
};

export default IncreaseDecreaseTop;
