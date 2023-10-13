import { useState, useRef, useEffect } from "react";
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, SystemProgram, Transaction } from '@solana/web3.js';

export const useSolanaToGPT = (token?: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef<HTMLDivElement>(null);
  const [canWrite, setCanWrite] = useState(true);
  const { publicKey } = useWallet();

  const ROLE = {
    user: "user",
    assistant: "assistant",
    function: "function",
    stream: "stream",
  };

  useEffect(() => {
    const chatBoxEl = chatBoxRef?.current;
    if (!chatBoxEl) return;

    chatBoxRef?.current!.scrollTo(0, chatBoxRef?.current!.scrollHeight);
  }, [chatBoxRef, messages]);

  const updateMessages = (incommingMsg: Message, prevChunk: string, setFnMsg: boolean) => {
    setMessages((prev) =>
      prev.map((prevMsg) => {
        switch (incommingMsg.role) {
          case ROLE.stream:
            prev.map((deepPrev) => {
              if (deepPrev.role == ROLE.stream && prevChunk != incommingMsg.content) {
                prevChunk = incommingMsg.content;
                deepPrev.content += incommingMsg.content;
              }
            });
            break;
          case ROLE.function:
            const lastFnMsg = prev.filter((m) => m.role === ROLE.function).pop();
            if (lastFnMsg && setFnMsg) {
              setFnMsg = false;
              lastFnMsg.content += incommingMsg.content;
            }
            break;
        }
        return prevMsg;
      }),
    );
  };

  const clearStreamMessage = (prev: Message[]) =>
    prev.map((m) => {
      if (m.role == ROLE.stream) return { role: ROLE.assistant, content: m.content };
      return m;
    });

  const handleStream = async (reader: ReadableStreamDefaultReader) => {
    const manager = { prevChunk: "", setFnMsg: true };
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      const data = value.split("event:message\ndata:");
      if (data.length > 1) {
        data.forEach((msg: string, index: number) => {
          if (index == 0) return;
          if(loadingRef.current) {
            loadingRef.current.style.display = "none";
          }
          const incommingMsg: Message = JSON.parse(msg.split("\n\n")[0]);
          updateMessages(incommingMsg, manager.prevChunk, manager.setFnMsg);
        });
      }
    }
    setMessages(clearStreamMessage);
  };

  const fetchSSERequest = async (token: string, stackMessages: Message[]) => {
    if(loadingRef.current) {
      loadingRef.current.style.display = "block";
    }
    setCanWrite(false);
    const headers = {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Solana-Key": publicKey?.toString()|| "" },
      body: JSON.stringify({ messages: stackMessages, token: token }),
    };
    const response = await fetch(`${process.env.API_URL}/solana-to-gpt/stream`, headers);
    if (!response.body) return;
    const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
    await handleStream(reader);
    setCanWrite(true);
  };

  const sendStreamMessage = async (message: string) => {
    if (!message || !token) return;
    const userMsg = [{ role: ROLE.user, content: message }];
    const newStack = [
      { role: ROLE.function, content: "" },
      { role: ROLE.stream, content: "" },
    ];
    setMessages([...messages, ...userMsg, ...newStack]);
    await fetchSSERequest(token, userMsg);
  };

  return { sendStreamMessage, messages, chatBoxRef, canWrite, loadingRef };
};
