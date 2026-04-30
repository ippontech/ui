import { makeContentTd, makeTextTd, makeTh, makeLine, propToValue } from '../token.js';

export const ipponTokenRadius = (radiusList, radius) => {
  const makeKeyContentLine = (key, content) => {
    if (content === undefined || content === null) {
      return;
    }
    const line = makeLine();
    const thKey = makeTh(key);
    const tdValue = makeContentTd({ content });
    line.append(thKey);
    line.append(tdValue);

    return line;
  };

  const makeKeyValueLine = (key, value) => {
    if (value === undefined || value === '') {
      return;
    }
    const line = makeLine();
    const thKey = makeTh(key);
    const tdValue = makeTextTd({ text: value });
    line.append(thKey);
    line.append(tdValue);

    return line;
  };

  const appendValueToRadiusList = (key, value) => {
    const line = makeKeyValueLine(key, value);
    if (line) {
      radiusList.append(line);
    }
  };

  const appendContentToRadiusList = (key, content) => {
    const line = makeKeyContentLine(key, content);
    if (line) {
      radiusList.append(line);
    }
  };

  appendValueToRadiusList('Name', radius);
  appendValueToRadiusList('Size', propToValue(radius));
  const previewBox = document.createElement('div');
  previewBox.style.width = '100px';
  previewBox.style.height = '50px';
  previewBox.style.borderRadius = `var(${radius})`;
  previewBox.style.backgroundColor = '#000';
  previewBox.style.boxShadow = '0 0 3px #fff';

  appendContentToRadiusList('Preview', previewBox);
};
