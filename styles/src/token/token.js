export const makeTd = ({ minimal } = {}) => {
  const td = document.createElement('td');
  td.classList.add('ippon-table--cell');
  if (minimal) {
    td.classList.add('-minimal');
  }
  return td;
};

export const makeContentTd = ({ content, minimal } = {}) => {
  const td = makeTd({ minimal });
  if (content) {
    td.append(content);
  }
  return td;
};

export const makeTextTd = ({ text, minimal } = {}) => {
  const td = makeTd({ minimal });
  if (text) {
    td.textContent = text;
  }
  return td;
};

export const makeTh = (content) => {
  const th = document.createElement('th');
  if (content) {
    th.textContent = content;
  }
  th.classList.add('ippon-table--header');
  th.classList.add('-minimal');
  return th;
};

export const makeLine = () => {
  const tr = document.createElement('tr');
  tr.classList.add('ippon-table--row');
  return tr;
};

export const propToValue = (prop) => window.getComputedStyle(document.body).getPropertyValue(prop);
