import type { IconClassic, IconLogo, IconVariant } from '@ippon-ui/icons';
import { clsx } from 'clsx';
import type { DataSelectable } from './DataSelectable.ts';

type IpponIconClassic = {
  name: IconClassic;
  variant?: IconVariant;
};

type IpponIconLogo = {
  name: IconLogo;
};

type IpponIconBase = {
  className?: string;
  onClick?: () => void;
};

export type IpponIonProps = DataSelectable<(IpponIconClassic | IpponIconLogo) & IpponIconBase>;

type IpponIconInfo = {
  name: string;
  variant?: string;
};

const toClassName = (props: IpponIconInfo): string => {
  const { name, variant } = props;
  const prefix = 'ippon-ion';
  const variantSuffix = variant ? `-${variant}` : '';
  return `${prefix}-${name}${variantSuffix}`;
};

export const IpponIon = (props: IpponIonProps) => {
  const CustomTag = props.onClick ? 'button' : 'span';

  return (
    /* NOSONAR */ <CustomTag
      role={props.onClick ? undefined : 'presentation'}
      type={props.onClick ? 'button' : undefined}
      className={clsx(toClassName(props), props.className)}
      data-selector={props.dataSelector}
      onClick={props.onClick}
    ></CustomTag>
  );
};
