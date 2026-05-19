import { cleanup, configure, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { IpponGrid, IpponGridSlot } from '../src';

configure({
  testIdAttribute: 'data-selector',
});

describe('IpponGrid', () => {
  afterEach(cleanup);

  it('should be like pattern library', () => {
    render(<IpponGrid dataSelector="ippon-grid">Content</IpponGrid>);

    const grid = screen.getByTestId('ippon-grid');

    expect(grid).toHaveClass('ippon-grid');
  });

  it('should render children', () => {
    render(<IpponGrid dataSelector="ippon-grid">Grid content</IpponGrid>);

    const grid = screen.getByTestId('ippon-grid');

    expect(grid).toHaveTextContent('Grid content');
  });

  describe('Media layout', () => {
    it('should have single media columns', () => {
      render(<IpponGrid media={4} dataSelector="ippon-grid" />);

      const grid = screen.getByTestId('ippon-grid');

      expect(grid).toHaveClass('-media-4');
    });

    it('should have responsive media columns', () => {
      render(<IpponGrid media={[4, 'desktop-m-12']} dataSelector="ippon-grid" />);

      const grid = screen.getByTestId('ippon-grid');

      expect(grid).toHaveClass('-media-4');
      expect(grid).toHaveClass('-media-desktop-m-12');
    });
  });

  describe('Container layout', () => {
    it('should have single container columns', () => {
      render(<IpponGrid container={4} dataSelector="ippon-grid" />);

      const grid = screen.getByTestId('ippon-grid');

      expect(grid).toHaveClass('-container-4');
    });

    it('should have responsive container columns', () => {
      render(<IpponGrid container={[4, 'm-12']} dataSelector="ippon-grid" />);

      const grid = screen.getByTestId('ippon-grid');

      expect(grid).toHaveClass('-container-4');
      expect(grid).toHaveClass('-container-m-12');
    });
  });

  describe('Gap', () => {
    it('should have single gap', () => {
      render(<IpponGrid gap={24} dataSelector="ippon-grid" />);

      const grid = screen.getByTestId('ippon-grid');

      expect(grid).toHaveClass('-gap-24');
    });

    it('should have responsive gap', () => {
      render(<IpponGrid gap={[16, 'm-12']} dataSelector="ippon-grid" />);

      const grid = screen.getByTestId('ippon-grid');

      expect(grid).toHaveClass('-gap-16');
      expect(grid).toHaveClass('-gap-m-12');
    });
  });

  describe('Slot', () => {
    it('should be like pattern library', () => {
      render(
        <IpponGrid>
          <IpponGridSlot dataSelector="ippon-grid-slot">Slot</IpponGridSlot>
        </IpponGrid>,
      );

      const slot = screen.getByTestId('ippon-grid-slot');

      expect(slot).toHaveClass('ippon-grid--slot');
    });

    it('should render children', () => {
      render(
        <IpponGrid>
          <IpponGridSlot dataSelector="ippon-grid-slot">Slot content</IpponGridSlot>
        </IpponGrid>,
      );

      const slot = screen.getByTestId('ippon-grid-slot');

      expect(slot).toHaveTextContent('Slot content');
    });

    it('should have single col span', () => {
      render(
        <IpponGrid>
          <IpponGridSlot col={4} dataSelector="ippon-grid-slot">
            Slot
          </IpponGridSlot>
        </IpponGrid>,
      );

      const slot = screen.getByTestId('ippon-grid-slot');

      expect(slot).toHaveClass('-col-4');
    });

    it('should have responsive col span', () => {
      render(
        <IpponGrid>
          <IpponGridSlot col={[4, 'desktop-m-8']} dataSelector="ippon-grid-slot">
            Slot
          </IpponGridSlot>
        </IpponGrid>,
      );

      const slot = screen.getByTestId('ippon-grid-slot');

      expect(slot).toHaveClass('-col-4');
      expect(slot).toHaveClass('-col-desktop-m-8');
    });
  });
});
