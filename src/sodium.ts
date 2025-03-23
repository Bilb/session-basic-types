import sodium from 'libsodium-wrappers-sumo';

export type LibSodiumType = typeof sodium;

export type WithLibSodium = {
  sodium: LibSodiumType;
};

export async function getSodium(): Promise<LibSodiumType> {
  await sodium.ready;
  return sodium;
}
