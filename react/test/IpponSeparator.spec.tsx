import { afterEach, describe, expect, it } from 'vitest';
import { render, screen, configure, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { IpponSeparator } from '../src';

configure({
  testIdAttribute: 'data-selector',
});

const getIpponSeparator = () => screen.getByTestId('ippon-separator');

describe('IpponSeparator', () => {
  afterEach(cleanup);

  it('should be like pattern library', () => {
    render(<IpponSeparator dataSelector="ippon-separator" />);

    const separator = getIpponSeparator();

    expect(separator).toHaveClass('ippon-separator');
    expect(separator.tagName).toBe('HR');
  });

  it('should merge additional className', () => {
    render(<IpponSeparator className="-custom" dataSelector="ippon-separator" />);

    expect(getIpponSeparator()).toHaveClass('ippon-separator', '-custom');
  });
});
