import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen, configure, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { IpponOption } from '../src';

configure({
  testIdAttribute: 'data-selector',
});

const getIpponOption = () => screen.getByTestId('ippon-option');

describe('IpponOption', () => {
  afterEach(cleanup);

  it('should be like pattern library', () => {
    render(<IpponOption dataSelector="ippon-option" id="picker-option-1" label="Option" />);

    const option = getIpponOption();

    expect(option).toHaveClass('ippon-option');
    expect(option).toHaveAttribute('id', 'picker-option-1');
    expect(option).toHaveAttribute('role', 'option');
    expect(option).toHaveAttribute('aria-selected', 'false');
    expect(option.querySelector('.ippon-option--label')).toHaveTextContent('Option');
    expect(option.querySelector('.ippon-option--glyph')).toHaveClass('ippon-ion-checkmark');
  });

  it('should render a description', () => {
    render(
      <IpponOption
        dataSelector="ippon-option"
        id="picker-option-1"
        label="Option"
        description="Secondary text"
      />,
    );

    expect(getIpponOption().querySelector('.ippon-option--description')).toHaveTextContent(
      'Secondary text',
    );
  });

  it('should render no description by default', () => {
    render(<IpponOption dataSelector="ippon-option" id="picker-option-1" label="Option" />);

    expect(getIpponOption().querySelector('.ippon-option--description')).toBeNull();
  });

  it('should render children as a suffix', () => {
    render(
      <IpponOption dataSelector="ippon-option" id="picker-option-1" label="Option">
        Suffix
      </IpponOption>,
    );

    expect(getIpponOption().querySelector('.ippon-option--suffix')).toHaveTextContent('Suffix');
  });

  it('should render alternatives', () => {
    render(
      <IpponOption
        dataSelector="ippon-option"
        id="picker-option-1"
        label="Option"
        selected
        active
        disabled
        single
      />,
    );

    const option = getIpponOption();

    expect(option).toHaveClass('-selected', '-active', '-disabled', '-single');
    expect(option).toHaveAttribute('aria-selected', 'true');
    expect(option).toHaveAttribute('aria-disabled', 'true');
  });

  it('should merge additional className', () => {
    render(
      <IpponOption
        dataSelector="ippon-option"
        id="picker-option-1"
        label="Option"
        className="-custom"
      />,
    );

    expect(getIpponOption()).toHaveClass('-custom');
  });

  it('should call pointer handlers', () => {
    const onClick = vi.fn();
    const onPointerEnter = vi.fn();

    render(
      <IpponOption
        dataSelector="ippon-option"
        id="picker-option-1"
        label="Option"
        onClick={onClick}
        onPointerEnter={onPointerEnter}
      />,
    );

    fireEvent.click(getIpponOption());
    fireEvent.pointerEnter(getIpponOption());

    expect(onClick).toHaveBeenCalled();
    expect(onPointerEnter).toHaveBeenCalled();
  });
});
