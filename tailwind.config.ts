import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    {
      pattern: /(bg|text|border)-purple-(50|100|200|300|400|500|600|700|800|900)/,
    },
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          50:  '#f8f7fa',
          100: '#e7e5ec',
          200: '#d3d1dd',
          300: '#b3adc6',
          400: '#978fb2',
          500: '#7d76a0',
          600: '#655f8a',
          700: '#514c6f',
          800: '#3f3b58',
          900: '#2d2a40',
        },
      },
    },
  },
  plugins: [],
}

export default config
