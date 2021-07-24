module.exports = {
  entry: './src/index.js',
  output: {
    publicPath: 'xuni',
    filename: 'bundle.js'
  },
  devServer: {
    // 端口号
    port: 8080,
    // 静态资源文件夹
    contentBase: 'public'
  }
}