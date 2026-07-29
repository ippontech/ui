import { afterEach, describe, expect, it } from 'vitest';
import { render, screen, configure, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { IpponCode } from '../src';

configure({
  testIdAttribute: 'data-selector',
});

const getIpponCode = () => screen.getByTestId('ippon-code');

describe('IpponCode', () => {
  afterEach(cleanup);

  it('should be like pattern library', () => {
    render(<IpponCode dataSelector="ippon-code">npm install</IpponCode>);

    const code = getIpponCode();

    expect(code).toHaveClass('ippon-code');
    expect(code.tagName).toBe('PRE');
    expect(code.querySelector('code')).toHaveTextContent('npm install');
  });

  it('should carry the prism language on the pre, which is what themes style', () => {
    render(
      <IpponCode language="json" dataSelector="ippon-code">
        {'{}'}
      </IpponCode>,
    );

    const code = getIpponCode();

    expect(code).toHaveClass('ippon-code', 'language-json');
    expect(code.querySelector('code')?.className).toBe('');
  });

  it('should not carry any language class without a language', () => {
    render(<IpponCode dataSelector="ippon-code">{'{}'}</IpponCode>);

    expect(getIpponCode().className).not.toContain('language-');
  });

  it('should keep the content untouched', () => {
    render(<IpponCode dataSelector="ippon-code">{'line one\n  line two'}</IpponCode>);

    expect(getIpponCode().querySelector('code')?.textContent).toBe('line one\n  line two');
  });

  it('should merge additional className', () => {
    render(
      <IpponCode className="-custom" dataSelector="ippon-code">
        {'{}'}
      </IpponCode>,
    );

    expect(getIpponCode()).toHaveClass('ippon-code', '-custom');
  });
});
