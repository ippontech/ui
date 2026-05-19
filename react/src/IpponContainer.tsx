import type { DataSelectableWithChildren } from './DataSelectable.ts';
import type { JSX } from 'react';

type IpponContainerProps = DataSelectableWithChildren<{
  tag?: keyof JSX.IntrinsicElements;
}>;

export const IpponContainer = (props: IpponContainerProps) => {
  const CustomTag: keyof JSX.IntrinsicElements = props.tag || 'div';
  return (
    <CustomTag className="ippon-container" data-selector={props.dataSelector}>
      {props.children}
    </CustomTag>
  );
};
