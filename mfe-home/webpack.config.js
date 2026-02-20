const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'mfeHome',
  exposes: {
    './Component': './src/app/home/home.ts',
    './routes': './src/app/app.routes.ts',
  },
  shared: shareAll({ 
    singleton: true, 
    strictVersion: false, 
    requiredVersion: 'auto' 
  }),
});
