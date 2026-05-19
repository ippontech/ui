import { beforeEach, describe, expect, it } from 'vitest';
import { cleanup, configure, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { IpponIcon } from '../src';

configure({
  testIdAttribute: 'data-selector',
});

describe('IpponIcon', () => {
  beforeEach(cleanup);

  it('should be minimal', () => {
    render(<IpponIcon name="paper-plane" dataSelector="ippon-icon" />);

    const ipponIcon = screen.getByTestId('ippon-icon');

    expect(ipponIcon).toHaveClass('ippon-icon', 'ippon-ion-paper-plane');
    expect(ipponIcon).toHaveRole('presentation');
  });

  it('should have a size', () => {
    render(<IpponIcon name="paper-plane" size={32} dataSelector="ippon-icon" />);

    const ipponIcon = screen.getByTestId('ippon-icon');

    expect(ipponIcon).toHaveClass('-size-32');
  });

  it('should have a color', () => {
    render(<IpponIcon name="paper-plane" color="brand-primary" dataSelector="ippon-icon" />);

    const ipponIcon = screen.getByTestId('ippon-icon');

    expect(ipponIcon).toHaveClass('-color-brand-primary');
  });
});
