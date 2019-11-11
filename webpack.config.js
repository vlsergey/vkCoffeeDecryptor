const env = process.env.NODE_ENV;
const path = require( 'path' );

const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const OptimizeCSSAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' );
const TerserJSPlugin = require( 'terser-webpack-plugin' );

module.exports = {
  mode: env || 'development',
  // devtool: 'cheap-eval-source-map',

  entry: './src/index.js',

  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: 'url-loader',
      },
      {
        test: /\.css$/,
        exclude: /src/,
        include: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { hmr: false, },
          },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
        ],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        include: /src/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          { loader: 'css-loader', options: { modules: true, importLoaders: 1, localIdentName: '[name]__[local]___[hash:base64:5]' } },
          { loader: 'postcss-loader' },
        ],
      },
      {
        test: /\.js$/,
        include: /src/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
      {
        // check source files, not modified by other loaders
        enforce: 'pre',
        test: /\.js$/,
        include: /src/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          // cache: true,
          fix: true,
        },
      },
    ],
  },

  resolve: {
    modules: [
      path.resolve( __dirname, 'src' ),
      'node_modules',
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin( {
      filename: '[name].[chunkhash:8].css',
    } ),
    new HtmlWebpackPlugin( {
      filename: 'index.html',
      template: 'src/index.html',
    } ),
  ],

  optimization: {
    minimizer: [
      new TerserJSPlugin( {} ),
      new OptimizeCSSAssetsPlugin( {} ),
    ],
  },

  output: {
    path: path.resolve( __dirname, 'dist' ),
    filename: '[name].[chunkhash:8].js',
  },

};
