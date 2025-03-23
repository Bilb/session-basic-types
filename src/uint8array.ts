// The day we start using this is going to be quite a pain, but it's good to have the expected
// type at least for now (even if they aren't enforced)
export type Uint8ArrayLen64 = Uint8Array;
export type Uint8ArrayLen32 = Uint8Array;
export type Uint8ArrayLen100 = Uint8Array;

export const concatUInt8Array = (...args: Array<Uint8Array>): Uint8Array => {
  const totalLength = args.reduce((acc, current) => acc + current.length, 0);

  const concatted = new Uint8Array(totalLength);
  let currentIndex = 0;
  args.forEach((arr) => {
    concatted.set(arr, currentIndex);
    currentIndex += arr.length;
  });

  return concatted;
};
