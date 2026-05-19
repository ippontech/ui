import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen, configure, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { IpponTitle } from '../src';

configure({
  testIdAttribute: 'data-selector',
});

describe('IpponTitle', () => {
  beforeEach(cleanup);

  describe('HTML Tags', () => {
    it('should render as div by default', () => {
      render(
        <IpponTitle level={1} dataSelector="ippon-title">
          Title
        </IpponTitle>,
      );
      const title = screen.getByTestId('ippon-title');
      expect(title.tagName).toBe('DIV');
      expect(title).toHaveClass('ippon-title');
    });

    it('should render as h1 when specified', () => {
      render(
        <IpponTitle tag="h1" dataSelector="ippon-title">
          Title
        </IpponTitle>,
      );
      const title = screen.getByTestId('ippon-title');
      expect(title.tagName).toBe('H1');
      expect(title).toHaveClass('ippon-title');
    });

    it('should render as h2 when specified', () => {
      render(
        <IpponTitle tag="h2" dataSelector="ippon-title">
          Title
        </IpponTitle>,
      );
      const title = screen.getByTestId('ippon-title');
      expect(title.tagName).toBe('H2');
      expect(title).toHaveClass('ippon-title');
    });

    it('should render as h3 when specified', () => {
      render(
        <IpponTitle tag="h3" dataSelector="ippon-title">
          Title
        </IpponTitle>,
      );
      const title = screen.getByTestId('ippon-title');
      expect(title.tagName).toBe('H3');
      expect(title).toHaveClass('ippon-title');
    });

    it('should render as h4 when specified', () => {
      render(
        <IpponTitle tag="h4" dataSelector="ippon-title">
          Title
        </IpponTitle>,
      );
      const title = screen.getByTestId('ippon-title');
      expect(title.tagName).toBe('H4');
      expect(title).toHaveClass('ippon-title');
    });

    it('should render as h5 when specified', () => {
      render(
        <IpponTitle tag="h5" dataSelector="ippon-title">
          Title
        </IpponTitle>,
      );
      const title = screen.getByTestId('ippon-title');
      expect(title.tagName).toBe('H5');
      expect(title).toHaveClass('ippon-title');
    });

    it('should render as p when specified with level', () => {
      render(
        <IpponTitle tag="p" level={1} dataSelector="ippon-title">
          Title
        </IpponTitle>,
      );
      const title = screen.getByTestId('ippon-title');
      expect(title.tagName).toBe('P');
      expect(title).toHaveClass('ippon-title');
    });

    it('should render as span when specified with level', () => {
      render(
        <IpponTitle tag="span" level={2} dataSelector="ippon-title">
          Title
        </IpponTitle>,
      );
      const title = screen.getByTestId('ippon-title');
      expect(title.tagName).toBe('SPAN');
      expect(title).toHaveClass('ippon-title');
    });

    it('should render as h6 when specified with level', () => {
      render(
        <IpponTitle tag="h6" level={3} dataSelector="ippon-title">
          Title
        </IpponTitle>,
      );
      const title = screen.getByTestId('ippon-title');
      expect(title.tagName).toBe('H6');
      expect(title).toHaveClass('ippon-title');
    });
  });

  describe('Level Variants', () => {
    it('should not have level class when level is not specified with heading tag', () => {
      render(
        <IpponTitle tag="h1" dataSelector="ippon-title">
          Title
        </IpponTitle>,
      );
      const title = screen.getByTestId('ippon-title');
      expect(title).toHaveClass('ippon-title');
      expect(title.className).not.toMatch(/-l\d/);
    });

    it('should have level 1 class with div', () => {
      render(
        <IpponTitle level={1} dataSelector="ippon-title">
          Title
        </IpponTitle>,
      );
      const title = screen.getByTestId('ippon-title');
      expect(title).toHaveClass('ippon-title', '-l1');
    });

    it('should have level 1 class with heading tag', () => {
      render(
        <IpponTitle tag="h2" level={1} dataSelector="ippon-title">
          Title
        </IpponTitle>,
      );
      const title = screen.getByTestId('ippon-title');
      expect(title).toHaveClass('ippon-title', '-l1');
    });

    it('should have level 2 class', () => {
      render(
        <IpponTitle level={2} dataSelector="ippon-title">
          Title
        </IpponTitle>,
      );
      const title = screen.getByTestId('ippon-title');
      expect(title).toHaveClass('ippon-title', '-l2');
    });

    it('should have level 3 class', () => {
      render(
        <IpponTitle level={3} dataSelector="ippon-title">
          Title
        </IpponTitle>,
      );
      const title = screen.getByTestId('ippon-title');
      expect(title).toHaveClass('ippon-title', '-l3');
    });

    it('should have level 4 class', () => {
      render(
        <IpponTitle level={4} dataSelector="ippon-title">
          Title
        </IpponTitle>,
      );
      const title = screen.getByTestId('ippon-title');
      expect(title).toHaveClass('ippon-title', '-l4');
    });

    it('should have level 5 class', () => {
      render(
        <IpponTitle level={5} dataSelector="ippon-title">
          Title
        </IpponTitle>,
      );
      const title = screen.getByTestId('ippon-title');
      expect(title).toHaveClass('ippon-title', '-l5');
    });
  });

  describe('Placeholder', () => {
    it('should have placeholder class when enabled with div', () => {
      render(
        <IpponTitle level={1} placeholder dataSelector="ippon-title">
          Title
        </IpponTitle>,
      );
      const title = screen.getByTestId('ippon-title');
      expect(title).toHaveClass('ippon-title', '-l1', '-placeholder');
    });

    it('should have placeholder class with level modifier and heading tag', () => {
      render(
        <IpponTitle tag="h2" level={2} placeholder dataSelector="ippon-title">
          Title
        </IpponTitle>,
      );
      const title = screen.getByTestId('ippon-title');
      expect(title).toHaveClass('ippon-title', '-l2', '-placeholder');
    });
  });

  describe('Children Rendering', () => {
    it('should render children content', () => {
      render(
        <IpponTitle level={1} dataSelector="ippon-title">
          My Title Content
        </IpponTitle>,
      );
      const title = screen.getByTestId('ippon-title');
      expect(title).toHaveTextContent('My Title Content');
    });

    it('should render react elements as children', () => {
      render(
        <IpponTitle level={1} dataSelector="ippon-title">
          <span>Title with span</span>
        </IpponTitle>,
      );
      const title = screen.getByTestId('ippon-title');
      expect(title.querySelector('span')).toHaveTextContent('Title with span');
    });
  });

  describe('Data Selector', () => {
    it('should bind data-selector attribute', () => {
      render(
        <IpponTitle level={1} dataSelector="my-custom-selector">
          Title
        </IpponTitle>,
      );
      const title = screen.getByTestId('my-custom-selector');
      expect(title).toBeInTheDocument();
    });
  });
});
