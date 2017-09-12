const path = require( 'path' );
const webpack = require( 'webpack' );
const Clean = require( 'clean-webpack-plugin' );
const ExtractText = require( 'extract-text-webpack-plugin' );

module.exports = {
  context: path.resolve( __dirname, './src' ),
  entry: path.resolve( __dirname, './src/index.js' ),
  output: {
    path: path.resolve( __dirname, './dist' ),
    filename: 'index.js',
    library: 'flex-react',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node-modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: ExtractText.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader'],
        }),
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new Clean(['dist'], { root: path.resolve( __dirname, './' )}),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      },
      compress: {
        unused: true,
        warnings: false,
        comparisons: true,
        conditionals: true,
        dead_code: true,
        if_return: true,
        join_vars: true,
        evaluate: true,
      },
    }),
    new webpack.LoaderOptionsPlugin({ minimize: true, debug: false }),
    new webpack.NamedModulesPlugin(),
    new ExtractText( 'style.css' ),
  ],
};
