export type IpponTokenSize =
  | 2
  | 4
  | 8
  | 10
  | 12
  | 16
  | 20
  | 24
  | 28
  | 32
  | 36
  | 40
  | 44
  | 48
  | 52
  | 56
  | 64
  | 886
  | 999;

type SemanticColor =
  | 'neutral'
  | 'brand'
  | 'success'
  | 'error'
  | 'warning'
  | 'information'
  | 'information-2';

type VariantColor = 'primary' | 'secondary' | 'on-primary' | 'on-secondary';

export type IpponTokenTextColor =
  | `${SemanticColor}-${VariantColor}`
  | 'neutral-tertiary'
  | 'neutral-tertiary-inversed';
