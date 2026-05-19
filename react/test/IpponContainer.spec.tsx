import { cleanup, configure, render, screen } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { IpponContainer } from '../src';

configure({
  testIdAttribute: 'data-selector',
});

describe('IpponContainer', () => {
  afterEach(cleanup);

  it('should be like pattern library', () => {
    render(<IpponContainer dataSelector="ippon-container" />);

    const ipponContainer = screen.getByTestId('ippon-container');

    expect(ipponContainer).toHaveClass('ippon-container');
  });

  it('should render children', () => {
    render(
      <IpponContainer dataSelector="ippon-container">
        <p>Test content</p>
      </IpponContainer>,
    );

    const content = screen.getByText('Test content');

    expect(content).toBeInTheDocument();
  });

  it('should render with default div tag', () => {
    render(<IpponContainer dataSelector="ippon-container" />);

    const element = screen.getByTestId('ippon-container');

    expect(element.tagName).toBe('DIV');
  });

  it('should render with custom tag', () => {
    render(<IpponContainer tag="section" dataSelector="ippon-container" />);

    const element = screen.getByTestId('ippon-container');

    expect(element.tagName).toBe('SECTION');
  });

  it('should render with article tag', () => {
    render(<IpponContainer tag="article" dataSelector="ippon-container" />);

    const element = screen.getByTestId('ippon-container');

    expect(element.tagName).toBe('ARTICLE');
  });
});
