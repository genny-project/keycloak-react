const path = require( 'path' );
const webpack = require( 'webpack' );
const HTML = require( 'html-webpack-plugin') ;
const Clean = require( 'clean-webpack-plugin' );
const ExtractText = require( 'extract-text-webpack-plugin' );

module.exports = {
  context: path.resolve( __dirname, './src' ),
  entry: path.resolve( __dirname, './dev/App.jsx' ),
  output: {
    path: path.resolve( __dirname, './dev-build' ),
    filename: 'bundle.[hash].js',
    library: 'flex-react',
    libraryTarget: 'umd',
  },
  devtool: 'eval',
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
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    contentBase: path.resolve( __dirname, './dev-build' ),
    port: process.env.PORT || 7000,
    historyApiFallback: true,
  },
  plugins: [
    new Clean(['dev-build'], { root: path.resolve( __dirname, './' )}),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HTML({ template: path.resolve( __dirname, './dev/index.html' ) }),
    new ExtractText( '[name].css' ),
  ],
};
