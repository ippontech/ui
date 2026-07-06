import type { Meta, StoryObj } from '@storybook/react-vite';
import { IpponField } from '../src/IpponField.tsx';
import { IpponHelperText } from '../src/IpponHelperText.tsx';
import { IpponInputText } from '../src/IpponInputText.tsx';
import { IpponLabel } from '../src/IpponLabel.tsx';

type IpponFieldStoryArgs = {
  variant?: 'error' | 'success';
  disabled?: boolean;
  helper?: string;
};

const meta = {
  title: 'Molecule/Field',
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: [undefined, 'error', 'success'],
    },
    disabled: { control: 'boolean' },
  },
  args: {
    helper: 'Helper text',
  },
  render: (args) => (
    <IpponField>
      <IpponLabel htmlFor="field-input">Label</IpponLabel>
      <IpponInputText
        id="field-input"
        variant={args.variant}
        disabled={args.disabled}
        placeholder="Placeholder"
        aria-describedby="field-input-helper"
      />
      <IpponHelperText id="field-input-helper" variant={args.variant}>
        {args.helper}
      </IpponHelperText>
    </IpponField>
  ),
} satisfies Meta<IpponFieldStoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Error: Story = {
  args: { variant: 'error', helper: 'Error message' },
};

export const Success: Story = {
  args: { variant: 'success' },
};

export const Disabled: Story = {
  args: { disabled: true },
};
