import { Optional } from '../Optional.ts';

export type IpponComboboxOption = {
  key: string;
  label: string;
  description?: string;
  disabled?: boolean;
};

export const toEnabledOptions = <Option extends IpponComboboxOption>(
  options: readonly Option[],
): Option[] => options.filter((option) => !option.disabled);

export const toSelectedKeys = <Option extends IpponComboboxOption>(
  selection: readonly Option[],
): ReadonlySet<string> => new Set(selection.map((option) => option.key));

export const toDisplayValue = <Option extends IpponComboboxOption>(
  query: string,
  selection: readonly Option[],
  expanded: boolean,
): string => {
  if (expanded) {
    return query;
  }
  return Optional.ofFalsifiable(toJoinedLabels(selection)).orElse(query);
};

export const toJoinedLabels = <Option extends IpponComboboxOption>(
  selection: readonly Option[],
): string => selection.map((option) => option.label).join(', ');

export const toOptionId = (id: string, key: string): string => `${id}-option-${key}`;
