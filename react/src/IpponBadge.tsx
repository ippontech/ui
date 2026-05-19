import type { DataSelectableWithChildren } from './DataSelectable.ts';
import type { IpponIonProps } from './IpponIon.tsx';
import { IpponIon } from './IpponIon.tsx';
import { clsx } from 'clsx';
import { optionalToAlternativeClass } from './CAP.ts';

type IpponBadgeButtonProps = IpponIonProps & {
  onClick?: () => void;
};

type IpponBadgeVanillaProps = {
  color?: 'brand' | 'neutral' | 'success' | 'error' | 'warning' | 'information';
  variant?: 'secondary';
  iconLeft?: IpponBadgeButtonProps;
  iconRight?: IpponBadgeButtonProps;
  placeholder?: boolean;
};

type IpponBadgeProps = DataSelectableWithChildren<IpponBadgeVanillaProps>;

const IpponBadgeIcon = ({ icon }: { icon: IpponBadgeButtonProps }) => {
  return (
    <IpponIon
      {...icon}
      className={clsx(
        'ippon-badge--icon',
        {
          '-clickable': !!icon.onClick,
        },
        icon.className,
      )}
    />
  );
};

const OptionalBadgeIcon = ({ icon }: { icon?: IpponBadgeButtonProps }) => {
  if (icon === undefined) {
    return null;
  }

  return <IpponBadgeIcon icon={icon} />;
};

export const IpponBadge = (props: IpponBadgeProps) => {
  const hasIcon = [props.iconLeft, props.iconRight].some((icon) => icon !== undefined);

  return (
    <span
      className={clsx(
        'ippon-badge',
        optionalToAlternativeClass(props.variant),
        optionalToAlternativeClass(props.color),
        { '-placeholder': !!props.placeholder },
      )}
      data-selector={props.dataSelector}
    >
      <OptionalBadgeIcon icon={props.iconLeft} />
      {hasIcon ? <span className="ippon-badge--text">{props.children}</span> : props.children}
      <OptionalBadgeIcon icon={props.iconRight} />
    </span>
  );
};
