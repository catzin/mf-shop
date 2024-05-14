const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, 'tsconfig.json'),
  [/* mapped paths to share */]);

module.exports = {
  output: {
    uniqueName: "mfShop",
    publicPath: "http://localhost:4021/"
  },
  optimization: {
    runtimeChunk: false
  },   
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    }
  },
  experiments: {
    outputModule: true
  },
  plugins: [
    new ModuleFederationPlugin({
        library: { type: "module" },

        // For remotes (please adjust)
        name: "mfShop",
        filename: "remoteEntry.js",
        exposes: {
            './ProductsModule': './src/app/modules/products/products.module.ts',
        },        
        
        // For hosts (please adjust)
        // remotes: {
        //     "mfe1": "http://localhost:3000/remoteEntry.js",

        // },

        shared: share({
          "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
          "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
          "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
          "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@angular/material": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@angular/material/form-field": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@angular/material/icon": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@angular/material/input": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@angular/material/sidenav": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@angular/material/button": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@angular/material/list": { singleton: true, strictVersion: true, requiredVersion: 'auto' },

          "@angular/material/toolbar": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@angular/material/MatCardModule": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@angular/material/MatProgressSpinnerModule": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@ngxs/store": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          ...sharedMappings.getDescriptors()
        })
        
    }),
    sharedMappings.getPlugin()
  ],
};
