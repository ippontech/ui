import { IpponIon, type IpponIonProps } from './IpponIon.tsx';
import { clsx } from 'clsx';
import type { IpponTokenTextColor, IpponTokenSize } from './Tokens.ts';

export type IpponIconProps = IpponIonProps & {
  color?: IpponTokenTextColor;
  size?: IpponTokenSize;
};

export const IpponIcon = (props: IpponIconProps) => {
  const colorClass = props.color ? `-color-${props.color}` : null;
  const sizeClass = props.size ? `-size-${props.size}` : null;
  const className = clsx('ippon-icon', colorClass, sizeClass, props.className);
  return <IpponIon {...props} className={className} />;
};
