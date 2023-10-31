import { Keypair, StrKey, Server, TransactionBuilder, BASE_FEE, Networks, Operation, Asset } from 'stellar-sdk';

const STELLAR_SERVER = process.env.NEXT_PUBLIC_TESTNET_URL;
const FRIENDBOT_FUND_URL = process.env.NEXT_PUBLIC_FRIENDBOT_URL;

const server = new Server(STELLAR_SERVER);

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

export function isSecretKeyValid(secretKey: string): boolean {
  return StrKey.isValidEd25519SecretSeed(secretKey);
}

export function isPublicKeyValid(publicKey: string): boolean {
  return StrKey.isValidEd25519PublicKey(publicKey);
}

export function getPublicKey(privateKey: string): string {
  return Keypair.fromSecret(privateKey).publicKey();
}

export async function getAccount(publicKey: string) {
  try {
    const account = await server.loadAccount(publicKey);
    return account;
  } catch (error) {
    const { message } = error;
    return new Error(message);
  }
}

export async function fundAccount(publicKey: string) {
  const { ok } = await fetch(`${FRIENDBOT_FUND_URL}?addr=${publicKey}`);
  return ok;
}

export async function sendPayment(
  senderPrivateKey: string,
  receiverPublicKey: string,
  amount: string
): Promise<void | string> {
  try {
    if (!isSecretKeyValid(senderPrivateKey)) {
      throw new Error('Invalid secret key');
    }

    if (!StrKey.isValidEd25519PublicKey(receiverPublicKey)) {
      throw new Error('Invalid public key');
    }

    if (Number(amount) <= 0) {
      throw new Error('You can not transfer 0 XML');
    }

    const sourceKeys = Keypair.fromSecret(senderPrivateKey);
    const destination = receiverPublicKey;

    await server.loadAccount(destination);
    const sourceAccount = await server.loadAccount(sourceKeys.publicKey());

    const transaction = new TransactionBuilder(sourceAccount, {
      fee: BASE_FEE,
      networkPassphrase: Networks.TESTNET,
    })
      .addOperation(
        Operation.payment({
          destination,
          asset: Asset.native(),
          amount,
        })
      )
      .setTimeout(180)
      .build();

    transaction.sign(sourceKeys);

    await server.submitTransaction(transaction);
  } catch (e) {
    return e.message;
  }
}

export async function createPayment(
  senderPublicKey: string,
  receiverPublicKey: string,
  amount: string
): Promise<string> {
  try {
    const sourceAccount = await server.loadAccount(senderPublicKey);
    const destination = receiverPublicKey;

    await server.loadAccount(destination);

    const transaction = new TransactionBuilder(sourceAccount, {
      fee: BASE_FEE,
      networkPassphrase: Networks.TESTNET,
    })
      .addOperation(
        Operation.payment({
          destination,
          amount,
          asset: Asset.native(),
        })
      )
      .setTimeout(60)
      .build();

    return transaction.toXDR();
  } catch (error) {
    const { message } = error;
    throw new Error(message);
  }
}
