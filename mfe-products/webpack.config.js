const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'mfeProducts',
  exposes: {
    './Component': './src/app/products/products.ts',
    './routes': './src/app/app.routes.ts',
  },
  shared: shareAll({ 
    singleton: true, 
    strictVersion: false, 
    requiredVersion: 'auto' 
  }),
});
