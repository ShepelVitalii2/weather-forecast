const path = require('path');
const webpack = require('webpack');
const Handlebars = require('handlebars');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const HandlebarsPlugin = require('handlebars-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'webpack.bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack Boilerplate',
      template: path.resolve(__dirname, './src/template.html'), // шаблон
      filename: 'index.html', // название выходного файла
    }),
    new CleanWebpackPlugin(),
    // применять изменения только при горячей перезагрузке
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin(),
    new HandlebarsPlugin({
      // path to hbs entry file(s). Also supports nested directories if write path.join(process.cwd(), "app", "src", "**", "*.hbs"),
      entry: path.join(process.cwd(), 'app', 'src', '*.hbs'),
      // output path and filename(s). This should lie within the webpacks output-folder
      // if ommited, the input filepath stripped of its extension will be used
      output: path.join(process.cwd(), 'build', '[name].html'),
      // you can also add a [path] variable, which will emit the files with their relative path, like
      // output: path.join(process.cwd(), "build", [path], "[name].html"),

      // data passed to main hbs template: `main-template(data)`
      data: require('./app/data/project.json'),
      // or add it as filepath to rebuild data on change using webpack-dev-server
      data: path.join(__dirname, 'app/data/project.json'),

      // globbed path to partials, where folder/filename is unique
      partials: [
        path.join(process.cwd(), 'app', 'src', 'components', '*', '*.hbs'),
      ],

      // register custom helpers. May be either a function or a glob-pattern
      helpers: {
        nameOfHbsHelper: Function.prototype,
        projectHelpers: path.join(
          process.cwd(),
          'app',
          'helpers',
          '*.helper.js',
        ),
      },
    }),
  ],
  module: {
    rules: [
      // JavaScript
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      // изображения
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      // шрифты и SVG
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
      // CSS, PostCSS, Sass
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      //handlebar
      {
        test: /\.hbs$/i,
        loader: 'html-loader',
        options: {
          preprocessor: (content, loaderContext) => {
            let result;

            try {
              result = Handlebars.compile(content)({
                firstname: 'Value',
                lastname: 'OtherValue',
              });
            } catch (error) {
              loaderContext.emitError(error);

              return content;
            }

            return result;
          },
        },
      },
    ],
  },
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, './build'),
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },
};
