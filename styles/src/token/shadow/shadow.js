import { makeContentTd, makeTextTd, makeTh, makeLine, propToValue } from '../token.js';
export const ipponTokenShadow = (shadowList, shadow) => {
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
  const appendValueToShadowList = (key, value) => {
    const line = makeKeyValueLine(key, value);
    if (line) {
      shadowList.append(line);
    }
  };
  const appendContentToShadowList = (key, content) => {
    const line = makeKeyContentLine(key, content);
    if (line) {
      shadowList.append(line);
    }
  };
  appendValueToShadowList('Name', shadow);
  appendValueToShadowList('Value', propToValue(shadow));
  const previewBox = document.createElement('div');
  previewBox.style.width = '100px';
  previewBox.style.height = '50px';
  previewBox.style.boxShadow = `var(${shadow})`;
  previewBox.style.backgroundColor = '#fff';
  appendContentToShadowList('Preview', previewBox);
};
