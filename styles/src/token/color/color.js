import { makeTextTd } from '../token.js';

export const ipponTokenColor = (colorsList, color) => {
  const colors = [0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 999].flatMap((quantity) => {
    const prop = `${color}-${quantity}`;
    const value = window.getComputedStyle(document.body).getPropertyValue(prop);
    if (value === undefined || value === '') {
      return [];
    }
    return [{ prop, value }];
  });

  const addToColorsList = ({ prop, value }) => {
    const tr = document.createElement('tr');
    const tdName = makeTextTd({ text: prop });
    const tdValue = makeTextTd({ text: value.toString(), minimal: true });
    const tdPreview = makeTextTd({ minimal: true });
    const previewBox = document.createElement('div');
    previewBox.style.width = '40px';
    previewBox.style.height = '20px';
    previewBox.style.backgroundColor = value.toString();
    previewBox.style.border = '1px solid #0000001A';
    tdPreview.appendChild(previewBox);
    tr.appendChild(tdName);
    tr.appendChild(tdValue);
    tr.appendChild(tdPreview);
    colorsList.append(tr);
  };

  colors.forEach((color) => addToColorsList(color));
};
