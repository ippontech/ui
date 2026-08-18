import { afterEach, describe, expect, it } from 'vitest';
import { render, screen, configure, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { IpponOption, IpponOptionList } from '../src';

configure({
  testIdAttribute: 'data-selector',
});

const getIpponOptionList = () => screen.getByTestId('ippon-option-list');

const getOptions = () => screen.getByTestId('ippon-option-list.options');

describe('IpponOptionList', () => {
  afterEach(cleanup);

  it('should be like pattern library', () => {
    render(
      <IpponOptionList dataSelector="ippon-option-list" id="picker-listbox">
        <IpponOption id="picker-option-1" label="Option" />
      </IpponOptionList>,
    );

    expect(getIpponOptionList()).toHaveClass('ippon-option-list');
    expect(getOptions()).toHaveClass('ippon-option-list--options');
    expect(getOptions()).toHaveAttribute('id', 'picker-listbox');
    expect(getOptions()).toHaveAttribute('role', 'listbox');
    expect(getOptions()).toHaveTextContent('Option');
  });

  it('should be multiselectable and busy', () => {
    render(<IpponOptionList dataSelector="ippon-option-list" id="picker-listbox" multiple busy />);

    expect(getOptions()).toHaveAttribute('aria-multiselectable', 'true');
    expect(getOptions()).toHaveAttribute('aria-busy', 'true');
  });

  it('should be neither multiselectable nor busy by default', () => {
    render(<IpponOptionList dataSelector="ippon-option-list" id="picker-listbox" />);

    expect(getOptions()).not.toHaveAttribute('aria-multiselectable');
    expect(getOptions()).not.toHaveAttribute('aria-busy');
  });

  it('should be named by another element', () => {
    render(
      <IpponOptionList
        dataSelector="ippon-option-list"
        id="picker-listbox"
        labelledBy="picker-label"
      />,
    );

    expect(getOptions()).toHaveAttribute('aria-labelledby', 'picker-label');
  });

  it('should keep the message region mounted and empty so a later message is announced', () => {
    render(<IpponOptionList dataSelector="ippon-option-list" id="picker-listbox" />);

    const message = screen.getByTestId('ippon-option-list.message');

    expect(message).toHaveAttribute('role', 'status');
    expect(message).toBeEmptyDOMElement();
  });

  it('should render a message announced to assistive technology', () => {
    render(
      <IpponOptionList
        dataSelector="ippon-option-list"
        id="picker-listbox"
        message="No option matches your search"
      />,
    );

    const message = screen.getByTestId('ippon-option-list.message');

    expect(message).toHaveTextContent('No option matches your search');
    expect(message).toHaveAttribute('role', 'status');
  });

  it('should render no footer by default', () => {
    render(<IpponOptionList dataSelector="ippon-option-list" id="picker-listbox" />);

    expect(screen.queryByTestId('ippon-option-list.footer')).toBeNull();
  });

  it('should render a footer inside the scrolling area and outside the listbox', () => {
    render(
      <IpponOptionList
        dataSelector="ippon-option-list"
        id="picker-listbox"
        footer={<button type="button">Load more</button>}
      />,
    );

    const footer = screen.getByTestId('ippon-option-list.footer');

    expect(footer).toHaveClass('ippon-option-list--footer');
    expect(footer.closest('.ippon-option-list--scroll')).not.toBeNull();
    expect(footer.closest('[role="listbox"]')).toBeNull();
  });

  it('should keep the message outside the scrolling area', () => {
    render(
      <IpponOptionList dataSelector="ippon-option-list" id="picker-listbox" message="Loading" />,
    );

    expect(
      screen.getByTestId('ippon-option-list.message').closest('.ippon-option-list--scroll'),
    ).toBeNull();
  });

  it('should merge additional className', () => {
    render(
      <IpponOptionList dataSelector="ippon-option-list" id="picker-listbox" className="-custom" />,
    );

    expect(getIpponOptionList()).toHaveClass('-custom');
  });

  it('should call itself busy on its own as soon as it draws a placeholder row', () => {
    render(
      <IpponOptionList dataSelector="ippon-option-list" id="picker-listbox" placeholderRows={2} />,
    );

    expect(getOptions()).toHaveAttribute('aria-busy', 'true');
  });

  it('should draw no placeholder row by default', () => {
    render(
      <IpponOptionList dataSelector="ippon-option-list" id="picker-listbox">
        <IpponOption id="picker-option-1" label="Option" />
      </IpponOptionList>,
    );

    expect(getOptions().querySelectorAll('.ippon-option.-placeholder')).toHaveLength(0);
  });

  it('should draw the placeholder rows after the options, so they read as what is still coming', () => {
    render(
      <IpponOptionList
        dataSelector="ippon-option-list"
        id="picker-listbox"
        busy
        placeholderRows={2}
      >
        <IpponOption id="picker-option-1" label="Option" />
      </IpponOptionList>,
    );

    const rows = [...getOptions().children];

    expect(getOptions()).toHaveAttribute('aria-busy', 'true');
    expect(rows).toHaveLength(3);
    expect(rows[0]).toHaveAttribute('role', 'option');
    expect(rows[1]).toHaveClass('ippon-option', '-placeholder');
    expect(rows[2]).toHaveClass('ippon-option', '-placeholder');
  });

  it('should let no placeholder row claim to be an option, nor say anything', () => {
    render(
      <IpponOptionList
        dataSelector="ippon-option-list"
        id="picker-listbox"
        busy
        placeholderRows={3}
      />,
    );

    const rows = [...getOptions().children];

    expect(rows).toHaveLength(3);
    expect(screen.queryAllByRole('option')).toHaveLength(0);
    rows.forEach((row) => {
      expect(row).toHaveAttribute('aria-hidden', 'true');
      expect(row).not.toHaveAttribute('role');
      expect(row).toHaveTextContent('');
    });
  });
});
