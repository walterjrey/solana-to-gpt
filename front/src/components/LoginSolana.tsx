// LoginSolana.tsx

import React, { useState } from 'react';
import { Button, Box, Text } from '@chakra-ui/react';
import { Connection, PublicKey } from '@solana/web3.js';

const LoginSolana: React.FC = () => {
  const [publicKey, setPublicKey] = useState<PublicKey | null>(null);
  const [loading, setLoading] = useState(false);

  const network = "https://testnet.solana.com";  // Puedes cambiar esto según tu red
  const connection = new Connection(network);

  const connectWallet = async () => {
    setLoading(true);
    try {
      // Aquí normalmente iría el código para conectarse con una wallet como Phantom, 
      // pero para simplificar el ejemplo, vamos a generar una clave pública de forma aleatoria.
      
      const randomBytes = new Uint8Array(32);
      window.crypto.getRandomValues(randomBytes);

      const newPublicKey = new PublicKey(randomBytes);
      setPublicKey(newPublicKey);

      // Simular la demora de la conexión
      setTimeout(() => {
        setLoading(false);
      }, 2000);

    } catch (error) {
      console.error("Error al conectarse a la wallet", error);
      setLoading(false);
    }
  };

  return (
    <Box p={4}>
      <Button colorScheme="teal" isLoading={loading} onClick={connectWallet}>
        Conectar a Solana
      </Button>
      {publicKey && (
        <Box mt={4}>
          <Text>Conectado con la clave pública:</Text>
          <Text fontWeight="bold">{publicKey.toBase58()}</Text>
        </Box>
      )}
    </Box>
  );
};

export default LoginSolana;
