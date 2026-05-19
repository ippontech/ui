import { cleanup, configure, render, screen } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { IpponHSpace, IpponHSpaceSlot } from '../src';

configure({
  testIdAttribute: 'data-selector',
});

describe('IpponHSpace', () => {
  afterEach(cleanup);

  it('should be like pattern library', () => {
    render(<IpponHSpace dataSelector="ippon-h-space" />);

    const ipponHSpace = screen.getByTestId('ippon-h-space');

    expect(ipponHSpace).toHaveClass('ippon-h-space');
  });

  it.each([2, 16, 32] as const)('should have gap %s', (gap) => {
    render(<IpponHSpace gap={gap} dataSelector="ippon-h-space" />);

    const ipponHSpace = screen.getByTestId('ippon-h-space');

    expect(ipponHSpace).toHaveClass(`-gap-${gap}`);
  });

  it.each(['left', 'right', 'middle', 'bottom'] as const)(
    'should have alignment %s',
    (alignment) => {
      render(<IpponHSpace align={alignment} dataSelector="ippon-h-space" />);

      const ipponHSpace = screen.getByTestId('ippon-h-space');

      expect(ipponHSpace).toHaveClass(`-${alignment}`);
    },
  );

  it('should mix alignments', () => {
    render(<IpponHSpace align={['left', 'bottom']} dataSelector="ippon-h-space" />);

    const ipponHSpace = screen.getByTestId('ippon-h-space');

    expect(ipponHSpace).toHaveClass('-left', '-bottom');
  });

  it('should render with default div tag', () => {
    render(<IpponHSpace dataSelector="ippon-h-space">Content</IpponHSpace>);

    const ipponHSpace = screen.getByTestId('ippon-h-space');

    expect(ipponHSpace.tagName).toBe('DIV');
  });

  it('should render with custom tag', () => {
    render(
      <IpponHSpace tag="section" dataSelector="ippon-h-space">
        Content
      </IpponHSpace>,
    );

    const ipponHSpace = screen.getByTestId('ippon-h-space');

    expect(ipponHSpace.tagName).toBe('SECTION');
  });

  it('should wrap', () => {
    render(
      <IpponHSpace wrap dataSelector="ippon-h-space">
        Content
      </IpponHSpace>,
    );

    const ipponHSpace = screen.getByTestId('ippon-h-space');

    expect(ipponHSpace).toHaveClass('-wrap');
  });

  describe('Slot', () => {
    it('shouldbe minimal', () => {
      render(
        <IpponHSpace>
          <IpponHSpaceSlot dataSelector="ippon-h-space-slot">Slot</IpponHSpaceSlot>
        </IpponHSpace>,
      );

      const ipponHSpaceSlot = screen.getByTestId('ippon-h-space-slot');

      expect(ipponHSpaceSlot).toHaveClass('ippon-h-space--slot');
    });

    it('should expand', () => {
      render(
        <IpponHSpace>
          <IpponHSpaceSlot expand dataSelector="ippon-h-space-slot">
            Slot
          </IpponHSpaceSlot>
        </IpponHSpace>,
      );

      const ipponHSpaceSlot = screen.getByTestId('ippon-h-space-slot');

      expect(ipponHSpaceSlot).toHaveClass('ippon-h-space--slot', '-expand');
    });
  });
});
