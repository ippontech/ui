import path from 'node:path';
import { JSDOM } from 'jsdom';
import pug from 'pug';

const basedir = path.join(__dirname, '..', '..', 'src');

const toDocument = (html: string): Document => new JSDOM(`<body>${html}</body>`).window.document;

export const renderMixin = (source: string): Document =>
  toDocument(pug.render(source, { basedir, filename: path.join(basedir, 'markup.pug') }));

export const renderComponent = (file: string): Document =>
  toDocument(pug.renderFile(path.join(basedir, file), { basedir }));

export const select = (document: Document, selector: string): Element => {
  const element = document.querySelector(selector);

  if (element === null) {
    throw new Error(`No element matching "${selector}"`);
  }

  return element;
};

export const classesOf = (element: Element): string[] => [...element.classList];
