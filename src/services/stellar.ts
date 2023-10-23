import { Keypair, StrKey, Server } from 'stellar-sdk';

interface KeyPair {
  publicKey: string;
  privateKey: string;
}

export interface IBalance {
  asset: string;
  balance: string;
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

export async function getAccountBalance(publicKey: string) {
  let balance: IBalance[];
  try {
    const account = await server.loadAccount(publicKey);
    balance = account.balances.map((tempBalance) => ({ asset: tempBalance.asset_type, balance: tempBalance.balance }));
  } catch (e) {
    balance = [
      {
        asset: 'native',
        balance: '0',
      },
    ];
  }
  return balance;
}

export async function fundAccount(publicKey: string) {
  const { ok } = await fetch(`${FRIENDBOT_FUND_URL}?addr=${publicKey}`);
  return ok;
}
