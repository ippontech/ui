import type { Preview } from '@storybook/react-vite';

import '@ippon-ui/styles/fonts/open-sans/400.css';
import '@ippon-ui/styles/fonts/open-sans/600.css';
import '@ippon-ui/styles/fonts/open-sans/700.css';
import '@ippon-ui/styles/fonts/saira-extra-condensed/700.css';
import '@ippon-ui/styles/icons/ionicons.css';
import '@ippon-ui/styles/tikui.css';

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
