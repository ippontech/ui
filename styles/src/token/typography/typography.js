import { makeTh, makeTextTd, makeLine } from '../token.js';

export const ipponTokenTypography = (typographyList, typography) => {
  const makeLineForProp = (name, prop) => {
    const value = window.getComputedStyle(document.body).getPropertyValue(prop);
    if (value === undefined || value === '') {
      return;
    }
    const line = makeLine();
    const tdName = makeTh(name);
    const tdValue = makeTextTd({ text: value });
    const tdProp = makeTextTd({ text: prop });
    line.append(tdName);
    line.append(tdValue);
    line.append(tdProp);
    return line;
  };

  const appendToTypographyList = (name, prop) => {
    const line = makeLineForProp(name, prop);
    if (line) {
      typographyList.append(line);
    }
  };

  appendToTypographyList('Font', `${typography}-font`);
  appendToTypographyList('Transform', `${typography}-transform`);
  appendToTypographyList('Weight', `${typography}-weight`);
  appendToTypographyList('Weight bold', `${typography}-weight-bold`);
  appendToTypographyList('Size', `${typography}-size`);
  appendToTypographyList('Line height', `${typography}-line-height`);
};
