import { cleanup, configure, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { IpponVSpace } from '../src';
import { IpponVSpaceSlot } from '../src/IpponVSpace.tsx';

configure({
  testIdAttribute: 'data-selector',
});

describe('IpponVSpace', () => {
  afterEach(cleanup);

  it('should be like pattern library', () => {
    render(<IpponVSpace dataSelector="ippon-v-space">Content</IpponVSpace>);

    const ipponVSpace = screen.getByTestId('ippon-v-space');

    expect(ipponVSpace).toHaveClass('ippon-v-space');
  });

  it.each([2, 16, 32] as const)('should have gap %s', (gap) => {
    render(<IpponVSpace gap={gap} dataSelector="ippon-v-space" />);

    const ipponVSpace = screen.getByTestId('ippon-v-space');

    expect(ipponVSpace).toHaveClass(`-gap-${gap}`);
  });

  it.each(['left', 'right', 'justify', 'center'] as const)(
    'should have alignment %s',
    (alignment) => {
      render(<IpponVSpace align={alignment} dataSelector="ippon-v-space" />);

      const ipponVSpace = screen.getByTestId('ippon-v-space');

      expect(ipponVSpace).toHaveClass(`-${alignment}`);
    },
  );

  it('should render with default div tag', () => {
    render(<IpponVSpace dataSelector="ippon-v-space">Content</IpponVSpace>);

    const ipponVSpace = screen.getByTestId('ippon-v-space');

    expect(ipponVSpace.tagName).toBe('DIV');
  });

  it('should render with custom tag', () => {
    render(
      <IpponVSpace tag="section" dataSelector="ippon-v-space">
        Content
      </IpponVSpace>,
    );

    const ipponVSpace = screen.getByTestId('ippon-v-space');

    expect(ipponVSpace.tagName).toBe('SECTION');
  });

  describe('Slot', () => {
    it('shouldbe minimal', () => {
      render(
        <IpponVSpace>
          <IpponVSpaceSlot dataSelector="ippon-v-space-slot">Slot</IpponVSpaceSlot>
        </IpponVSpace>,
      );

      const ipponVSpaceSlot = screen.getByTestId('ippon-v-space-slot');

      expect(ipponVSpaceSlot).toHaveClass('ippon-v-space--slot');
    });

    it.each(['left', 'right', 'justify', 'center'] as const)(
      'should have alignment %s',
      (alignment) => {
        render(
          <IpponVSpace>
            <IpponVSpaceSlot align={alignment} dataSelector="ippon-v-space-slot">
              Slot
            </IpponVSpaceSlot>
          </IpponVSpace>,
        );

        const ipponVSpaceSlot = screen.getByTestId('ippon-v-space-slot');

        expect(ipponVSpaceSlot).toHaveClass(`-${alignment}`);
      },
    );
  });
});
