import { clsx } from 'clsx';
import type { DataSelectable } from './DataSelectable.ts';

declare module 'react' {
  interface CSSProperties {
    '--ippon-progress-percentage'?: string;
  }
}

type IpponVanillaProgressProps = {
  value: number;
  min: number;
  max: number;
  label: string;
};

type IpponProgressProps = DataSelectable<IpponVanillaProgressProps>;

const toPercentage = (props: IpponVanillaProgressProps) => {
  const range = props.max - props.min;
  if (range === 0) {
    return 0;
  }
  return ((props.value - props.min) / range) * 100;
};

export const IpponProgress = (props: IpponProgressProps) => {
  const percentage = toPercentage(props);
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);
  const busy = props.value < props.max;

  return (
    /* NOSONAR */ <div
      className={clsx('ippon-progress')}
      role="progressbar"
      aria-valuenow={props.value}
      aria-valuemin={props.min}
      aria-valuemax={props.max}
      aria-label={props.label}
      aria-busy={busy}
      data-selector={props.dataSelector}
      style={{ '--ippon-progress-percentage': `${clampedPercentage}%` }}
    ></div>
  );
};
