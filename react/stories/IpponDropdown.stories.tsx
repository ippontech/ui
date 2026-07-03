import type { Meta, StoryObj } from '@storybook/react-vite';
import type { KeyboardEvent, ToggleEvent } from 'react';
import { IpponDropdown } from '../src/IpponDropdown.tsx';
import { IpponButton } from '../src/IpponButton.tsx';
import { IpponSeparator } from '../src/IpponSeparator.tsx';

const moveFocusOnArrowKey = (event: KeyboardEvent<HTMLElement>) => {
  if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') {
    return;
  }
  const buttons = [
    ...event.currentTarget.querySelectorAll<HTMLButtonElement>('button:not(:disabled)'),
  ];
  if (buttons.length === 0) {
    return;
  }
  const index = buttons.indexOf(document.activeElement as HTMLButtonElement);
  const delta = event.key === 'ArrowDown' ? 1 : -1;
  buttons[(index + delta + buttons.length) % buttons.length].focus();
  event.preventDefault();
};

const focusFirstButtonOnOpen = (event: ToggleEvent<HTMLElement>) => {
  if (event.newState !== 'open') {
    return;
  }
  event.currentTarget.querySelector<HTMLButtonElement>('button:not(:disabled)')?.focus();
};

const meta = {
  title: 'Organism/Dropdown',
  component: IpponDropdown,
  args: {
    id: 'dropdown',
  },
  argTypes: {
    children: { control: false },
    onKeyDown: { control: false },
    onToggle: { control: false },
  },
  render: (args) => (
    <>
      <IpponButton
        variant="outline"
        popoverTarget={args.id}
        popoverTargetAction="toggle"
        iconRight={{ name: 'chevron-down' }}
      >
        Dropdown
      </IpponButton>
      <IpponDropdown {...args}>
        <IpponButton variant="text" color="neutral" iconLeft={{ name: 'ellipse' }}>
          Item
        </IpponButton>
        <IpponSeparator />
        <IpponButton variant="text" color="error" iconLeft={{ name: 'trash' }}>
          Destructive item
        </IpponButton>
      </IpponDropdown>
    </>
  ),
} satisfies Meta<typeof IpponDropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const KeyboardNavigation: Story = {
  args: {
    id: 'dropdown-keyboard',
    onKeyDown: moveFocusOnArrowKey,
    onToggle: focusFirstButtonOnOpen,
  },
  parameters: {
    docs: {
      description: {
        story:
          'The dropdown ships no keyboard behavior: it only forwards `onKeyDown` and `onToggle` to the panel. To get a select-like flow — focus the first item when the popover opens, then move with the arrow keys (wrap-around, disabled buttons skipped) — wire your own handlers:',
      },
      source: {
        language: 'tsx',
        code: `const moveFocusOnArrowKey = (event: KeyboardEvent<HTMLElement>) => {
  if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') {
    return;
  }
  const buttons = [
    ...event.currentTarget.querySelectorAll<HTMLButtonElement>('button:not(:disabled)'),
  ];
  if (buttons.length === 0) {
    return;
  }
  const index = buttons.indexOf(document.activeElement as HTMLButtonElement);
  const delta = event.key === 'ArrowDown' ? 1 : -1;
  buttons[(index + delta + buttons.length) % buttons.length].focus();
  event.preventDefault();
};

const focusFirstButtonOnOpen = (event: ToggleEvent<HTMLElement>) => {
  if (event.newState !== 'open') {
    return;
  }
  event.currentTarget.querySelector<HTMLButtonElement>('button:not(:disabled)')?.focus();
};

<IpponDropdown id="dropdown" onKeyDown={moveFocusOnArrowKey} onToggle={focusFirstButtonOnOpen}>
  <IpponButton variant="text" color="neutral">
    Item
  </IpponButton>
</IpponDropdown>;`,
      },
    },
  },
};
