import type { Meta, StoryObj } from '@storybook/react-vite';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import '@ippon-ui/styles/prism-ippon.css';
import type { PropsWithChildren } from 'react';
import { useEffect, useRef } from 'react';
import { IpponCode } from '../src/IpponCode.tsx';

const jsonContent = `{
  "status": 404,
  "error": "Not Found"
}`;

const Highlighted = (props: PropsWithChildren) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      Prism.highlightAllUnder(ref.current);
    }
  });

  return <div ref={ref}>{props.children}</div>;
};

const meta = {
  title: 'Atom/Code',
  component: IpponCode,
  args: {
    children: 'npm install --save-dev @ippon-ui/styles',
  },
  argTypes: {
    language: { control: 'text' },
    className: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component: `The component writes the \`language-*\` class and nothing else: it runs no highlighter, and Prism is never bundled with it. Nothing is colorized until the application loads three things itself, once:

\`\`\`ts
import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import '@ippon-ui/styles/prism-ippon.css';
\`\`\`

The theme is a regular Prism theme built on the Ippon UI tokens, the core runs the highlighter, and each language needs its own grammar, so add one import per language used. The **With Language** story shows where to run the highlighter on a rendered block.

A Prism theme styles \`pre[class*='language-']\`, which is more specific than the atom, so on a block that declares a language the theme wins on the typography: the font size follows the surrounding text instead of the \`code\` token, the line height comes from the theme, and the block takes a vertical margin. The frame is unchanged, since the theme draws its border, radius, background and padding from the same tokens.`,
      },
    },
  },
} satisfies Meta<typeof IpponCode>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLanguage: Story = {
  args: {
    children: jsonContent,
    language: 'json',
  },
  decorators: [
    (Story) => (
      <Highlighted>
        <Story />
      </Highlighted>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'A language only adds the `language-*` class Prism looks for: the component runs no highlighter itself. The colors below come from the story, which wraps the block the way an application would:',
      },
      source: {
        language: 'tsx',
        code: `import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import '@ippon-ui/styles/prism-ippon.css';

const Payload = ({ payload }: { payload: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      Prism.highlightAllUnder(ref.current);
    }
  }, [payload]);

  return (
    <div ref={ref}>
      <IpponCode language="json">{payload}</IpponCode>
    </div>
  );
};`,
      },
    },
  },
};
