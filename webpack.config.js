// eslint-disable-next-line no-unused-vars
const webpack = require('webpack');
const path = require('path');
const Copy = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const fs = require('fs');

module.exports = (env, argv) => {
  const pages = (argv.mode === 'development') ? './src/pages/dev' : './src/pages';

  const pageNames = fs.readdirSync(pages)
    .filter((value) => value.includes('.html'))
    .map((value) => value.replace('.html', ''));

  const entryPoints = pageNames.reduce((acc, value) => ({ ...acc, ...{ [value]: path.resolve(__dirname, pages, `${value}.ts`) } }), {});

  const copyPaths = pageNames.map((name) => ({
    from: path.resolve(__dirname, `${pages}/${name}.html`),
    to: path.resolve(__dirname, `dist/${name}`),
  }));

  return {
    entry: entryPoints,
    output: {
      filename: '[name]/[name].js',
      path: path.join(__dirname, 'dist'),
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: ({ chunk }) => `${chunk.name}/${chunk.name}.css`,
      }),
      new Copy(copyPaths),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
      }),
    ],
    module: {
      rules: [
        {
          test: require.resolve('jquery'),
          loader: 'expose-loader',
          options: {
            exposes: ['$', 'jQuery'],
          },
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.ts?$/,
          exclude: /node_modules/,
          use: {
            loader: 'ts-loader',
          },
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'bemdecl-to-fs-loader',
              options: { levels: ['src/blocks/common'], extensions: ['css', 'js', 'ts'] }, // Add css and js files of BEM entities to bundle
            },
            {
              loader: 'html2bemdecl-loader',
            }, // First, convert HTML to bem DECL format
          ],
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            'css-loader',
          ],
        },
        {
          test: /\.(gif|png|jpg|jpeg|svg|webp)?$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: '../dist/img/',
            esModule: false,
            publicPath: '../img/',
          },
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: '../dist/fonts/',
            esModule: false,
            publicPath: '../fonts/',
          },
        },
      ],
    },
  };
};
