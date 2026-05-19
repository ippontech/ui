import { clsx } from 'clsx';
import type { DataSelectable } from './DataSelectable.ts';

declare module 'react' {
  interface CSSProperties {
    '--ippon-meter-percentage'?: string;
  }
}

type IpponVanillaMeterProps = {
  value: number;
  min: number;
  max: number;
  label: string;
};

type IpponMeterProps = DataSelectable<IpponVanillaMeterProps>;

const toPercentage = (props: IpponVanillaMeterProps) => {
  const range = props.max - props.min;
  if (range === 0) {
    return 0;
  }
  return ((props.value - props.min) / range) * 100;
};

export const IpponMeter = (props: IpponMeterProps) => {
  const percentage = toPercentage(props);
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);

  return (
    /* NOSONAR */ <div
      className={clsx('ippon-meter')}
      role="meter"
      aria-valuenow={props.value}
      aria-valuemin={props.min}
      aria-valuemax={props.max}
      aria-label={props.label}
      data-selector={props.dataSelector}
      style={{ '--ippon-meter-percentage': `${clampedPercentage}%` }}
    ></div>
  );
};
