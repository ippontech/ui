import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen, configure, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { IpponTitleDisplay } from '../src';

configure({
  testIdAttribute: 'data-selector',
});

describe('IpponTitleDisplay', () => {
  beforeEach(cleanup);

  describe('HTML Tags', () => {
    it('should render as div by default', () => {
      render(
        <IpponTitleDisplay size="large" dataSelector="ippon-title-display">
          Display title
        </IpponTitleDisplay>,
      );
      const title = screen.getByTestId('ippon-title-display');
      expect(title.tagName).toBe('DIV');
      expect(title).toHaveClass('ippon-title-display');
    });

    it('should render as h1 when specified', () => {
      render(
        <IpponTitleDisplay tag="h1" dataSelector="ippon-title-display">
          Display title
        </IpponTitleDisplay>,
      );
      const title = screen.getByTestId('ippon-title-display');
      expect(title.tagName).toBe('H1');
      expect(title).toHaveClass('ippon-title-display');
    });

    it('should render as h2 when specified', () => {
      render(
        <IpponTitleDisplay tag="h2" dataSelector="ippon-title-display">
          Display title
        </IpponTitleDisplay>,
      );
      const title = screen.getByTestId('ippon-title-display');
      expect(title.tagName).toBe('H2');
      expect(title).toHaveClass('ippon-title-display');
    });

    it('should render as h3 when specified', () => {
      render(
        <IpponTitleDisplay tag="h3" dataSelector="ippon-title-display">
          Display title
        </IpponTitleDisplay>,
      );
      const title = screen.getByTestId('ippon-title-display');
      expect(title.tagName).toBe('H3');
      expect(title).toHaveClass('ippon-title-display');
    });
  });

  describe('Sizes', () => {
    it('should not have a size class by default', () => {
      render(
        <IpponTitleDisplay tag="h1" dataSelector="ippon-title-display">
          Display title
        </IpponTitleDisplay>,
      );
      const title = screen.getByTestId('ippon-title-display');
      expect(title.className).toBe('ippon-title-display');
    });

    it.each(['large', 'medium', 'small'] as const)('should render %s size class', (size) => {
      render(
        <IpponTitleDisplay tag="h1" size={size} dataSelector="ippon-title-display">
          Display title
        </IpponTitleDisplay>,
      );
      const title = screen.getByTestId('ippon-title-display');
      expect(title).toHaveClass('ippon-title-display', `-${size}`);
    });
  });

  describe('Colors', () => {
    it('should render the color class', () => {
      render(
        <IpponTitleDisplay tag="h1" color="brand-primary" dataSelector="ippon-title-display">
          Display title
        </IpponTitleDisplay>,
      );
      const title = screen.getByTestId('ippon-title-display');
      expect(title).toHaveClass('ippon-title-display', '-color-brand-primary');
    });
  });

  describe('Children', () => {
    it('should render its children', () => {
      render(
        <IpponTitleDisplay tag="h1" dataSelector="ippon-title-display">
          Display title
        </IpponTitleDisplay>,
      );
      expect(screen.getByTestId('ippon-title-display')).toHaveTextContent('Display title');
    });
  });
});
