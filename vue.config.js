const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {

        // '@mixins': resolve('src/mixins'),
      },
    },
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('./src'))

      .set('@components', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@assets', resolve('src/assets'))
      .set('@utils', resolve('src/utils'))

      .set('@router', resolve('src/router'))
      .set('@store', resolve('src/store'))
      .set('@styles', resolve('src/styles'))
  }
}
