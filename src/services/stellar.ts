import { Keypair } from 'stellar-sdk';

interface KeyPair {
  publicKey: string;
  privateKey: string;
}

export function getRandomKeyPair(): KeyPair {
  const keyPair = Keypair.random();
  const publicKey = keyPair.publicKey();
  const privateKey = keyPair.secret();
  return { publicKey, privateKey };
}
