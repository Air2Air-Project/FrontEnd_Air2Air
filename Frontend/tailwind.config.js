/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        custom: ['MaruBuri', 'sans-serif'],
      },
    },
    height: {
      cth: '600px',
      cth2: '560px'
     }
  },
  plugins: [],
}

// module.exports = {
//   theme: {
//     extend: {
//       fontFamily: {
//         maru: ['MaruBuri', 'sans-serif'],
//         blueroad: ['Yeongdeok Blueroad', 'sans-serif'],
//         haeparang: ['Yeongdeok Haeparang', 'sans-serif'],
//       },
//     },
//   },
//   variants: {},
//   plugins: [],
// }
