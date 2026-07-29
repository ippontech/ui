## Code

A block of preformatted code. It carries the frame and the monospace typography, so it stays readable on its own, and it scrolls rather than stretching its container when lines are long.

Giving a language adds the `language-*` class [Prism](https://prismjs.com) looks for. It sits on the `pre`, which is the element every Prism theme and plugin styles, and from which Prism resolves the language for the nested `code`.

**Loading Prism:**

Nothing highlights on its own: the atom only writes the class, and Prism is never bundled with the stylesheet. To get the colors below, load three things yourself, once per page:

```html
<link rel="stylesheet" href="prism-ippon.css" />
<script src="prism.js"></script>
<script src="prism-json.js"></script>
```

The theme is `@ippon-ui/styles/prism-ippon.css`, a regular Prism theme built on the Ippon UI tokens. The core `prism.js` highlights every block it finds once the page is parsed, and each language needs its own grammar file, so add one script per language you use. Without the theme the code stays black on white; without the core and the grammar it stays black on white too, and the block still reads correctly.

**Typography with the theme:**

A Prism theme styles `pre[class*='language-']`, which is more specific than the atom, so on a block that declares a language the theme wins on the typography: the font size follows the surrounding text instead of the `code` token, the line height comes from the theme, and the block takes a vertical margin. The frame itself is unchanged, since the theme draws its border, radius, background and padding from the same tokens as the atom.
