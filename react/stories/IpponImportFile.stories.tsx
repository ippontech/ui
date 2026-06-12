import type { Meta, StoryObj } from '@storybook/react-vite';
import { IpponImportFile } from '../src/IpponImportFile.tsx';

const meta = {
  title: 'Molecule/ImportFile',
  component: IpponImportFile,
  args: {
    title: 'Drop a file here',
    description: 'or click to browse',
  },
  argTypes: {
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof IpponImportFile>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithAccept: Story = {
  args: {
    accept: 'image/*',
    description: 'PNG or JPG only',
  },
};

export const Multiple: Story = {
  args: {
    multiple: true,
    title: 'Drop files here',
    description: 'or click to browse multiple files',
  },
};
