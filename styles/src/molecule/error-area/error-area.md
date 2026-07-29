## Error area

Fills a zone whose content could not be loaded, in place of what should have been rendered there. It carries no frame of its own, so it sits inside the container that already draws one, such as a card or a grid cell.

Its padding breathes once the surrounding `container` organism is wide enough, so a block dropped in a narrow column keeps its detail readable rather than crushed between margins. The measure comes from a container query, so it needs an `ippon-container` ancestor to answer: without one the block keeps its narrow padding whatever the viewport does.

**Action:**

An action is optional. When one is given it is rendered under the description, which is where a retry button belongs.

**Detail:**

A detail is optional too. When one is given, a `details` element exposes it behind a summary the reader has to open, so a stack trace or an error payload stays available without taking over the block. The detail is rendered by the `code` atom, so giving a language lets [Prism](https://prismjs.com) colorize it once Prism is loaded on the page, as the `code` atom explains. A stack trace has no language and needs none.
