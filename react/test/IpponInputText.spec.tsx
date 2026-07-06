import { afterEach, describe, expect, it } from 'vitest';
import { render, screen, configure, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { IpponInputText } from '../src';

configure({
  testIdAttribute: 'data-selector',
});

const getIpponInputText = () => screen.getByTestId('ippon-input-text');

describe('IpponInputText', () => {
  afterEach(cleanup);

  it('should be like pattern library', () => {
    render(<IpponInputText dataSelector="ippon-input-text" />);

    const input = getIpponInputText();

    expect(input).toHaveClass('ippon-input-text');
    expect(input.tagName).toBe('INPUT');
    expect(input).toHaveAttribute('type', 'text');
  });

  it.each(['error', 'success'] as const)('should have variant %s', (variant) => {
    render(<IpponInputText variant={variant} dataSelector="ippon-input-text" />);

    expect(getIpponInputText()).toHaveClass('ippon-input-text', `-${variant}`);
  });

  it('should forward native input props', () => {
    render(
      <IpponInputText
        placeholder="Placeholder"
        disabled
        aria-describedby="helper"
        dataSelector="ippon-input-text"
      />,
    );

    const input = getIpponInputText();

    expect(input).toHaveAttribute('placeholder', 'Placeholder');
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute('aria-describedby', 'helper');
  });

  it('should be invalid with variant error', () => {
    render(<IpponInputText variant="error" dataSelector="ippon-input-text" />);

    expect(getIpponInputText()).toHaveAttribute('aria-invalid', 'true');
  });

  it('should not be invalid without variant error', () => {
    render(<IpponInputText variant="success" dataSelector="ippon-input-text" />);

    expect(getIpponInputText()).not.toHaveAttribute('aria-invalid');
  });

  it('should keep the given aria-invalid', () => {
    render(<IpponInputText variant="error" aria-invalid="false" dataSelector="ippon-input-text" />);

    expect(getIpponInputText()).toHaveAttribute('aria-invalid', 'false');
  });

  it('should keep the given type', () => {
    render(<IpponInputText type="search" dataSelector="ippon-input-text" />);

    expect(getIpponInputText()).toHaveAttribute('type', 'search');
  });

  it('should merge additional className', () => {
    render(<IpponInputText className="-custom" dataSelector="ippon-input-text" />);

    expect(getIpponInputText()).toHaveClass('ippon-input-text', '-custom');
  });
});
