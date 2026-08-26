import type { IpponIonIcon, IpponIonProps } from './IpponIon.tsx';
import { IpponIon } from './IpponIon.tsx';
import { clsx } from 'clsx';

export type IpponButtonColor = 'success' | 'error' | 'information' | 'warning' | 'neutral';

export type IpponButtonVariant = 'secondary' | 'outline' | 'text';

export type IpponButtonSize = 'small' | 'large';

const ButtonIcon = ({ icon, loading }: { icon: IpponIonIcon; loading?: boolean }) => (
  <IpponIon
    {...(icon as IpponIonProps)}
    className={clsx('ippon-button--icon', { '-loading': loading })}
  />
);

export const OptionalButtonIcon = ({
  icon,
  loading,
}: {
  icon?: IpponIonIcon;
  loading?: boolean;
}) => {
  if (icon === undefined) {
    return null;
  }
  return <ButtonIcon icon={icon} loading={loading} />;
};
