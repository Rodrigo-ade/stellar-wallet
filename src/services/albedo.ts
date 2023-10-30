import albedo from '@albedo-link/intent';

export async function getAlbedoPublicKey() {
  let publicKey: string;

  try {
    publicKey = (await albedo.publicKey({})).pubkey;
  } catch (e) {
    publicKey = e.error.message;
  }

  return publicKey;
}

export async function signTransaction(xdr: string) {
  try {
    await albedo.tx({
      xdr,
      network: 'testnet',
      submit: true,
    });

    return { success: true, message: 'Success!' };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
