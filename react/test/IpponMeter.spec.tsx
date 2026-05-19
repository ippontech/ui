import { describe, it, expect, afterEach } from 'vitest';
import { IpponMeter } from '../src';
import { render, screen, configure, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

configure({
  testIdAttribute: 'data-selector',
});

const expectMeterToHave = ({
  value,
  min,
  max,
  percentage,
  label,
}: {
  value: string;
  min: string;
  max: string;
  percentage: string;
  label: string;
}) => {
  const ipponMeter = screen.getByTestId('ippon-meter');

  expect(ipponMeter).toHaveAttribute('aria-label', label);
  expect(ipponMeter).toHaveClass('ippon-meter');
  expect(ipponMeter).toHaveAttribute('aria-valuenow', value);
  expect(ipponMeter).toHaveAttribute('aria-valuemin', min);
  expect(ipponMeter).toHaveAttribute('aria-valuemax', max);
  expect(ipponMeter).toHaveStyle(`--ippon-meter-percentage: ${percentage}`);
};

describe('IpponMeter', () => {
  afterEach(cleanup);

  it('Should have 0 everywhere with min, max and value at 0', () => {
    render(<IpponMeter value={0} min={0} max={0} label="Meter" dataSelector="ippon-meter" />);

    expectMeterToHave({
      label: 'Meter',
      value: '0',
      min: '0',
      max: '0',
      percentage: '0%',
    });
  });

  it('should have 50% for 11 on 22', () => {
    render(<IpponMeter value={11} min={0} max={22} label="Meter" dataSelector="ippon-meter" />);

    expectMeterToHave({
      label: 'Meter',
      value: '11',
      min: '0',
      max: '22',
      percentage: '50%',
    });
  });
});
