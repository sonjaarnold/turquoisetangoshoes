const optimize = require('spike-optimize')

module.exports = {
  devtool: false,
  afterSpikePlugins: [...optimize({
    scopeHoisting: true,
    aggressiveSplitting: false,
    minify: true
  })]
}
