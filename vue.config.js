const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => ({
        ...options,
        compilerOptions: {
          // treat any tag that starts with swisspost- as custom elements
          isCustomElement: tag => tag.startsWith('swisspost-')
        }
      }))

    config.module
      .rule("source-map-loader")
      .test(/\.(js|js.map)$/)
      .enforce("pre")
      .use("source-map-loader")
      .loader("source-map-loader")
      .end()
}
})
