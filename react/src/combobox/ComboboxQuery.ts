import { Optional } from '../Optional.ts';

export type ComboboxQueryResult = void | Promise<void>;

const isPending = (result: ComboboxQueryResult): result is Promise<void> =>
  result !== undefined && typeof result.then === 'function';

export const toPendingQuery = (result: ComboboxQueryResult): Optional<Promise<void>> =>
  isPending(result) ? Optional.of(result) : Optional.empty();
