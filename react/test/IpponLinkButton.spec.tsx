import { afterEach, describe, expect, it } from 'vitest';
import { render, screen, configure, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { IpponLinkButton } from '../src';

configure({
  testIdAttribute: 'data-selector',
});

const getIpponLinkButton = () => screen.getByTestId('ippon-link-button');

describe('IpponLinkButton', () => {
  afterEach(cleanup);

  it('should render a link with button classes', () => {
    render(
      <IpponLinkButton href="/settings" dataSelector="ippon-link-button">
        Settings
      </IpponLinkButton>,
    );

    const link = getIpponLinkButton();

    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', '/settings');
    expect(link).toHaveClass('ippon-button');
    expect(link).toHaveTextContent('Settings');
  });

  describe('Variant', () => {
    it.each(['secondary', 'outline', 'text'] as const)('should be %s', (variant) => {
      render(
        <IpponLinkButton href="/settings" variant={variant} dataSelector="ippon-link-button">
          {variant}
        </IpponLinkButton>,
      );

      expect(getIpponLinkButton()).toHaveClass('ippon-button', `-${variant}`);
    });
  });

  describe('Color', () => {
    it.each(['success', 'error', 'information', 'warning', 'neutral'] as const)(
      'should be %s',
      (color) => {
        render(
          <IpponLinkButton href="/settings" color={color} dataSelector="ippon-link-button">
            {color}
          </IpponLinkButton>,
        );

        expect(getIpponLinkButton()).toHaveClass('ippon-button', `-${color}`);
      },
    );
  });

  describe('Size', () => {
    it('should not have size class by default', () => {
      render(
        <IpponLinkButton href="/settings" dataSelector="ippon-link-button">
          Default
        </IpponLinkButton>,
      );

      expect(getIpponLinkButton()).not.toHaveClass('-small');
      expect(getIpponLinkButton()).not.toHaveClass('-large');
    });

    it.each(['small', 'large'] as const)('should be %s', (size) => {
      render(
        <IpponLinkButton href="/settings" size={size} dataSelector="ippon-link-button">
          {size}
        </IpponLinkButton>,
      );

      expect(getIpponLinkButton()).toHaveClass(`-${size}`);
    });
  });

  describe('Icons', () => {
    it('should wrap children in text part with icons', () => {
      render(
        <IpponLinkButton
          href="/settings"
          iconLeft={{ name: 'heart' }}
          iconRight={{ name: 'chevron-forward' }}
          dataSelector="ippon-link-button"
        >
          With icons
        </IpponLinkButton>,
      );

      const link = getIpponLinkButton();

      expect(link.querySelector('.ippon-button--text')).toHaveTextContent('With icons');
      expect(link.querySelectorAll('.ippon-button--icon')).toHaveLength(2);
    });

    it('should not have text part without icons', () => {
      render(
        <IpponLinkButton href="/settings" dataSelector="ippon-link-button">
          No icon
        </IpponLinkButton>,
      );

      expect(getIpponLinkButton().querySelector('.ippon-button--text')).not.toBeInTheDocument();
    });
  });
});
