import { afterEach, describe, expect, it } from 'vitest';
import { render, screen, configure, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { IpponHelperText } from '../src';

configure({
  testIdAttribute: 'data-selector',
});

const getIpponHelperText = () => screen.getByTestId('ippon-helper-text');

describe('IpponHelperText', () => {
  afterEach(cleanup);

  it('should be like pattern library', () => {
    render(
      <IpponHelperText id="input-helper" dataSelector="ippon-helper-text">
        Helper text
      </IpponHelperText>,
    );

    const helper = getIpponHelperText();

    expect(helper).toHaveClass('ippon-helper-text');
    expect(helper).toHaveAttribute('id', 'input-helper');
    expect(helper).toHaveTextContent('Helper text');
  });

  it.each(['error', 'success'] as const)('should have variant %s', (variant) => {
    render(<IpponHelperText variant={variant} dataSelector="ippon-helper-text" />);

    expect(getIpponHelperText()).toHaveClass('ippon-helper-text', `-${variant}`);
  });

  it('should merge additional className', () => {
    render(<IpponHelperText className="-custom" dataSelector="ippon-helper-text" />);

    expect(getIpponHelperText()).toHaveClass('ippon-helper-text', '-custom');
  });
});
