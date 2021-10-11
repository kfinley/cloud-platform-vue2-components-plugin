const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-actions",
    "@storybook/addon-essentials",
    "@storybook/addon-links"
  ],
  core: {
    builder: 'webpack4',
  },
  webpackFinal: (config) => {
    // add SCSS support for CSS Modules
    config.module.rules.push({
      test: /\.s[a|c]ss$/,
        exclude: /node_modules/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              esModule: false,
            }
          },
          'sass-loader'
          // This is now handled in preview.js but left here for reference
          // {
          //   // https://github.com/storybookjs/storybook/issues/6743
          //   loader: 'sass-loader',
          //   options: {
          //     additionalData: `
          //       @import "@cloud-platform/vue2-components-plugin/src/styles/styles.scss";
          //     `
          //   }
          // },
        ]
    });

    config.resolve.plugins = config.resolve.plugins || [];
    config.resolve.plugins.push(new TsconfigPathsPlugin({}));

    return config;
  },
};
