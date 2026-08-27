import { describe, expect, it } from 'vitest';
import { renderMixin, select } from './markup';

const render = (options: string): Document =>
  renderMixin(`include /atom/checkbox/checkbox.mixin.pug\n+ippon-checkbox(${options}) Label`);

describe('Checkbox markup', () => {
  it('should call itself invalid on the error alternative, like the React checkbox does', () => {
    const document = render(`{ id: 'checkbox', variant: 'error' }`);

    expect(select(document, '.ippon-checkbox--input').getAttribute('aria-invalid')).toBe('true');
  });

  it('should call itself nothing at rest', () => {
    const document = render(`{ id: 'checkbox' }`);

    expect(select(document, '.ippon-checkbox--input').hasAttribute('aria-invalid')).toBe(false);
  });
});
