const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'mfeFooter',
  exposes: {
    './Component': './src/app/footer/footer.ts',
  },
  shared: shareAll({ 
    singleton: true, 
    strictVersion: true, 
    requiredVersion: 'auto' 
  }),
});
