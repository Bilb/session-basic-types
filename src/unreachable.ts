/**
 * This function can be used to make sure all the possible values as input of a switch as taken care off, without having a default case.
 *
 */
export function assertUnreachable(_x: never, message: string): never {
  const msg = `assertUnreachable: Didn't expect to get here with "${message}"`;
  // eslint:disable: no-console
  // eslint-disable-next-line no-console
  console.info(msg);
  throw new Error(msg);
}
