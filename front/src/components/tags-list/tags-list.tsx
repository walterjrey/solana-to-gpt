import { FC, useState, useEffect } from "react";
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
  Skeleton,
  CircularProgress,
  SkeletonCircle,
  SkeletonText,
  Collapse,
} from "@chakra-ui/react";

import { useTags } from "./hooks";

const TagsList: FC<ITagsList> = ({ tagSelected }) => {
  const {
    isLoading,
    filteredTags,
    loaded,
    loadTags,
    setIsLoading,
    setLoaded,
    handleChangeText,
  } = useTags();

  if (!loaded) {
    setLoaded(true);
    setIsLoading(true);
    loadTags();
  }

  if (isLoading) {
    return (
      <Stack>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    );
  }

  return (
    <VStack direction="row">
      <Heading as="h4" size="md">
        Top searchs
      </Heading>
      <Input
        onChange={handleChangeText}
        placeholder="Search tags..."
        size="sm"
      />

      <VStack gap={5}>
        {filteredTags.map((item) => (
          <Tag
            onClick={() => tagSelected(item.slug)}
            cursor="pointer"
            size="md"
            key={item.slug}
            variant="solid"
            colorScheme="telegram"
            bg="#ff5100"
            color="white"
            fontSize="1rem"
          >
            {item.tag}
          </Tag>
        ))}
      </VStack>
    </VStack>
  );
};

export default TagsList;
