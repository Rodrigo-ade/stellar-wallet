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

export async function sendPayment(
  senderPrivateKey: string,
  receiverPublicKey: string,
  amount: string
): Promise<boolean | string> {
  try {
    if (!isSecretKeyValid(senderPrivateKey)) {
      throw new Error('Invalid secret key');
    }

    if (!StrKey.isValidEd25519PublicKey(receiverPublicKey)) {
      throw new Error('Invalid public key');
    }

    if (Number(amount) <= 0) {
      throw new Error('You can not send 0');
    }

    const sourceKeys = Keypair.fromSecret(senderPrivateKey);
    const destinationId = receiverPublicKey;

    await server.loadAccount(destinationId);
    const sourceAccount = await server.loadAccount(sourceKeys.publicKey());

    const transaction = new TransactionBuilder(sourceAccount, {
      fee: BASE_FEE,
      networkPassphrase: Networks.TESTNET,
    })
      .addOperation(
        Operation.payment({
          destination: destinationId,
          asset: Asset.native(),
          amount,
        })
      )
      .setTimeout(180)
      .build();

    transaction.sign(sourceKeys);

    await server.submitTransaction(transaction);
    return true;
  } catch (e) {
    return e.message;
  }
}
