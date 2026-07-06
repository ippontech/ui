import { afterEach, describe, expect, it } from 'vitest';
import { render, screen, configure, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { IpponLabel } from '../src';

configure({
  testIdAttribute: 'data-selector',
});

const getIpponLabel = () => screen.getByTestId('ippon-label');

describe('IpponLabel', () => {
  afterEach(cleanup);

  it('should be like pattern library', () => {
    render(
      <IpponLabel htmlFor="input" dataSelector="ippon-label">
        Label
      </IpponLabel>,
    );

    const label = getIpponLabel();

    expect(label).toHaveClass('ippon-label');
    expect(label.tagName).toBe('LABEL');
    expect(label).toHaveAttribute('for', 'input');
    expect(label).toHaveTextContent('Label');
  });

  it('should merge additional className', () => {
    render(<IpponLabel className="-custom" dataSelector="ippon-label" />);

    expect(getIpponLabel()).toHaveClass('ippon-label', '-custom');
  });
});
