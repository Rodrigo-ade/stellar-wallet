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
