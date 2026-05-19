import { Optional } from './Optional';

export const toAlternativeClass = (alternative: string): string => `-${alternative}`;

export const optionalToAlternativeClass = (alternative: string | undefined): string | undefined =>
  Optional.ofFalsifiable(alternative).map(toAlternativeClass).orUndefined();

const prefixAlternativeClass = (prefix: string) => (alternative: string | number) =>
  toAlternativeClass([prefix, alternative].join('-'));

export const optionalToPrefixedAlternativeClass =
  (prefix: string) =>
  (alternative?: string | number): string | undefined =>
    Optional.ofFalsifiable(alternative).map(prefixAlternativeClass(prefix)).orUndefined();
