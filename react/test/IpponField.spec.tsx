import { afterEach, describe, expect, it } from 'vitest';
import { render, screen, configure, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { IpponField, IpponHelperText, IpponInputText, IpponLabel } from '../src';

configure({
  testIdAttribute: 'data-selector',
});

describe('IpponField', () => {
  afterEach(cleanup);

  it('should be like pattern library', () => {
    render(
      <IpponField dataSelector="ippon-field">
        <IpponLabel htmlFor="input">Label</IpponLabel>
        <IpponInputText id="input" aria-describedby="input-helper" />
        <IpponHelperText id="input-helper">Helper text</IpponHelperText>
      </IpponField>,
    );

    expect(screen.getByTestId('ippon-field')).toHaveClass('ippon-field');
    expect(screen.getByLabelText('Label')).toHaveAccessibleDescription('Helper text');
  });

  it('should merge additional className', () => {
    render(<IpponField className="-custom" dataSelector="ippon-field" />);

    expect(screen.getByTestId('ippon-field')).toHaveClass('ippon-field', '-custom');
  });
});
