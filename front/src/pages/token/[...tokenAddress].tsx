import { NextPage } from "next";
import { useState, useEffect } from "react";
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
import { useRouter } from "next/router";
import IncreaseDecreaseTop from "components/increase-decrease-top/increase-decrease-top";
import TagsList from "components/tags-list/tags-list";
import Chat from "components/chat";
import { boxSectionsStyles } from "theme/overrides";

const Tokens: NextPage = () => {
  const handleClick = () => {};
  const [tab, setTab] = useState("chat");
  const [tokenAddress, setTokenAddress] = useState("");

  const router = useRouter();

  const handleTagSelected = async (tag: string) => {};

  useEffect(() => {
    const { tokenAddress: _tokenAddress } = router.query;
    if (_tokenAddress) setTokenAddress(_tokenAddress[0] as string);

    console.log(tokenAddress, _tokenAddress);
    console.log(router);
  }, [router, tokenAddress]);

  return (
    <VStack
      w="100%"
      minH="100vh"
      p={4}
      align="start"
      fontFamily="Montserrat"
    >
      <Box
        w="100%"
        display="flex"
        flexDirection="row"
        gap="1.44rem"
        fontSize="1.18rem"
        alignItems="flex-start"
        justifyContent="center"
        mb={4}
      >
        <Box onClick={() => setTab("chat")} sx={boxSectionsStyles}>
          <Text
            color={tab === "chat" ? "#ff5100" : "inherit"}
            variant="section"
          >
            Chat
          </Text>
        </Box>

        <Box onClick={() => setTab("prices")} sx={boxSectionsStyles}>
          <Text
            color={tab === "prices" ? "#ff5100" : "inherit"}
            variant="section"
          >
            Prices
          </Text>
        </Box>

        <Box onClick={() => setTab("about")} sx={boxSectionsStyles}>
          <Text
            color={tab === "about" ? "#ff5100" : "inherit"}
            variant="section"
          >
            About
          </Text>
        </Box>
      </Box>
      <Stack direction="row" w="100%">
        <Chat section={tab} token={tokenAddress} />
      </Stack>
    </VStack>
  );
};

export default Tokens;
