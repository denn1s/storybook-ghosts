import '../src/styles/global.css'

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'ravenmoor',
      values: [
        { name: 'ravenmoor', value: '#0e0c12' },
        { name: 'surface', value: '#1c1825' },
        { name: 'light', value: '#ebe6f1' },
      ],
    },
    a11y: {
      test: 'todo',
    },
  },
}

export default preview
