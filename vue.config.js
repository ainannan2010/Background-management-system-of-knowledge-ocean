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
        '@': resolve('src'),
        '@api': resolve('src/api'),
        '@assets': resolve('src/assets'),
        '@comp': resolve('src/components'),
        '@router': resolve('src/router'),
        '@store': resolve('src/store'),
        '@styles': resolve('src/styles'),
        '@views': resolve('src/views'),
        // '@utils': resolve('src/utils'),
        // '@mixins': resolve('src/mixins'),
      },
    },
  },
}
