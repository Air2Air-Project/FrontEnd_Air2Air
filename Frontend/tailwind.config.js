// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./src/**/*.{js,jsx,ts,tsx}"],
//   theme: {
//     extend: {
//       fontFamily: {
//         custom: ['MaruBuri', 'sans-serif'],
//       },
//     },
//   },
//   plugins: [],
// }
//애니메이션 추가 버전
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        custom: ['MaruBuri', 'sans-serif'],
      },
      keyframes: {
        'scale-up': {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        'scale-up': 'scale-up 0.6s ease-out forwards',  //지속시간 수정
      },
    },
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
