import { FC, useState } from "react";
import {
    Box,
    Switch,
    FormControl,
    Flex,
    Text,
    useColorMode,
} from "@chakra-ui/react";
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';

export const WalletSolana: FC = () => {
    return (
        <Box display="flex" position="absolute" left={0} gap={4}>
            <WalletMultiButton />
            <WalletDisconnectButton />
        </Box>
    )
}