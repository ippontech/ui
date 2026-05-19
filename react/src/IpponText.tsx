import type { IpponTokenTextColor } from './Tokens.ts';
import type { DataSelectableWithChildren } from './DataSelectable.ts';
import { clsx } from 'clsx';
import { optionalToAlternativeClass, optionalToPrefixedAlternativeClass } from './CAP.ts';
import type { JSX } from 'react';

type IpponTextBodyProps = {
  variant: 'body';
  weight?: 'bold';
  size?: 'small' | 'large';
};

type IpponTextLabelProps = {
  variant: 'label';
  size?: 'small' | 'large';
};

type IpponVariantProps = IpponTextBodyProps | IpponTextLabelProps;

type IpponVanillaTextProps = {
  color?: IpponTokenTextColor;
  tag?: keyof JSX.IntrinsicElements;
  placeholder?: boolean;
} & IpponVariantProps;

type IpponTextProps = DataSelectableWithChildren<IpponVanillaTextProps>;

const toBodyVariantClasses = (props: IpponTextBodyProps) =>
  clsx('-body', optionalToAlternativeClass(props.weight), optionalToAlternativeClass(props.size));

const toLabelVariantClasses = (props: IpponTextLabelProps) =>
  clsx('-label', optionalToAlternativeClass(props.size));

const toVariantClasses = (props: IpponVariantProps) => {
  if (props.variant === 'body') {
    return toBodyVariantClasses(props);
  }
  return toLabelVariantClasses(props);
};

export const IpponText = (props: IpponTextProps) => {
  const CustomTag: keyof JSX.IntrinsicElements = props.tag || 'span';
  return (
    <CustomTag
      className={clsx(
        'ippon-text',
        toVariantClasses(props),
        optionalToPrefixedAlternativeClass('color')(props.color),
        props.placeholder && '-placeholder',
      )}
      data-selector={props.dataSelector}
    >
      {props.children}
    </CustomTag>
  );
};
