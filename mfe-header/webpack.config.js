const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'mfeHeader',
  exposes: {
    './Component': './src/app/header/header.ts',
  },
  shared: shareAll({ 
    singleton: true, 
    strictVersion: false, 
    requiredVersion: 'auto' 
  }),
});
