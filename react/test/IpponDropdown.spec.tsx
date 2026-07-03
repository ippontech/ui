import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen, configure, cleanup, fireEvent, createEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { IpponDropdown } from '../src';

configure({
  testIdAttribute: 'data-selector',
});

const getIpponDropdown = () => screen.getByTestId('ippon-dropdown');

describe('IpponDropdown', () => {
  afterEach(cleanup);

  it('should be like pattern library', () => {
    render(
      <IpponDropdown id="menu" dataSelector="ippon-dropdown">
        Content
      </IpponDropdown>,
    );

    const dropdown = getIpponDropdown();

    expect(dropdown).toHaveClass('ippon-dropdown', 'ippon-dropdown---buttons');
    expect(dropdown).toHaveAttribute('id', 'menu');
    expect(dropdown).toHaveAttribute('popover', 'auto');
    expect(dropdown).toHaveTextContent('Content');
  });

  it('should merge additional className', () => {
    render(<IpponDropdown id="menu" className="-custom" dataSelector="ippon-dropdown" />);

    expect(getIpponDropdown()).toHaveClass('-custom');
  });

  it('should call onKeyDown', () => {
    const onKeyDown = vi.fn();

    render(<IpponDropdown id="menu" onKeyDown={onKeyDown} dataSelector="ippon-dropdown" />);

    fireEvent.keyDown(getIpponDropdown(), { key: 'ArrowDown' });

    expect(onKeyDown).toHaveBeenCalled();
  });

  it('should call onToggle', () => {
    const onToggle = vi.fn();

    render(<IpponDropdown id="menu" onToggle={onToggle} dataSelector="ippon-dropdown" />);

    const dropdown = getIpponDropdown();
    fireEvent(dropdown, Object.assign(createEvent('toggle', dropdown), { newState: 'open' }));

    expect(onToggle).toHaveBeenCalled();
  });
});
