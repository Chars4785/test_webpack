# webpack

# **설명**

webpack, babel, 등 플로그인 적용 연습

# **skill**

webpack, TypeScript, babel

# **참고 사이트**

- [https://joshua1988.github.io/webpack-guide/](https://joshua1988.github.io/webpack-guide/)

package.json

---

"scripts": {
    "start": "webpack-dev-server --mode development --open --hot",
    "build": "webpack --mode production"
  },
  "dependencies": {
    "react": "^17.0.2",
    "react-dom": "^17.0.2"
  },
  "devDependencies": {
    "@babel/core": "^7.14.0",
    "@babel/plugin-proposal-class-properties": "^7.13.0",
    "@babel/preset-env": "^7.14.1",
    "@babel/preset-react": "^7.13.13",
    "@types/react": "^17.0.5",
    "@types/react-dom": "^17.0.4",
    "awesome-typescript-loader": "^5.2.1",
    "babel-core": "^6.26.3",
    "babel-loader": "^8.2.2",
    "babel-preset-react": "^6.24.1",
    "html-webpack-plugin": "^4.4.0",
    "rimraf": "^3.0.2",
    "source-map-loader": "^2.0.1",
    "strip-ansi": "^7.0.0",
    "ts-loader": "^9.1.1",
    "typescript": "^4.2.4",
    "webpack": "^4.40.2",
    "webpack-cli": "^3.3.9",
    "webpack-dev-server": "^3.11.0"
  }

필요한 것들

- webpack
- webpack-dev-server
- html-webpack-plugin-D
- webpack-cli
- awesome-typescript-loader

### webpack.config.js

---

const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.min.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
}

- **entry** : 연결되어 있는 각 파일 중, 제일 처음으로 시작되는 최상위 파일. 해당 최상위 파일부터 각 각 하위로 따라 내려가며 번들화 작업을 한다.
- **output**: 번들화 된 파일을 export 할 경로와 파일명.

위의 설정에는, 'src/index.tsx'의 파일이 running 시 동작되는 것 중 제일 처음으로 동작하는 최상위 파일이며, 해당 번들화 된 파일은 루트 경로의 '/dist/bundle.min.js'파일로 추출된다.

### tsconfig.json

---

{
  "compilerOptions": {
    "sourceMap": true,
    "noImplicitAny": false,
    "module": "commonjs",
    "target": "es6",
    "lib": [
      "es2015",
      "es2017",
      "dom"
    ],
    "removeComments": true,
    "allowSyntheticDefaultImports": false,
    "jsx": "react",
    "allowJs": true,
    "baseUrl": "./",
    "paths": {
      "components/*": [
        "src/components/*"
      ],
    }
  }
}

---

## Error

- [webpack] TypeError: Cannot read property 'tap' of undefined

npm i -D html-webpack-plugin@4.4.0 webpack@4.40.2 webpack-cli@3.3.9

5버전대 webpack 이 충돌이 일어 날수 있다.