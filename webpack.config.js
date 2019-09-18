const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: './src/gc-app.js',
  },
  plugins: [
    new HtmlWebpackPlugin({  
      filename: 'index.html',
      template: 'index.html',
      hash: true
    }),
  ],
}