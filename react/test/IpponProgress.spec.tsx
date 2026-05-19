import { describe, it, expect, afterEach } from 'vitest';
import { IpponProgress } from '../src';
import { render, screen, configure, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

configure({
  testIdAttribute: 'data-selector',
});

const expectProgressToHave = ({
  value,
  min,
  max,
  percentage,
  label,
  busy,
}: {
  value: string;
  min: string;
  max: string;
  percentage: string;
  label: string;
  busy: string;
}) => {
  const ipponProgress = screen.getByTestId('ippon-progress');

  expect(ipponProgress).toHaveAttribute('aria-label', label);
  expect(ipponProgress).toHaveClass('ippon-progress');
  expect(ipponProgress).toHaveAttribute('role', 'progressbar');
  expect(ipponProgress).toHaveAttribute('aria-valuenow', value);
  expect(ipponProgress).toHaveAttribute('aria-valuemin', min);
  expect(ipponProgress).toHaveAttribute('aria-valuemax', max);
  expect(ipponProgress).toHaveAttribute('aria-busy', busy);
  expect(ipponProgress).toHaveStyle(`--ippon-progress-percentage: ${percentage}`);
};

describe('IpponProgress', () => {
  afterEach(cleanup);

  it.each([
    { value: 0, min: 0, max: 0, expectedPercentage: '0%', expectedBusy: 'false' },
    { value: 11, min: 0, max: 22, expectedPercentage: '50%', expectedBusy: 'true' },
    { value: 22, min: 0, max: 22, expectedPercentage: '100%', expectedBusy: 'false' },
    { value: 30, min: 10, max: 50, expectedPercentage: '50%', expectedBusy: 'true' },
  ])(
    'should have $expectedPercentage for value $value with min $min and max $max',
    ({ value, min, max, expectedPercentage, expectedBusy }) => {
      render(
        <IpponProgress
          value={value}
          min={min}
          max={max}
          label="Progress"
          dataSelector="ippon-progress"
        />,
      );

      expectProgressToHave({
        label: 'Progress',
        value: String(value),
        min: String(min),
        max: String(max),
        percentage: expectedPercentage,
        busy: expectedBusy,
      });
    },
  );
});
