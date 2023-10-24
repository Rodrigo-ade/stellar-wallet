import { Keypair, StrKey, Server } from 'stellar-sdk';

interface KeyPair {
  publicKey: string;
  privateKey: string;
}

const server = new Server('https://horizon-testnet.stellar.org');
const FRIENDBOT_FUND_URL = `https://friendbot.stellar.org`;

export function getRandomKeyPair(): KeyPair {
  const keyPair = Keypair.random();
  const publicKey = keyPair.publicKey();
  const privateKey = keyPair.secret();
  return { publicKey, privateKey };
}

export function isSecretKeyValid(secretKey: string): boolean {
  return StrKey.isValidEd25519SecretSeed(secretKey);
}

export function getPublicKey(privateKey: string): string {
  return Keypair.fromSecret(privateKey).publicKey();
}

export async function getAccount(publicKey: string) {
  try {
    const account = await server.loadAccount(publicKey);
    return account;
  } catch (e) {
    return new Error('Stellar Api Error');
  }
}

export async function fundAccount(publicKey: string) {
  const { ok } = await fetch(`${FRIENDBOT_FUND_URL}?addr=${publicKey}`);
  return ok;
}
