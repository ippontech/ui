import { beforeEach, describe, expect, it } from 'vitest';
import { cleanup, configure, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { IpponIon } from '../src';

configure({
  testIdAttribute: 'data-selector',
});

describe('IpponIon', () => {
  beforeEach(cleanup);

  it('should be minimal', () => {
    render(<IpponIon name="home" dataSelector="ippon-icon" />);

    const ipponIcon = screen.getByTestId('ippon-icon');

    expect(ipponIcon).toHaveRole('presentation');
  });

  it('should be filled', () => {
    render(<IpponIon name="home" dataSelector="ippon-icon" />);

    const ipponIcon = screen.getByTestId('ippon-icon');

    expect(ipponIcon).toHaveClass('ippon-ion-home');
  });

  it('should be sharp', () => {
    render(<IpponIon name="home" variant="sharp" dataSelector="ippon-icon" />);

    const ipponIcon = screen.getByTestId('ippon-icon');

    expect(ipponIcon).toHaveClass('ippon-ion-home-sharp');
  });

  it('should be outlined', () => {
    render(<IpponIon name="home" variant="outline" dataSelector="ippon-icon" />);

    const ipponIcon = screen.getByTestId('ippon-icon');

    expect(ipponIcon).toHaveClass('ippon-ion-home-outline');
  });

  it('should be a logo', () => {
    render(<IpponIon name="logo-ionic" dataSelector="ippon-icon" />);

    const ipponIcon = screen.getByTestId('ippon-icon');

    expect(ipponIcon).toHaveClass('ippon-ion-logo-ionic');
  });
});
