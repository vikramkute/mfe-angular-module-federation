const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'mfeContact',
  exposes: {
    './Component': './src/app/contact/contact.ts',
  },
  shared: shareAll({ 
    singleton: true, 
    strictVersion: false, 
    requiredVersion: 'auto' 
  }),
});
