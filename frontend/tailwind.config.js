/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        boxdark: 'rgb(36 48 63)',
        meta2: 'rgb(239 242 247)',
        meta3: '#10B981',
        meta4: 'rgb(49 61 74)',
        meta5: 'rgb(230 37 42)',
        meta6: '#259AE6',
        fillprimary: '#3C50E0',
        fillwhite: '#FFFFFF',
        report: 'rgb(241 245 249)',
        reportdark: 'rgb(26 34 44)',
        txtreport: 'rgb(100 116 139)',
        txtreportdark: 'rgb(174 183 192)',
      }
    },
  },
  plugins: [],
}

