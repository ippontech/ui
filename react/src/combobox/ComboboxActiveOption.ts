import { Optional } from '../Optional.ts';
import type { IpponComboboxOption } from './ComboboxOption.ts';
import { toEnabledOptions } from './ComboboxOption.ts';

export type ComboboxActiveOption<Option extends IpponComboboxOption> = {
  activeKey?: string;
  activeOption: Optional<Option>;
  activate: (key: string) => void;
  move: (delta: number) => void;
};

const toWrappedIndex = (currentIndex: number, delta: number, length: number): number => {
  if (currentIndex === -1) {
    return delta > 0 ? 0 : length - 1;
  }
  return (currentIndex + delta + length) % length;
};

const toKey = <Option extends IpponComboboxOption>(option?: Option): Optional<string> =>
  Optional.ofUndefinable(option).map((found) => found.key);

export const toActiveOption = <Option extends IpponComboboxOption>(
  options: readonly Option[],
  activeKey?: string,
): Optional<Option> =>
  Optional.ofUndefinable(toEnabledOptions(options).find((option) => option.key === activeKey));

export const toMovedKey = <Option extends IpponComboboxOption>(
  options: readonly Option[],
  activeKey: string | undefined,
  delta: number,
): Optional<string> => {
  const enabled = toEnabledOptions(options);
  const currentIndex = enabled.findIndex((option) => option.key === activeKey);
  return toKey(enabled[toWrappedIndex(currentIndex, delta, enabled.length)]).or(() =>
    Optional.ofUndefinable(activeKey),
  );
};
