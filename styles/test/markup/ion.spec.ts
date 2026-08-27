import { describe, expect, it } from 'vitest';
import { classesOf, renderMixin, select } from './markup';

const render = (options: string): Document =>
  renderMixin(`include /atom/ion/ion.mixin.pug\n+ippon-ion(${options})`);

describe('Ion markup', () => {
  it('should draw a decorative icon as a presentational span', () => {
    const document = render(`{ name: 'close' }`);

    const ion = select(document, '.ippon-ion-close');

    expect(ion.tagName).toBe('SPAN');
    expect(ion.getAttribute('role')).toBe('presentation');
    expect(ion.hasAttribute('aria-label')).toBe(false);
  });

  it('should draw a clickable icon as a button named by its label', () => {
    const document = render(`{ name: 'close', clickable: true, label: 'Clear search' }`);

    const ion = select(document, '.ippon-ion-close');

    expect(ion.tagName).toBe('BUTTON');
    expect(ion.getAttribute('aria-label')).toBe('Clear search');
    expect(ion.hasAttribute('role')).toBe(false);
  });

  it('should suffix the class with the variant', () => {
    const document = render(`{ name: 'close', variant: 'outline' }`);

    expect(classesOf(select(document, 'span'))).toContain('ippon-ion-close-outline');
  });
});
