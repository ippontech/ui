import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen, configure, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { IpponText } from '../src';

configure({
  testIdAttribute: 'data-selector',
});

const expectToHaveClasses = (...classes: string[]) => {
  const ipponText = screen.getByTestId('ippon-text');

  expect(ipponText).toHaveClass('ippon-text', ...classes);
};

describe('IpponText', () => {
  beforeEach(cleanup);

  describe('Body', () => {
    describe('Medium', () => {
      it('should be minimal', () => {
        render(
          <IpponText variant="body" dataSelector="ippon-text">
            Content
          </IpponText>,
        );

        expectToHaveClasses('-body');
      });

      it('should be bold', () => {
        render(
          <IpponText variant="body" weight="bold" dataSelector="ippon-text">
            Content
          </IpponText>,
        );

        expectToHaveClasses('-body', '-bold');
      });
    });
    describe('Small', () => {
      it('should be minimal', () => {
        render(
          <IpponText variant="body" size="small" dataSelector="ippon-text">
            Content
          </IpponText>,
        );

        expectToHaveClasses('-body', '-small');
      });

      it('should be bold', () => {
        render(
          <IpponText variant="body" weight="bold" size="small" dataSelector="ippon-text">
            Content
          </IpponText>,
        );

        expectToHaveClasses('-body', '-bold', '-small');
      });
    });

    describe('Large', () => {
      it('should be minimal', () => {
        render(
          <IpponText variant="body" size="large" dataSelector="ippon-text">
            Content
          </IpponText>,
        );

        expectToHaveClasses('-body', '-large');
      });

      it('should be bold', () => {
        render(
          <IpponText variant="body" weight="bold" size="large" dataSelector="ippon-text">
            Content
          </IpponText>,
        );

        expectToHaveClasses('-body', '-bold', '-large');
      });
    });
  });

  describe('Label', () => {
    it('should be medium', () => {
      render(
        <IpponText variant="label" dataSelector="ippon-text">
          Content
        </IpponText>,
      );

      expectToHaveClasses('-label');
    });

    it('should be small', () => {
      render(
        <IpponText variant="label" size="small" dataSelector="ippon-text">
          Content
        </IpponText>,
      );

      expectToHaveClasses('-label', '-small');
    });

    it('should be large', () => {
      render(
        <IpponText variant="label" size="large" dataSelector="ippon-text">
          Content
        </IpponText>,
      );

      expectToHaveClasses('-label', '-large');
    });
  });

  describe('Placeholder', () => {
    it('should display placeholder class for body variant', () => {
      render(
        <IpponText variant="body" placeholder dataSelector="ippon-text">
          Content
        </IpponText>,
      );

      expectToHaveClasses('-body', '-placeholder');
    });

    it('should display placeholder class for label variant', () => {
      render(
        <IpponText variant="label" placeholder dataSelector="ippon-text">
          Content
        </IpponText>,
      );

      expectToHaveClasses('-label', '-placeholder');
    });

    it('should display placeholder with size modifier for body variant', () => {
      render(
        <IpponText variant="body" size="large" placeholder dataSelector="ippon-text">
          Content
        </IpponText>,
      );

      expectToHaveClasses('-body', '-large', '-placeholder');
    });
  });
});
