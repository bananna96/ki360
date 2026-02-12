import localFont from 'next/font/local'

const outward = localFont({
  src: [
    {
    path: './fonts/outward-block.ttf',
    weight: '700',
    style: 'normal',
  }
]
})

// const satoshi = localFont({
//   src: [
//     {
//     path: './public/fonts/Satoshi-Regular.woff2',
//     weight: '400',
//     style: 'normal',
//   },
//   {
//     path: '../../fonts/Satoshi-Medium.woff2',
//     weight: '500',
//     style: 'normal',
//   },
//   {
//     path: '../../fonts/Satoshi-Bold.woff2',
//     weight: '700',
//     style: 'normal',
//   },
//   {
//     path: '../../fonts/Satoshi-Black.woff2',
//     weight: '900',
//     style: 'normal',
//   },
//   {
//     path: '../../fonts/Satoshi-Light.woff2',
//     weight: '300',
//     style: 'normal',
//   },
//   {
//     path: '../../fonts/Satoshi-Italic.woff2',
//     weight: '400',
//     style: 'italic',
//   }
//     ]
// })


export { outward }