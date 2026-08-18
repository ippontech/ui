## Option list

Stacks _Option_ rows into a `listbox`, and carries both what goes under them and what the list shows when it has no rows to show. Like _Field_, it is a composition with no state of its own.

**Parts:**

- `--scroll` the scrolling area, holding the rows and the footer. It never grows past five rows, so a long list keeps the floating panel a readable size — the measure is derived from the row height token, not written as a pixel count
- `--options` the `listbox` itself, which disappears when it holds no rows
- `--footer` an optional block rendered after the rows, **inside** the scrolling area and outside the `listbox`: a "load more" button, a "20 of 137" counter, or the sentinel of an infinite scroll. Being inside the scroll is what makes a sentinel work — pinned under the list it would always be in view and would never stop asking for more
- `--message` the region shown beside the rows, **outside** the scrolling area, so it stays in place while the list scrolls. It says what the list has to say — nothing matched, loading, the search failed — where the footer is what the list has to _offer_

**Messages**, each of them a component the library already has:

- Empty: a _Text_ atom saying that nothing matched
- Failed: an _Error area_ molecule, which already carries a retry action. It reads its padding from a container query, so it needs an `ippon-container` ancestor to breathe

**Loading** is not a message and never a progress bar — nothing here knows how far along it is. It is drawn as `-placeholder` rows inside the `listbox`, with `aria-busy="true"` on the list, and where they go says which of the two kinds of loading this is:

- What **replaces** — a new search. The rows on screen are about to be thrown away, but replacing them with placeholders would make the panel flicker at every keystroke, so they stay and only `aria-busy` changes. Placeholders appear in this case once and once only: the very first load, when there is nothing to keep
- What **adds** — a "load more". The rows arrive after the ones already there, so the placeholders go there too, at the end of the list and inside the scroll, where they read as the continuation they are

> The message is rendered **beside** the rows, never in their place. A search still in flight therefore keeps the previous results on screen with the indicator under them, instead of emptying the panel at every keystroke and making it flicker.

**Accessibility:**

- `role="listbox"`, plus `aria-multiselectable="true"` when several options can be picked
- `aria-busy` while the options are loading
- The message region is a `role="status"` and stays in the document even while it is empty. A live region only announces what changes inside it after it is already there, so one mounted together with its text would be read by nobody: the empty, failed and loading messages are announced because the region was waiting for them
- Name the list through `aria-labelledby`, pointing at the same _Label_ atom that names the field
- Anything interactive placed in the footer is reachable with `Tab`, and takes focus when it is used. Hand focus back to the field afterwards if the arrow keys should keep working, and never make the footer the only way to reach an option. A control that removes itself once its work is done — a "load more" that hides on the last page — leaves focus nowhere; the _Combobox_ organism is built to survive that, but handing focus back is still the kinder move
