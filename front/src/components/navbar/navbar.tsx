import { FC } from "react";
import {
  Box,
  Switch,
  FormControl,
  Flex,
  Text,
  useColorMode,
  Image
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import Logo from "../icons/logo";

import dynamic from 'next/dynamic';

const NonSSRComponent = dynamic(
  () => import('./wallet').then((mod) => mod.WalletSolana),
  { ssr: false }
);
const Navbar: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const homeURL = "";
  const router = useRouter();
  const goToHome = () => {
    if (router.pathname !== "/") router.push("/");
  };

  return (
    <Flex
      position="relative"
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      _hover={{ cursor: "pointer" }}
    >
      <NonSSRComponent />
      <Box title={homeURL} pt={8} pb={4} display="flex" flex={1} justifyContent="center" gap={2} onClick={goToHome}>

      <Image src="/logo.png" alt="logo" width="60px" height="45px" />
        <Text
          pt="2px"
          color={colorMode === "dark" ? "white" : "black"}
          textAlign="center"
          variant="footer"
        >
          SOLANA TO GPT
        </Text>
        
      </Box>
      <Box display="flex" position="absolute" right={0} gap={4}>
        <FormControl onChange={toggleColorMode}>
          <MoonIcon w={5} h={5} />
          <Switch id="isChecked" mr={4} ml={4} />
          <SunIcon w={5} h={5} />
        </FormControl>
      </Box>
    </Flex>
  );
};

export default Navbar;
