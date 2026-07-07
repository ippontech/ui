import type { DataSelectableWithChildren } from './DataSelectable.ts';
import type {
  IpponButtonColor,
  IpponButtonIcon,
  IpponButtonSize,
  IpponButtonVariant,
} from './Button.tsx';
import { OptionalButtonIcon } from './Button.tsx';
import { optionalToAlternativeClass } from './CAP.ts';
import { clsx } from 'clsx';

export type IpponLinkButtonProps = DataSelectableWithChildren<{
  href: string;
  color?: IpponButtonColor;
  variant?: IpponButtonVariant;
  size?: IpponButtonSize;
  iconLeft?: IpponButtonIcon;
  iconRight?: IpponButtonIcon;
}>;

export const IpponLinkButton = (props: IpponLinkButtonProps) => {
  const hasIcon = [props.iconLeft, props.iconRight].some((icon) => icon !== undefined);

  return (
    <a
      className={clsx(
        'ippon-button',
        optionalToAlternativeClass(props.color),
        optionalToAlternativeClass(props.variant),
        optionalToAlternativeClass(props.size),
      )}
      href={props.href}
      data-selector={props.dataSelector}
    >
      <OptionalButtonIcon icon={props.iconLeft} />
      {hasIcon && props.children ? (
        <span className="ippon-button--text">{props.children}</span>
      ) : (
        props.children
      )}
      <OptionalButtonIcon icon={props.iconRight} />
    </a>
  );
};
