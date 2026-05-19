import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, configure, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { IpponCard } from '../src';

configure({
  testIdAttribute: 'data-selector',
});

describe('IpponCard', () => {
  afterEach(cleanup);

  it('should be like pattern library', () => {
    render(<IpponCard dataSelector="ippon-card">Content</IpponCard>);

    const card = screen.getByTestId('ippon-card');

    expect(card).toHaveClass('ippon-card');
  });

  it('should render children', () => {
    render(<IpponCard dataSelector="ippon-card">Card Content</IpponCard>);

    const card = screen.getByTestId('ippon-card');

    expect(card).toHaveTextContent('Card Content');
  });

  describe('Shadow', () => {
    it.each([
      {
        level: 'l1',
        className: '-shadow-l1',
      },
      {
        level: 'l2',
        className: '-shadow-l2',
      },
      {
        level: 'l3',
        className: '-shadow-l3',
      },
      {
        level: 'l4',
        className: '-shadow-l4',
      },
      {
        level: 'l5',
        className: '-shadow-l5',
      },
      {
        level: 'l6',
        className: '-shadow-l6',
      },
    ] as const)('should have $className for $level', ({ level, className }) => {
      render(
        <IpponCard shadow={level} dataSelector="ippon-card">
          Content
        </IpponCard>,
      );

      const card = screen.getByTestId('ippon-card');

      expect(card).toHaveClass(className);
    });
  });

  describe('Border', () => {
    it('should not have border class by default', () => {
      render(<IpponCard dataSelector="ippon-card">Content</IpponCard>);

      const card = screen.getByTestId('ippon-card');

      expect(card).not.toHaveClass('-border');
    });

    it('should have border class when border is true', () => {
      render(
        <IpponCard border={true} dataSelector="ippon-card">
          Content
        </IpponCard>,
      );

      const card = screen.getByTestId('ippon-card');

      expect(card).toHaveClass('-border');
    });

    it('should not have border class when border is false', () => {
      render(
        <IpponCard border={false} dataSelector="ippon-card">
          Content
        </IpponCard>,
      );

      const card = screen.getByTestId('ippon-card');

      expect(card).not.toHaveClass('-border');
    });
  });

  describe('Size', () => {
    it('should not have size class by default', () => {
      render(<IpponCard dataSelector="ippon-card">Content</IpponCard>);

      const card = screen.getByTestId('ippon-card');

      expect(card).not.toHaveClass('-small');
      expect(card).not.toHaveClass('-large');
    });

    it.each([
      {
        size: 'small',
        className: '-small',
      },
      {
        size: 'large',
        className: '-large',
      },
    ] as const)('should have $className for size $size', ({ size, className }) => {
      render(
        <IpponCard size={size} dataSelector="ippon-card">
          Content
        </IpponCard>,
      );

      const card = screen.getByTestId('ippon-card');

      expect(card).toHaveClass(className);
    });
  });
});
