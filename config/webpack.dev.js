const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  entry: {
    main: './src/main.js',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[chunkhash:8].build.js'
  },
  mode: "development",
  devtool: 'source-map',
  resolve: {
    // 快捷目录别名
    alias: {
      "@": path.resolve('./src')
    },
    // 配置文件扩展名，引入的时候可以不需要加后缀名了
    extensions: [ '*', '.js', '.ts', '.vue', '.json']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test:/\.js$/, //已作为js扩展名这样类型的文件
        exclude:/node_modules/, //排除node_modules文件夹
        use:{
          loader:'babel-loader', //转换成es5
          options:{
            presets:['@babel/preset-env'], //设置编译的规则
          }
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html'
    })
  ]
};