import type { IconClassic, IconLogo, IconVariant } from '@ippon-ui/icons';
import type { IpponIonProps } from './IpponIon.tsx';
import { IpponIon } from './IpponIon.tsx';
import { clsx } from 'clsx';

export type IpponButtonIcon = {
  name: IconClassic | IconLogo;
  variant?: IconVariant;
};

export type IpponButtonColor = 'success' | 'error' | 'information' | 'warning' | 'neutral';

export type IpponButtonVariant = 'secondary' | 'outline' | 'text';

export type IpponButtonSize = 'small' | 'large';

const ButtonIcon = ({ icon, loading }: { icon: IpponButtonIcon; loading?: boolean }) => (
  <IpponIon
    {...(icon as IpponIonProps)}
    className={clsx('ippon-button--icon', { '-loading': loading })}
  />
);

export const OptionalButtonIcon = ({
  icon,
  loading,
}: {
  icon?: IpponButtonIcon;
  loading?: boolean;
}) => {
  if (icon === undefined) {
    return null;
  }
  return <ButtonIcon icon={icon} loading={loading} />;
};
