# webpack-inline-match-resource-issue

This is am implement demo from the [inline matchResouce document for Webpack](https://webpack.js.org/api/loaders/#inline-matchresource).

The `extract-style-loader/index` convert `file.js` from

```js
/* STYLE: body { background: red; } */
console.log('yep');
```

to

```js
import './file.js.css!=!extract-style-loader/getStyles!./file.js';
console.log('yep');
```

To generate standalone `.css` file I use the `file-loader` to handle it:

```js
// webpack.config.js
module.exports = {
  mode: process.env.NODE_ENV || "development",
  devtool: "none",
  entry: resolve(__dirname, "./file.js"),
  output: {
    path: resolve(__dirname, "dist"),
    filename: "index.js"
  },
  module: {
    rules: [
      {
        test: /\.js/,
        use: [
          {
            loader: require.resolve("./extract-style-loader")
          }
        ]
      },
      {
        test: /\.css/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].css"
            }
          }
        ]
      }
    ]
  }
};
```

It's expected to be:

```
file-loader!extract-style-loader/getStyles!./file.js
```

which means the `extract-style-loader/getStyles` extract a virtual file called `file.js.css` and then passed to the `file-loader`.

but in fact it is:

```
extract-style-loader/getStyles|file-loader!./file.js
```

The `file-loader` will write the original `file.js` to dist and return `module.exports = __webpack_public_path__ + "file.css"` and then the `extract-style-loader/getStyles` failds.

