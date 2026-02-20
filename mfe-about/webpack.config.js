const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'mfeAbout',
  exposes: {
    './Component': './src/app/about/about.ts',
  },
  shared: shareAll({ 
    singleton: true, 
    strictVersion: false, 
    requiredVersion: 'auto' 
  }),
});
