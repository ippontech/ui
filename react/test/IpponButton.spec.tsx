import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, render, screen, configure, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { IpponButton } from '../src';

configure({
  testIdAttribute: 'data-selector',
});

const getIpponButton = () => screen.getByTestId('ippon-button');

const expectToHaveClasses = (...classes: string[]) =>
  expect(getIpponButton()).toHaveClass('ippon-button', ...classes);

const expectNotToHaveClasses = (...classes: string[]) => {
  const button = getIpponButton();
  classes.forEach((cls) => expect(button).not.toHaveClass(cls));
};

const expectToHaveTextContent = (text: string) => expect(getIpponButton()).toHaveTextContent(text);

const getTextPart = () => getIpponButton().querySelector('.ippon-button--text');

const expectToHaveTextPart = () => expect(getTextPart()).toBeInTheDocument();

const getRightIcon = () => getIpponButton().querySelector('.ippon-button--icon:last-of-type');

const getLeftIcon = () => getIpponButton().querySelector('.ippon-button--icon:first-of-type');

const getIconParts = () => getIpponButton().querySelectorAll<HTMLElement>('.ippon-button--icon');

const expectIconPartsCount = (count: number) => expect(getIconParts()).toHaveLength(count);

describe('IpponButton', () => {
  afterEach(cleanup);

  it('should be minimal', () => {
    render(<IpponButton dataSelector="ippon-button">Default</IpponButton>);

    expectToHaveClasses();
    expectToHaveTextContent('Default');
  });

  it('should click', () => {
    const onClick = vi.fn();

    render(
      <IpponButton onClick={onClick} dataSelector="ippon-button">
        Click me
      </IpponButton>,
    );

    getIpponButton().click();

    expect(onClick).toHaveBeenCalled();
  });

  describe('Variant', () => {
    it('should be secondary', () => {
      render(
        <IpponButton variant="secondary" dataSelector="ippon-button">
          Secondary
        </IpponButton>,
      );

      expectToHaveClasses('-secondary');
    });

    it('should be outline', () => {
      render(
        <IpponButton variant="outline" dataSelector="ippon-button">
          Outline
        </IpponButton>,
      );

      expectToHaveClasses('-outline');
    });

    it('should be text', () => {
      render(
        <IpponButton variant="text" dataSelector="ippon-button">
          Text
        </IpponButton>,
      );

      expectToHaveClasses('-text');
    });
  });

  describe('Color', () => {
    it.each(['success', 'error', 'information', 'warning', 'neutral'] as const)(
      'should be %s',
      (color) => {
        render(
          <IpponButton color={color} dataSelector="ippon-button">
            {color}
          </IpponButton>,
        );

        expectToHaveClasses(`-${color}`);
      },
    );
  });

  describe('Size', () => {
    it('should not have size class by default', () => {
      render(<IpponButton dataSelector="ippon-button">Default</IpponButton>);

      expectNotToHaveClasses('-small', '-large');
    });

    it.each(['small', 'large'] as const)('should be %s', (size) => {
      render(
        <IpponButton size={size} dataSelector="ippon-button">
          {size}
        </IpponButton>,
      );

      expectToHaveClasses(`-${size}`);
    });
  });

  describe('Disabled', () => {
    it('should not be disabled by default', () => {
      render(<IpponButton dataSelector="ippon-button">Default</IpponButton>);

      expect(getIpponButton()).not.toBeDisabled();
    });

    it('should be disabled', () => {
      render(
        <IpponButton disabled dataSelector="ippon-button">
          Disabled
        </IpponButton>,
      );

      expect(getIpponButton()).toBeDisabled();
    });

    it('should not call onClick when disabled', () => {
      const onClick = vi.fn();

      render(
        <IpponButton disabled onClick={onClick} dataSelector="ippon-button">
          Disabled
        </IpponButton>,
      );

      getIpponButton().click();

      expect(onClick).not.toHaveBeenCalled();
    });

    it('should be disabled while loading', async () => {
      let resolvePromise: () => void;
      const promise = new Promise<void>((resolve) => {
        resolvePromise = resolve;
      });
      const onClick = () => promise;

      render(
        <IpponButton onClick={onClick} dataSelector="ippon-button">
          Async
        </IpponButton>,
      );

      act(() => {
        getIpponButton().click();
      });

      expect(getIpponButton()).toBeDisabled();

      await act(() => {
        resolvePromise!();
        return promise;
      });
    });
  });

  describe('Icons', () => {
    it('should have icon left', () => {
      render(
        <IpponButton iconLeft={{ name: 'heart' }} dataSelector="ippon-button">
          With left icon
        </IpponButton>,
      );

      expectToHaveTextPart();
      expectIconPartsCount(1);
    });

    it('should have icon right', () => {
      render(
        <IpponButton iconRight={{ name: 'search' }} dataSelector="ippon-button">
          With right icon
        </IpponButton>,
      );

      expectToHaveTextPart();
      expectIconPartsCount(1);
    });

    it('should have both icons', () => {
      render(
        <IpponButton
          iconLeft={{ name: 'remove' }}
          iconRight={{ name: 'add' }}
          dataSelector="ippon-button"
        >
          With both icons
        </IpponButton>,
      );

      expectToHaveTextPart();
      expectIconPartsCount(2);
    });

    it('should not have text part without icons', () => {
      render(<IpponButton dataSelector="ippon-button">No icon</IpponButton>);

      expect(getTextPart()).not.toBeInTheDocument();
    });

    it('should not have text part with icon but without children', () => {
      render(<IpponButton iconLeft={{ name: 'heart' }} dataSelector="ippon-button" />);

      expect(getTextPart()).not.toBeInTheDocument();
    });

    it('should have icon when iconLeft is defined without children', () => {
      render(<IpponButton iconLeft={{ name: 'heart' }} dataSelector="ippon-button" />);

      expectIconPartsCount(1);
    });

    it('should have icon when iconRight is defined without children', () => {
      render(<IpponButton iconRight={{ name: 'search' }} dataSelector="ippon-button" />);

      expectIconPartsCount(1);
    });
  });

  describe('Loading (async onClick)', () => {
    it('should not be loading by default', () => {
      render(<IpponButton dataSelector="ippon-button">Default</IpponButton>);

      expectNotToHaveClasses('-loading');
      const ariaValue = getIpponButton().getAttribute('aria-busy');
      expect(ariaValue).toBeNull();
    });

    it('should not be loading with sync onClick', () => {
      const onClick = vi.fn();

      render(
        <IpponButton onClick={onClick} dataSelector="ippon-button">
          Sync
        </IpponButton>,
      );

      getIpponButton().click();

      expectNotToHaveClasses('-loading');
      const ariaValue = getIpponButton().getAttribute('aria-busy');
      expect(ariaValue).toBeNull();
      expect(getIpponButton()).not.toBeDisabled();
    });

    it('should be loading during async onClick', async () => {
      let resolvePromise: () => void;
      const promise = new Promise<void>((resolve) => {
        resolvePromise = resolve;
      });
      const onClick = () => promise;

      render(
        <IpponButton onClick={onClick} dataSelector="ippon-button">
          Async
        </IpponButton>,
      );

      act(() => {
        getIpponButton().click();
      });

      expectToHaveClasses('-loading');
      expect(getIpponButton()).toHaveAttribute('aria-busy', 'true');
      expect(getIpponButton()).toBeDisabled();

      await act(() => {
        resolvePromise!();
        return promise;
      });

      expectNotToHaveClasses('-loading');
      const ariaValue = getIpponButton().getAttribute('aria-busy');
      expect(ariaValue).toBeNull();
      expect(getIpponButton()).not.toBeDisabled();
    });

    it('should stop loading after async onClick rejection', async () => {
      let rejectPromise: () => void;
      const promise = new Promise<void>((_, reject) => {
        rejectPromise = reject;
      });
      const onClick = () => promise;

      render(
        <IpponButton onClick={onClick} dataSelector="ippon-button">
          Async error
        </IpponButton>,
      );

      act(() => {
        getIpponButton().click();
      });

      expectToHaveClasses('-loading');

      await act(async () => {
        rejectPromise!();
        try {
          await promise;
        } catch {
          // Expected rejection
        }
      });

      expectNotToHaveClasses('-loading');
      const ariaValue = getIpponButton().getAttribute('aria-busy');
      expect(ariaValue).toBeNull();
      expect(getIpponButton()).not.toBeDisabled();
    });

    it('should not trigger onClick while loading', async () => {
      let resolvePromise: () => void;
      const promise = new Promise<void>((resolve) => {
        resolvePromise = resolve;
      });
      const onClick = vi.fn(() => promise);

      render(
        <IpponButton onClick={onClick} dataSelector="ippon-button">
          Async
        </IpponButton>,
      );

      act(() => {
        getIpponButton().click();
      });

      expect(onClick).toHaveBeenCalledTimes(1);

      act(() => {
        getIpponButton().click();
      });

      expect(onClick).toHaveBeenCalledTimes(1);

      await act(() => {
        resolvePromise!();
        return promise;
      });
    });

    it('should handle click without onClick callback', () => {
      render(<IpponButton dataSelector="ippon-button">No callback</IpponButton>);

      // Should not throw or cause any issues
      expect(() => {
        getIpponButton().click();
      }).not.toThrow();
    });

    it('should handle onClick that returns void (not a promise)', () => {
      const onClick = vi.fn(() => {
        // Return void, not a promise
      });

      render(
        <IpponButton onClick={onClick} dataSelector="ippon-button">
          Sync void
        </IpponButton>,
      );

      getIpponButton().click();

      expect(onClick).toHaveBeenCalledTimes(1);
      expectNotToHaveClasses('-loading');
      const ariaValue = getIpponButton().getAttribute('aria-busy');
      expect(ariaValue).toBeNull();
    });

    it('should not be clickable while loading from previous async call', async () => {
      let resolvePromise: () => void;
      const promise = new Promise<void>((resolve) => {
        resolvePromise = resolve;
      });
      const onClick = vi.fn(() => promise);

      render(
        <IpponButton onClick={onClick} dataSelector="ippon-button">
          Async button
        </IpponButton>,
      );

      act(() => {
        getIpponButton().click();
      });

      expectToHaveClasses('-loading');
      expect(getIpponButton()).toBeDisabled();

      // Try to click while loading
      act(() => {
        getIpponButton().click();
      });

      // Should still only have been called once
      expect(onClick).toHaveBeenCalledTimes(1);

      await act(() => {
        resolvePromise!();
        return promise;
      });

      expectNotToHaveClasses('-loading');
      expect(getIpponButton()).not.toBeDisabled();
    });

    it('should replace right icon with sync icon during loading', async () => {
      let resolvePromise: () => void;
      const promise = new Promise<void>((resolve) => {
        resolvePromise = resolve;
      });
      const onClick = () => promise;

      render(
        <IpponButton onClick={onClick} iconRight={{ name: 'add' }} dataSelector="ippon-button">
          Async
        </IpponButton>,
      );

      const rightIcon = getRightIcon();
      expect(rightIcon).toHaveClass('ippon-ion-add');
      expect(rightIcon).not.toHaveClass('-loading');

      act(() => {
        getIpponButton().click();
      });

      const loadingRightIcon = getRightIcon();
      expect(loadingRightIcon).toHaveClass('ippon-ion-sync');
      expect(loadingRightIcon).toHaveClass('-loading');
      expect(loadingRightIcon).not.toHaveClass('ippon-ion-add');

      await act(() => {
        resolvePromise!();
        return promise;
      });

      const restoredRightIcon = getRightIcon();
      expect(restoredRightIcon).toHaveClass('ippon-ion-add');
      expect(restoredRightIcon).not.toHaveClass('ippon-ion-sync');
      expect(restoredRightIcon).not.toHaveClass('-loading');
    });

    it('should not have loading class on left icon during loading', async () => {
      let resolvePromise: () => void;
      const promise = new Promise<void>((resolve) => {
        resolvePromise = resolve;
      });
      const onClick = () => promise;

      render(
        <IpponButton
          onClick={onClick}
          iconLeft={{ name: 'remove' }}
          iconRight={{ name: 'add' }}
          dataSelector="ippon-button"
        >
          Async
        </IpponButton>,
      );

      act(() => {
        getIpponButton().click();
      });

      const leftIcon = getLeftIcon();
      expect(leftIcon).toHaveClass('ippon-ion-remove');
      expect(leftIcon).not.toHaveClass('-loading');

      const loadingRightIcon = getRightIcon();
      expect(loadingRightIcon).toHaveClass('ippon-ion-sync');
      expect(loadingRightIcon).toHaveClass('-loading');

      await act(() => {
        resolvePromise!();
        return promise;
      });
    });

    it('should not replace right icon when not loading', () => {
      render(
        <IpponButton iconRight={{ name: 'add' }} dataSelector="ippon-button">
          Not loading
        </IpponButton>,
      );

      const rightIcon = getRightIcon();
      expect(rightIcon).toHaveClass('ippon-ion-add');
      expect(rightIcon).not.toHaveClass('ippon-ion-sync');
    });

    it('should not add sync icon during loading without right icon', async () => {
      let resolvePromise: () => void;
      const promise = new Promise<void>((resolve) => {
        resolvePromise = resolve;
      });
      const onClick = () => promise;

      render(
        <IpponButton onClick={onClick} dataSelector="ippon-button">
          Async
        </IpponButton>,
      );

      act(() => {
        getIpponButton().click();
      });

      expectIconPartsCount(0);

      await act(() => {
        resolvePromise!();
        return promise;
      });
    });
  });

  describe('Popover trigger', () => {
    it('should not set popover attributes by default', () => {
      render(<IpponButton dataSelector="ippon-button">Default</IpponButton>);

      const button = getIpponButton();

      expect(button).not.toHaveAttribute('popovertarget');
      expect(button).not.toHaveAttribute('popovertargetaction');
    });

    it('should set popover target and action', () => {
      render(
        <IpponButton popoverTarget="menu" popoverTargetAction="toggle" dataSelector="ippon-button">
          Open
        </IpponButton>,
      );

      const button = getIpponButton();

      expect(button).toHaveAttribute('popovertarget', 'menu');
      expect(button).toHaveAttribute('popovertargetaction', 'toggle');
    });
  });

  describe('Combinations', () => {
    it('should combine color, variant and size', () => {
      render(
        <IpponButton color="success" variant="outline" size="large" dataSelector="ippon-button">
          Combined
        </IpponButton>,
      );

      expectToHaveClasses('-success', '-outline', '-large');
    });

    it('should combine color, variant and icon', () => {
      render(
        <IpponButton
          color="error"
          variant="secondary"
          iconLeft={{ name: 'alert-circle', variant: 'outline' }}
          dataSelector="ippon-button"
        >
          Error with icon
        </IpponButton>,
      );

      expectToHaveClasses('-error', '-secondary');
      expectToHaveTextPart();
      expectIconPartsCount(1);
    });

    it('should render children without text wrapper when no icon', () => {
      render(<IpponButton dataSelector="ippon-button">No icon text</IpponButton>);

      // When no icon, children are rendered directly (not wrapped in .ippon-button--text)
      expect(getTextPart()).not.toBeInTheDocument();
      expect(getIpponButton()).toHaveTextContent('No icon text');
    });

    it('should render children in text wrapper when icon exists', () => {
      render(
        <IpponButton iconLeft={{ name: 'heart' }} dataSelector="ippon-button">
          With icon text
        </IpponButton>,
      );

      // When icon exists, children are wrapped in .ippon-button--text
      expectToHaveTextPart();
      expect(getTextPart()).toHaveTextContent('With icon text');
    });

    it('should render both children and text wrapper when both icons exist', () => {
      render(
        <IpponButton
          iconLeft={{ name: 'heart' }}
          iconRight={{ name: 'search' }}
          dataSelector="ippon-button"
        >
          Both icons text
        </IpponButton>,
      );

      expectToHaveTextPart();
      expect(getTextPart()).toHaveTextContent('Both icons text');
      expectIconPartsCount(2);
    });

    it('should render icon even without children', () => {
      render(<IpponButton iconLeft={{ name: 'heart' }} dataSelector="ippon-button" />);

      expectIconPartsCount(1);
      expect(getTextPart()).not.toBeInTheDocument();
    });

    it('should render right icon even without children', () => {
      render(<IpponButton iconRight={{ name: 'search' }} dataSelector="ippon-button" />);

      expectIconPartsCount(1);
      expect(getTextPart()).not.toBeInTheDocument();
    });

    it('should render disabled button with icon', () => {
      render(
        <IpponButton disabled iconLeft={{ name: 'heart' }} dataSelector="ippon-button">
          Disabled with icon
        </IpponButton>,
      );

      expect(getIpponButton()).toBeDisabled();
      expectToHaveTextPart();
      expectIconPartsCount(1);
    });

    it('should handle onClick that returns non-Promise object', () => {
      const onClick = vi.fn(() => {
        // Return void (undefined), not a promise
      });

      render(
        <IpponButton onClick={onClick} dataSelector="ippon-button">
          Non-promise object
        </IpponButton>,
      );

      getIpponButton().click();

      expect(onClick).toHaveBeenCalledTimes(1);
      expectNotToHaveClasses('-loading');
      const ariaValue = getIpponButton().getAttribute('aria-busy');
      expect(ariaValue).toBeNull();
    });

    it('should handle onClick that returns undefined', () => {
      const onClick = vi.fn(() => undefined);

      render(
        <IpponButton onClick={onClick} dataSelector="ippon-button">
          Undefined return
        </IpponButton>,
      );

      getIpponButton().click();

      expect(onClick).toHaveBeenCalledTimes(1);
      expectNotToHaveClasses('-loading');
    });
  });
});
