import { clsx } from 'clsx';
import type { DataSelectableWithChildren } from './DataSelectable.ts';

type IpponCodeProps = DataSelectableWithChildren<{
  language?: string;
  className?: string;
}>;

export const IpponCode = (props: IpponCodeProps) => {
  const languageClass = props.language ? `language-${props.language}` : undefined;

  return (
    <pre
      className={clsx('ippon-code', props.className, languageClass)}
      data-selector={props.dataSelector}
    >
      <code>{props.children}</code>
    </pre>
  );
};
