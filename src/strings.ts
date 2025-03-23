import {
  base64_variants,
  from_base64,
  from_hex,
  from_string,
  to_base64,
  to_hex,
} from 'libsodium-wrappers-sumo';

export const toHex = (d: Uint8Array) => {
  return to_hex(d) as HexString;
};
export const fromHex = (d: HexString) => from_hex(d);

export const fromHexStringToUint8Array = (hexString: HexString) => {
  const matches = hexString.match(/.{1,2}/g);
  if (!matches) {
    return new Uint8Array();
  }
  return Uint8Array.from(matches.map((byte) => parseInt(byte, 16)));
};

export const fromBase64ToUInt8Array = (d: Base64String) =>
  from_base64(d, base64_variants.ORIGINAL);

export const fromUInt8ArrayToBase64 = (d: Uint8Array) =>
  to_base64(d, base64_variants.ORIGINAL) as Base64String;

export const fromUtf8ToUInt8Array = (d: string) => from_string(d);

export type Base64String = string & { __brand: 'b64' };
export type HexString = string & { __brand: 'hex' };
export type UnknownString = string & { __brand: 'other' };

export function isBase64(str: string): str is Base64String {
  return /^[A-Za-z0-9+/]+={0,2}$/.test(str);
}

export function isHex(str: string): str is HexString {
  return /^[0-9A-Fa-f]+$/.test(str);
}

export function createBase64String(value: string): Base64String {
  if (/^[A-Za-z0-9+/]+={0,2}$/.test(value)) {
    return value as Base64String;
  }
  throw new Error('createBase64String invalid initial string');
}

export function createHexString(value: string): HexString {
  if (/^[0-9A-Fa-f]+$/.test(value)) {
    return value as HexString;
  }
  throw new Error('createHexString invalid initial string');
}

export function decodeBase64(encoded: Base64String): string {
  return Buffer.from(encoded, 'base64').toString('utf-8');
}

export function decodeHex(encoded: HexString): string {
  return Buffer.from(encoded, 'hex').toString('utf-8');
}
