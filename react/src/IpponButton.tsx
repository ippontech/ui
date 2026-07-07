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
import { useState } from 'react';

type IpponButtonVanillaProps = {
  color?: IpponButtonColor;
  variant?: IpponButtonVariant;
  size?: IpponButtonSize;
  disabled?: boolean;
  iconLeft?: IpponButtonIcon;
  iconRight?: IpponButtonIcon;
  onClick?: () => void | Promise<void>;
  popoverTarget?: string;
  popoverTargetAction?: 'toggle' | 'show' | 'hide';
};

export type IpponButtonProps = DataSelectableWithChildren<IpponButtonVanillaProps>;

const isPromise = (value: unknown): value is Promise<void> =>
  value !== null && value !== undefined && typeof (value as Promise<void>).then === 'function';

const LOADING_ICON: IpponButtonIcon = { name: 'sync' };

export const IpponButton = (props: IpponButtonProps) => {
  const [loading, setLoading] = useState(false);
  const hasIcon = [props.iconLeft, props.iconRight].some((icon) => icon !== undefined);
  const isDisabled = props.disabled || loading;
  const resolvedIconRight = loading && props.iconRight ? LOADING_ICON : props.iconRight;

  const handleClick = () => {
    if (!props.onClick || loading) {
      return;
    }

    const result = props.onClick();

    if (isPromise(result)) {
      setLoading(true);
      result.catch(() => {}).finally(() => setLoading(false));
    }
  };

  return (
    <button
      className={clsx(
        'ippon-button',
        optionalToAlternativeClass(props.color),
        optionalToAlternativeClass(props.variant),
        optionalToAlternativeClass(props.size),
        { '-loading': loading },
      )}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      data-selector={props.dataSelector}
      popoverTarget={props.popoverTarget}
      popoverTargetAction={props.popoverTargetAction}
      onClick={handleClick}
    >
      <OptionalButtonIcon icon={props.iconLeft} />
      {hasIcon && props.children ? (
        <span className="ippon-button--text">{props.children}</span>
      ) : (
        props.children
      )}
      <OptionalButtonIcon icon={resolvedIconRight} loading={loading} />
    </button>
  );
};
