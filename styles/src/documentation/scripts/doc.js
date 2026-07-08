const ipponDocScripts = () => {
  const titleSelectors = (content) =>
    [...content?.querySelectorAll('h1, h2, h3, h4, h5, h6')].filter((title) => title.id) || [];

  const initNav = () => {
    const content = document.querySelector('[data-navigable]');
    const titles = titleSelectors(content);

    if (titles.length === 0) {
      return;
    }

    const nav = document.createElement('div');
    nav.classList.add('ipp-doc-page--nav');
    const navList = document.createElement('ul');
    navList.classList.add('ipp-doc-nav', 'ippon-v-space', '-gap-8');

    titles.forEach((title) => {
      const level = title.tagName.slice(1);
      const item = document.createElement('a');
      item.setAttribute('href', `#${title.id}`);
      item.innerText = title.innerText;
      item.classList.add('ipp-doc-nav--link', 'ippon-text', '-body', '-color-neutral-secondary');
      item.classList.add(level === '1' ? '-bold' : '-small');
      const slot = document.createElement('li');
      slot.appendChild(item);
      slot.classList.add('ipp-doc-nav--item');
      slot.classList.add(`-level-${level}`);

      navList.appendChild(slot);
    });

    nav.appendChild(navList);

    content.prepend(nav);
  };

  const launchOnHash = (launch) => {
    const hash = location.hash;

    if (hash) {
      launch(hash.slice(1));
    }
  };

  const launchOnAnchor = (launch) => (hash) => {
    const element = document.getElementById(hash);

    if (element) {
      launch(element);
    }
  };

  const scrollToAnchor = () => launchOnHash(launchOnAnchor((anchor) => anchor.scrollIntoView()));

  const init = () => {
    initNav();
    scrollToAnchor();
  };

  init();
};

document.addEventListener('DOMContentLoaded', ipponDocScripts, false);

const copyCode = async (element) => {
  await navigator.clipboard.writeText(element.dataset['code']);
};
