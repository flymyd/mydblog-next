/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      height: {
        // layout: 'calc(100vh - 44px)',
        layout: [
          '-webkit-fill-available',
          {
            '@supports (-webkit-touch-callout: none)': {
              height: '-webkit-fill-available',
            },
          },
          'calc(100vh - 44px)',
        ],
      },
      minHeight: {
        layout: [
          '-webkit-fill-available',
          {
            '@supports (-webkit-touch-callout: none)': {
              height: '-webkit-fill-available',
            },
          },
          'calc(100vh - 44px)',
        ]
      },
    },
  },
  plugins: [],
}
