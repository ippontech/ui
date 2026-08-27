import { describe, expect, it } from 'vitest';
import { classesOf, renderComponent, renderMixin, select } from './markup';

describe('Combobox markup', () => {
  it('should ionize its panel as an option list, not as a panel of actions', () => {
    const document = renderMixin(
      `include /organism/combobox/combobox.mixin.pug\n+ippon-combobox--list({ id: 'picker-list' })`,
    );

    const classes = classesOf(select(document, '.ippon-combobox--list'));

    expect(classes).toContain('ippon-dropdown---options');
    expect(classes).not.toContain('ippon-dropdown---buttons');
  });

  it('should name the clear cross of the counter', () => {
    const document = renderMixin(
      `include /organism/combobox/combobox.mixin.pug\n+ippon-combobox--control({ id: 'picker', count: 2, clearLabel: 'Clear selection' })`,
    );

    expect(select(document, '.ippon-badge button').getAttribute('aria-label')).toBe(
      'Clear selection',
    );
  });

  it('should announce the selection it states in words', () => {
    const document = renderMixin(
      `include /organism/combobox/combobox.mixin.pug\n+ippon-combobox--selection({ id: 'picker-selection' }) 2 options selected`,
    );

    expect(select(document, '.ippon-combobox--selection').getAttribute('role')).toBe('status');
  });

  it('should point the field at the listbox and name that listbox with the field label', () => {
    const document = renderComponent('organism/combobox/combobox.code.pug');

    const field = select(document, '#combobox-closed');
    const listbox = select(document, '#combobox-closed-listbox');

    expect(field.getAttribute('aria-controls')).toBe('combobox-closed-listbox');
    expect(listbox.getAttribute('role')).toBe('listbox');
    expect(listbox.getAttribute('aria-labelledby')).toBe('combobox-closed-label');
    expect(select(document, '#combobox-closed-label').getAttribute('for')).toBe('combobox-closed');
  });
});
