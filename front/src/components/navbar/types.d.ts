import { PublicKey, Transaction } from "@solana/web3.js";

export const DEFAULT_PUBLIC_KEY = new PublicKey(
  "F7KrxxjBbrXHs8jqT9N6g1TiY3SyTUamdJfqANJD6Rsk"
);

export interface WalletAdapter {
  publicKey: PublicKey;
  autoApprove: boolean;
  connected: boolean;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  signAllTransactions: (transaction: Transaction[]) => Promise<Transaction[]>;
  connect: () => any;
  disconnect: () => any;
  on<T>(event: string, fn: () => void): this;
}
