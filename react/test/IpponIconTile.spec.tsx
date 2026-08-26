import { afterEach, describe, expect, it } from 'vitest';
import { render, screen, configure, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { IpponIconTile } from '../src';

configure({
  testIdAttribute: 'data-selector',
});

const getIpponIconTile = () => screen.getByTestId('ippon-icon-tile');

describe('IpponIconTile', () => {
  afterEach(cleanup);

  it('should be like pattern library', () => {
    render(<IpponIconTile icon={{ name: 'hardware-chip' }} dataSelector="ippon-icon-tile" />);

    const iconTile = getIpponIconTile();

    expect(iconTile).toHaveClass('ippon-icon-tile', 'ippon-ion-hardware-chip');
    expect(iconTile.tagName).toBe('SPAN');
  });

  it('should hide the decorative icon from assistive technologies', () => {
    render(<IpponIconTile icon={{ name: 'hardware-chip' }} dataSelector="ippon-icon-tile" />);

    expect(getIpponIconTile()).toHaveAttribute('role', 'presentation');
  });

  it('should use the icon variant', () => {
    render(
      <IpponIconTile
        icon={{ name: 'hardware-chip', variant: 'outline' }}
        dataSelector="ippon-icon-tile"
      />,
    );

    expect(getIpponIconTile()).toHaveClass('ippon-ion-hardware-chip-outline');
  });

  it.each(['success', 'error', 'information', 'warning', 'neutral'] as const)(
    'should have color alternative %s',
    (color) => {
      render(
        <IpponIconTile
          icon={{ name: 'hardware-chip' }}
          color={color}
          dataSelector="ippon-icon-tile"
        />,
      );

      expect(getIpponIconTile()).toHaveClass('ippon-icon-tile', `-${color}`);
    },
  );

  it.each(['small', 'large'] as const)('should have size alternative %s', (size) => {
    render(
      <IpponIconTile icon={{ name: 'hardware-chip' }} size={size} dataSelector="ippon-icon-tile" />,
    );

    expect(getIpponIconTile()).toHaveClass('ippon-icon-tile', `-${size}`);
  });
});
