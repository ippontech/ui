import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, configure, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { IpponButtonCard } from '../src';

configure({
  testIdAttribute: 'data-selector',
});

describe('IpponButtonCard', () => {
  afterEach(cleanup);

  it('should be like pattern library', () => {
    render(<IpponButtonCard dataSelector="ippon-button-card">Content</IpponButtonCard>);

    const buttonCard = screen.getByTestId('ippon-button-card');

    expect(buttonCard).toHaveClass('ippon-button-card');
  });

  it('should click', () => {
    const onClick = vi.fn();

    render(
      <IpponButtonCard onClick={onClick} dataSelector="ippon-button-card">
        Content
      </IpponButtonCard>,
    );

    const buttonCard = screen.getByTestId('ippon-button-card');
    buttonCard.click();

    expect(onClick).toHaveBeenCalled();
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
        <IpponButtonCard shadow={level} dataSelector="ippon-button-card">
          Content
        </IpponButtonCard>,
      );

      const card = screen.getByTestId('ippon-button-card');

      expect(card).toHaveClass(className);
    });
  });

  describe('Border', () => {
    it('should not have -border class by default', () => {
      render(<IpponButtonCard dataSelector="ippon-button-card">Content</IpponButtonCard>);

      const card = screen.getByTestId('ippon-button-card');

      expect(card).not.toHaveClass('-border');
    });

    it('should have -border class when border is present', () => {
      render(
        <IpponButtonCard border={true} dataSelector="ippon-button-card">
          Content
        </IpponButtonCard>,
      );

      const card = screen.getByTestId('ippon-button-card');

      expect(card).toHaveClass('-border');
    });

    it('should not have -border class when border is not present', () => {
      render(
        <IpponButtonCard border={false} dataSelector="ippon-button-card">
          Content
        </IpponButtonCard>,
      );

      const card = screen.getByTestId('ippon-button-card');

      expect(card).not.toHaveClass('-border');
    });
  });

  describe('Full width', () => {
    it('should not have -full-width class by default', () => {
      render(<IpponButtonCard dataSelector="ippon-button-card">Content</IpponButtonCard>);

      const card = screen.getByTestId('ippon-button-card');

      expect(card).not.toHaveClass('-full-width');
    });

    it('should have -full-width class when fullWidth is present', () => {
      render(
        <IpponButtonCard fullWidth={true} dataSelector="ippon-button-card">
          Content
        </IpponButtonCard>,
      );

      const card = screen.getByTestId('ippon-button-card');

      expect(card).toHaveClass('-full-width');
    });
  });

  describe('Size', () => {
    it('should not have size class by default', () => {
      render(<IpponButtonCard dataSelector="ippon-button-card">Content</IpponButtonCard>);

      const card = screen.getByTestId('ippon-button-card');

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
        <IpponButtonCard size={size} dataSelector="ippon-button-card">
          Content
        </IpponButtonCard>,
      );

      const card = screen.getByTestId('ippon-button-card');

      expect(card).toHaveClass(className);
    });
  });
});
