import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen, configure, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { IpponCheckbox } from '../src';

configure({
  testIdAttribute: 'data-selector',
});

const getIpponCheckbox = () => screen.getByTestId('ippon-checkbox');

const getInput = () => screen.getByTestId('ippon-checkbox.input');

describe('IpponCheckbox', () => {
  afterEach(cleanup);

  it('should be like pattern library', () => {
    render(
      <IpponCheckbox dataSelector="ippon-checkbox" id="option">
        Label
      </IpponCheckbox>,
    );

    const checkbox = getIpponCheckbox();

    expect(checkbox).toHaveClass('ippon-checkbox');
    expect(checkbox).toHaveAttribute('for', 'option');
    expect(checkbox).toHaveTextContent('Label');
    expect(getInput()).toHaveClass('ippon-checkbox--input');
    expect(getInput()).toHaveAttribute('type', 'checkbox');
    expect(getInput()).toHaveAttribute('id', 'option');
    expect(checkbox.querySelector('.ippon-checkbox--glyph')).toHaveClass('ippon-ion-checkmark');
  });

  it('should render error alternative', () => {
    render(<IpponCheckbox dataSelector="ippon-checkbox" id="option" variant="error" />);

    expect(getIpponCheckbox()).toHaveClass('-error');
    expect(getInput()).toHaveAttribute('aria-invalid', 'true');
  });

  it('should be checked and disabled', () => {
    render(<IpponCheckbox dataSelector="ippon-checkbox" id="option" checked readOnly disabled />);

    expect(getInput()).toBeChecked();
    expect(getInput()).toBeDisabled();
  });

  it('should merge additional className', () => {
    render(<IpponCheckbox dataSelector="ippon-checkbox" id="option" className="-custom" />);

    expect(getIpponCheckbox()).toHaveClass('-custom');
  });

  it('should call onChange', () => {
    const onChange = vi.fn();

    render(<IpponCheckbox dataSelector="ippon-checkbox" id="option" onChange={onChange} />);

    fireEvent.click(getInput());

    expect(onChange).toHaveBeenCalled();
  });
});
