import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen, configure, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { IpponInputSearch } from '../src';

configure({
  testIdAttribute: 'data-selector',
});

const getIpponInputSearch = () => screen.getByTestId('ippon-input-search');

const getInput = () => screen.getByTestId('ippon-input-search.input');

describe('IpponInputSearch', () => {
  afterEach(cleanup);

  it('should be like pattern library', () => {
    render(<IpponInputSearch dataSelector="ippon-input-search" placeholder="Placeholder" />);

    const inputSearch = getIpponInputSearch();

    expect(inputSearch).toHaveClass('ippon-input-search');
    expect(getInput()).toHaveClass('ippon-input-search--input');
    expect(getInput()).toHaveAttribute('type', 'text');
    expect(getInput()).toHaveAttribute('placeholder', 'Placeholder');
  });

  it('should render a magnifier by default', () => {
    render(<IpponInputSearch dataSelector="ippon-input-search" />);

    expect(getIpponInputSearch().querySelector('.ippon-input-search--icon')).toHaveClass(
      'ippon-ion-search',
    );
  });

  it('should render another icon', () => {
    render(<IpponInputSearch dataSelector="ippon-input-search" icon={{ name: 'person' }} />);

    expect(getIpponInputSearch().querySelector('.ippon-input-search--icon')).toHaveClass(
      'ippon-ion-person',
    );
  });

  it('should render error alternative', () => {
    render(<IpponInputSearch dataSelector="ippon-input-search" variant="error" />);

    expect(getIpponInputSearch()).toHaveClass('-error');
    expect(getInput()).toHaveAttribute('aria-invalid', 'true');
  });

  it('should render success alternative', () => {
    render(<IpponInputSearch dataSelector="ippon-input-search" variant="success" />);

    expect(getIpponInputSearch()).toHaveClass('-success');
    expect(getInput()).not.toHaveAttribute('aria-invalid');
  });

  it('should render no suffix by default', () => {
    render(<IpponInputSearch dataSelector="ippon-input-search" />);

    expect(getIpponInputSearch().querySelector('.ippon-input-search--suffix')).toBeNull();
  });

  it('should render a suffix', () => {
    render(<IpponInputSearch dataSelector="ippon-input-search" suffix={<span>Suffix</span>} />);

    expect(getIpponInputSearch().querySelector('.ippon-input-search--suffix')).toHaveTextContent(
      'Suffix',
    );
  });

  it('should merge additional className', () => {
    render(<IpponInputSearch dataSelector="ippon-input-search" className="-custom" />);

    expect(getIpponInputSearch()).toHaveClass('-custom');
  });

  it('should forward input props', () => {
    const onChange = vi.fn();

    render(
      <IpponInputSearch dataSelector="ippon-input-search" value="Value" onChange={onChange} />,
    );

    fireEvent.change(getInput(), { target: { value: 'Other' } });

    expect(onChange).toHaveBeenCalled();
  });
});
