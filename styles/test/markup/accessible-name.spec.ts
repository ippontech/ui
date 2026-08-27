import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { renderComponent } from './markup';

const basedir = path.join(__dirname, '..', '..', 'src');

const toComponentFiles = (directory: string): string[] =>
  fs
    .readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) =>
      entry.isDirectory()
        ? toComponentFiles(path.join(directory, entry.name))
        : entry.name.endsWith('.code.pug')
          ? [path.relative(basedir, path.join(directory, entry.name))]
          : [],
    );

const hasAccessibleName = (element: Element): boolean =>
  (element.textContent ?? '').trim().length > 0 ||
  element.hasAttribute('aria-label') ||
  element.hasAttribute('aria-labelledby') ||
  element.hasAttribute('title');

const toUnnamedControls = (file: string): string[] =>
  [...renderComponent(file).querySelectorAll('button, a[href], [role="button"]')]
    .filter((control) => !hasAccessibleName(control))
    .map((control) => control.outerHTML);

describe('Accessible names in the rendered examples', () => {
  it.each(toComponentFiles(basedir))('should name every control of %s', (file) => {
    expect(toUnnamedControls(file)).toStrictEqual([]);
  });
});
