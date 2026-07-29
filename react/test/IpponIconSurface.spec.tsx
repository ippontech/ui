import { afterEach, describe, expect, it } from 'vitest';
import { render, screen, configure, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { IpponIcon, IpponIconSurface } from '../src';

configure({
  testIdAttribute: 'data-selector',
});

const getIpponIconSurface = () => screen.getByTestId('ippon-icon-surface');

describe('IpponIconSurface', () => {
  afterEach(cleanup);

  it('should be like pattern library', () => {
    render(
      <IpponIconSurface dataSelector="ippon-icon-surface">
        <IpponIcon name="cloud-upload" size={24} />
      </IpponIconSurface>,
    );

    const iconSurface = getIpponIconSurface();

    expect(iconSurface).toHaveClass('ippon-icon-surface');
    expect(iconSurface.querySelector('.ippon-icon')).toBeInTheDocument();
  });

  it('should have color alternative', () => {
    render(
      <IpponIconSurface color="error" dataSelector="ippon-icon-surface">
        <IpponIcon name="warning" size={24} />
      </IpponIconSurface>,
    );

    expect(getIpponIconSurface()).toHaveClass('ippon-icon-surface', '-error');
  });
});
