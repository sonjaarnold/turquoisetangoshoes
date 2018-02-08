const Records = require('spike-records')
const Contentful = require('spike-contentful')
const htmlStandards = require('reshape-standard')
const cssStandards = require('spike-css-standards')
const jsStandards = require('spike-js-standards')
const pageId = require('spike-page-id')
const sugarml = require('sugarml')
const sugarss = require('sugarss')
const tailwindcss = require('tailwindcss')
const env = process.env.SPIKE_ENV
const locals = {}
const available = {
  womenSizes: new Set(),
  womenColors: new Set(),
  womenHeels: new Set(),
  menSizes: new Set(),
  menColors: new Set()
}

module.exports = {
  devtool: 'source-map',
  matchers: { html: '*(**/)*.sgr', css: '*(**/)*.sss' },
  ignore: ['**/_layouts/*.sgr', '**/_includes/*.sgr', '**/_*', '**/.*', 'readme.md', 'yarn.lock', 'package-lock.json', 'data.json'],
  vendor: ['assets/js/vendor/**', 'assets/js/filter-shoes.js'],
  reshape: htmlStandards({
    parser: sugarml,
    locals: (ctx) => Object.assign(locals, {
      pageId: pageId(ctx),
      year: new Date().getFullYear(),
      womenSizes: [...available.womenSizes].sort((a, b) => parseFloat(a) - parseFloat(b)),
      womenColors: [...available.womenColors].sort((a, b) => a < b ? -1 : 1),
      womenHeels: [...available.womenHeels].sort((a, b) => parseFloat(a) - parseFloat(b)),
      menSizes: [...available.menSizes].sort((a, b) => parseFloat(a) - parseFloat(b)),
      menColors: [...available.menColors].sort((a, b) => a < b ? -1 : 1)
    }),
    root: process.cwd() + '/views',
    minify: {
      collapseWhitespace: env === 'production',
      conservativeCollapse: false,
      aggressiveCollapse: false,
      removeComments: env === 'production',
      minifyCss: env === 'production',
      minifyJs: env === 'production',
      minifyJson: env === 'production',
      minifySvg: false
    }
  }),
  postcss: cssStandards({
    parser: sugarss,
    minify: env === 'production',
    warnForDuplicates: env !== 'production',
    appendPlugins: [tailwindcss('./tailwind.js')]
  }),
  babel: jsStandards(),
  plugins: [
    new Records({
      addDataTo: locals,
      data: { file: './data.json' }
    }),
    new Contentful({
      addDataTo: locals,
      accessToken: '5c489c67e492912bebe4c4e3446e4c913261d8059812db54644841663efb374f',
      spaceId: 'ej50854ab45b',
      contentTypes: [
        {
          name: 'women',
          id: 'women',
          filters: {
            order: '-sys.createdAt'
          },
          transform: shoe => {
            shoe.fields.size = shoe.fields.size.map(el => el * 10);
            shoe.fields.size.forEach(el => available.womenSizes.add(el));
            shoe.fields.color.forEach(el => available.womenColors.add(el));
            shoe.fields.heel = shoe.fields.heel.map(el => el * 10);
            shoe.fields.heel.forEach(el => available.womenHeels.add(el));
            return shoe;
          }
        },
        {
          name: 'men',
          id: 'men',
          filters: {
            order: '-sys.createdAt'
          },
          transform: shoe => {
            shoe.fields.size = shoe.fields.size.map(el => el * 10);
            shoe.fields.size.forEach(el => available.menSizes.add(el));
            shoe.fields.color.forEach(el => available.menColors.add(el));
            return shoe;
          }
        },
        {
          name: 'featured',
          id: 'featured',
          filters: {
            order: '-sys.createdAt'
          }
        }
      ]
    })
  ]
}
