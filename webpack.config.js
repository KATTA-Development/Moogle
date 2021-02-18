const path = require('path');

module.exports = {
  entry: "./client/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
    publicPath: "/build/",
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: ["@babel/transform-runtime"]
        }
      },
      {
        test: /.(css|scss)$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  devServer: {
    // contentBase: path.join(__dirname, "client/"),
    port: 8080,
    publicPath: "/build",
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
      },
      '/': 'http://localhost:3000',
      '/signup': 'http://localhost:3000',
      '/login': 'http://localhost:3000',
    },
    hot: true,
    historyApiFallback: true
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
}
