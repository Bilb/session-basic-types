const prefixStandard = '05' as const;
const prefixGroup = '03' as const;

export type GroupPubkeyType = `${typeof prefixGroup}${string}`;
export type PubkeyType = `${typeof prefixStandard}${string}`;

export type WithGroupPubkey = { groupPk: GroupPubkeyType };
export type WithSessionID = { sessionId: PubkeyType };

export const PubkeyPrefix = {
  standard: prefixStandard,
  group: prefixGroup,
};

type PubkeyPrefixT = typeof PubkeyPrefix;

export type PubkeyPrefixType = PubkeyPrefixT[keyof PubkeyPrefixT];

const HEX = '[0-9a-fA-F]';

export function is05Pubkey(key: string): key is PubkeyType {
  const regex = new RegExp(`^${PubkeyPrefix.standard}${HEX}{64}$`);
  return regex.test(key);
}

export function is03Pubkey(key: string): key is GroupPubkeyType {
  const regex = new RegExp(`^${PubkeyPrefix.group}${HEX}{64}$`);
  return regex.test(key);
}

function isValidPrefixAndLength(keyWithOrWithoutPrefix: string): boolean {
  return (
    keyWithOrWithoutPrefix.length === 66 &&
    // keyWithOrWithoutPrefix.startsWith(KeyPrefixType.blinded15) ||
    // keyWithOrWithoutPrefix.startsWith(KeyPrefixType.blinded25) ||
    (keyWithOrWithoutPrefix.startsWith(PubkeyPrefix.standard) ||
      keyWithOrWithoutPrefix.startsWith(PubkeyPrefix.group))
  );
}

export function removePrefixIfNeeded(keyWithOrWithoutPrefix: string): string {
  if (isValidPrefixAndLength(keyWithOrWithoutPrefix)) {
    const keyWithoutPrefix = keyWithOrWithoutPrefix.substr(2);
    return keyWithoutPrefix;
  }
  return keyWithOrWithoutPrefix;
}

export function shortenPk(toShorten: string) {
  if (toShorten.length < 6) {
    return `(${toShorten})`;
  }
  return `(${toShorten.substr(0, 2)}...${toShorten.substr(
    toShorten.length - 4
  )})`;
}


