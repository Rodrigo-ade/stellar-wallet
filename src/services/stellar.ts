import { Keypair, StrKey } from 'stellar-sdk';

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

export function isValidSecretKey(secretKey: string): boolean {
}
export function getPublicKey(privateKey: string): string {
  return Keypair.fromSecret(privateKey).publicKey();
}
