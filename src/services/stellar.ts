import { Keypair, StrKey, Server } from 'stellar-sdk';

interface KeyPair {
  publicKey: string;
  privateKey: string;
}

const server = new Server('https://horizon-testnet.stellar.org');

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

export interface IBalance {
  asset: string;
  balance: string;
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

