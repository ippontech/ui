import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, configure, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { IpponBadge } from '../src';

configure({
  testIdAttribute: 'data-selector',
});

const getIpponBadge = () => screen.getByTestId('ippon-badge');

const expectToHaveClasses = (...classes: string[]) =>
  expect(getIpponBadge()).toHaveClass('ippon-badge', ...classes);

const expectToHaveTextContent = (text: string) => expect(getIpponBadge()).toHaveTextContent(text);

const getTextPart = () => getIpponBadge().querySelector('.ippon-badge--text');

const expectToHaveTextPart = () => expect(getTextPart()).toBeInTheDocument();

const getIconParts = () => getIpponBadge().querySelectorAll<HTMLElement>('.ippon-badge--icon');

const expectIconPartsCount = (count: number) => expect(getIconParts()).toHaveLength(count);

describe('IpponBadge', () => {
  beforeEach(cleanup);

  it('should be minimal', () => {
    render(<IpponBadge dataSelector="ippon-badge">Default</IpponBadge>);

    expectToHaveClasses();
    expectToHaveTextContent('Default');
  });

  describe('Variant', () => {
    it('should be secondary', () => {
      render(
        <IpponBadge variant="secondary" dataSelector="ippon-badge">
          Secondary
        </IpponBadge>,
      );

      expectToHaveClasses('-secondary');
      expectToHaveTextContent('Secondary');
    });
  });

  describe('Color', () => {
    it('should be neutral', () => {
      render(
        <IpponBadge color="neutral" dataSelector="ippon-badge">
          Neutral
        </IpponBadge>,
      );

      expectToHaveClasses('-neutral');
      expectToHaveTextContent('Neutral');
    });

    it('should be success', () => {
      render(
        <IpponBadge color="success" dataSelector="ippon-badge">
          Success
        </IpponBadge>,
      );

      expectToHaveClasses('-success');
      expectToHaveTextContent('Success');
    });

    it('should be error', () => {
      render(
        <IpponBadge color="error" dataSelector="ippon-badge">
          Error
        </IpponBadge>,
      );

      expectToHaveClasses('-error');
      expectToHaveTextContent('Error');
    });

    it('should be warning', () => {
      render(
        <IpponBadge color="warning" dataSelector="ippon-badge">
          Warning
        </IpponBadge>,
      );

      expectToHaveClasses('-warning');
      expectToHaveTextContent('Warning');
    });

    it('should be information', () => {
      render(
        <IpponBadge color="information" dataSelector="ippon-badge">
          Information
        </IpponBadge>,
      );

      expectToHaveClasses('-information');
      expectToHaveTextContent('Information');
    });
  });

  describe('Icons', () => {
    it('should have icon left', () => {
      render(
        <IpponBadge
          iconLeft={{ name: 'alert-circle', variant: 'outline' }}
          dataSelector="ippon-badge"
        >
          With left icon
        </IpponBadge>,
      );

      expectToHaveClasses();
      expectToHaveTextPart();
      expectIconPartsCount(1);
    });

    it('should have icon right', () => {
      render(
        <IpponBadge iconRight={{ name: 'close', variant: 'outline' }} dataSelector="ippon-badge">
          With right icon
        </IpponBadge>,
      );

      expectToHaveClasses();
      expectToHaveTextPart();
      expectIconPartsCount(1);
    });

    it('should have both icons', () => {
      render(
        <IpponBadge
          iconLeft={{ name: 'alert-circle', variant: 'outline' }}
          iconRight={{ name: 'close', variant: 'outline' }}
          dataSelector="ippon-badge"
        >
          With both icons
        </IpponBadge>,
      );

      expectToHaveClasses();
      expectToHaveTextPart();
      expectIconPartsCount(2);
    });
  });

  describe('Clickable', () => {
    it('should have clickable icon left', () => {
      const onClick = vi.fn();

      render(
        <IpponBadge
          iconLeft={{ name: 'alert-circle', variant: 'outline', onClick }}
          dataSelector="ippon-badge"
        >
          Clickable left
        </IpponBadge>,
      );

      const icon = getIconParts()[0];
      expect(icon.tagName).toBe('BUTTON');
      expect(icon).toHaveClass('-clickable');
      icon.click();
      expect(onClick).toHaveBeenCalled();
    });

    it('should have clickable icon right', () => {
      const onClick = vi.fn();

      render(
        <IpponBadge
          iconRight={{ name: 'close', variant: 'outline', onClick }}
          dataSelector="ippon-badge"
        >
          Clickable right
        </IpponBadge>,
      );

      const icon = getIconParts()[0];
      expect(icon.tagName).toBe('BUTTON');
      expect(icon).toHaveClass('-clickable');
      icon.click();
      expect(onClick).toHaveBeenCalled();
    });

    it('should not have clickable class without onClick', () => {
      render(
        <IpponBadge
          iconLeft={{ name: 'alert-circle', variant: 'outline' }}
          dataSelector="ippon-badge"
        >
          Not clickable
        </IpponBadge>,
      );

      const icon = getIconParts()[0];
      expect(icon.tagName).toBe('SPAN');
      expect(icon).not.toHaveClass('-clickable');
    });
  });

  describe('Placeholder', () => {
    it('should display placeholder class', () => {
      render(
        <IpponBadge placeholder dataSelector="ippon-badge">
          Placeholder
        </IpponBadge>,
      );

      expectToHaveClasses('-placeholder');
    });
  });

  describe('Combinations', () => {
    it('should combine color and variant', () => {
      render(
        <IpponBadge color="success" variant="secondary" dataSelector="ippon-badge">
          Success Secondary
        </IpponBadge>,
      );

      expectToHaveClasses('-secondary', '-success');
      expectToHaveTextContent('Success Secondary');
    });

    it('should combine color and icon left', () => {
      render(
        <IpponBadge
          color="error"
          iconLeft={{ name: 'alert-circle', variant: 'outline' }}
          dataSelector="ippon-badge"
        >
          Error with icon
        </IpponBadge>,
      );

      expectToHaveClasses('-error');
      expectToHaveTextPart();
      expectIconPartsCount(1);
    });
  });
});
