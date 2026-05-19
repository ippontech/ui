import type { DataSelectableWithChildren } from './DataSelectable.ts';
import { clsx } from 'clsx';
import type { JSX } from 'react';
import { Optional } from './Optional.ts';

type Level = 1 | 2 | 3 | 4 | 5;

type HeadingTag = `h${Level}`;

type IpponTitleWithHeadingProps = DataSelectableWithChildren<{
  tag: HeadingTag;
  level?: Level;
  placeholder?: boolean;
}>;

type IpponTitleWithNonHeadingProps = DataSelectableWithChildren<{
  tag?: Exclude<keyof JSX.IntrinsicElements, HeadingTag>;
  level: Level;
  placeholder?: boolean;
}>;

type IpponTitleProps = IpponTitleWithHeadingProps | IpponTitleWithNonHeadingProps;

const levelToClass = (level?: Level): string | undefined =>
  Optional.ofFalsifiable(level)
    .map((l) => `-l${l}`)
    .orUndefined();

export const IpponTitle = (props: IpponTitleProps) => {
  const CustomTag: keyof JSX.IntrinsicElements = (props.tag ||
    'div') as keyof JSX.IntrinsicElements;

  return (
    <CustomTag
      className={clsx(
        'ippon-title',
        levelToClass(props.level),
        props.placeholder && '-placeholder',
      )}
      data-selector={props.dataSelector}
    >
      {props.children}
    </CustomTag>
  );
};
