import albedo from '@albedo-link/intent';

export async function getAlbedoPublicKey() {
  return (await albedo.publicKey({})).pubkey;
}

export async function signTransaction(xdr: string): Promise<string> {
  try {
    const { signed_envelope_xdr } = await albedo.tx({
      xdr,
      network: 'testnet',
      submit: true,
    });

    return signed_envelope_xdr;
  } catch (error) {
    return '';
  }
}
