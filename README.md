# webpack

# **설명**

webpack, babel, 등 플로그인 적용 연습

# **skill**

webpack, TypeScript, babel

# **참고 사이트**

- [https://joshua1988.github.io/webpack-guide/](https://joshua1988.github.io/webpack-guide/)

package.json

---
```
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
```
필요한 것들

- webpack
- webpack-dev-server: express 기반으로 되어 있는 web server 이다.
번들 파일을 만드는 것 대신에 (bundle.js) local browser 에서 실행 할수 있게 도와준다.
- html-webpack-plugin-D
bundle한 css,js파일을 각각 html파일에 link 태그와 scripts태그로 추가해줘야 한다. 이걸 자동화 시켜주는 라이브러리다.
- webpack-cli
- awesome-typescript-loader

### webpack.config.js

---
```
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
```
- **entry** : 연결되어 있는 각 파일 중, 제일 처음으로 시작되는 최상위 파일. 해당 최상위 파일부터 각 각 하위로 따라 내려가며 번들화 작업을 한다.( default: ./src/index.js)
- **output**: 번들화 된 파일을 export 할 경로와 파일명.
- __dirname: 현재 실행 중인 파일 경로
- __filename: 현재 실행 중인 폴더 경로
위의 설정에는, 'src/index.tsx'의 파일이 running 시 동작되는 것 중 제일 처음으로 동작하는 최상위 파일이며, 해당 번들화 된 파일은 루트 경로의 '/dist/bundle.min.js'파일로 추출된다.
- **Loaders:** webpack은 오직 js, Json 만 이해하고 있습니다. 다른 형태의 파일을 이해 할 수있도록 변환 시켜줘야 한다.
- test: 속성을 변환해야 하는 파일
- use: 속성을 변환을 수행하는데 사용하는 로더
ex:
```
    module: {
        rules: [{ test: /\.txt$/, use: 'raw-loader' }],
      },
```
    **require,import 문 내에서 txt 파일로 확인되는 파일은 번들에 추가하기 전에 "raw-loader"를 사용해줘**

- Plugins: loaders는 어떤 모듈의 변경이라면, plugins은 번들 최적화, asset managemnet, 환경 변수 주입 등..
ex:

plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })]

application 을 위해 발생되는 모든  bundles에 자동으로 "html-webpack-pulgin" 이 주입하게 됩니다.

**플러그인 목록** 

[https://webpack.js.org/plugins/](https://webpack.js.org/plugins/)

- **Mode:** development,production, none 을 설정 할수 있습니다.(기본은 production )
****
```
module.exports = {
  mode: 'production',
};
```
development: process.env.NODE_ENV 에 대한 DefinePlugin 값 development 모듈을 사용합니다.

나머지 동일

### tsconfig.json

---
```
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
```
tsconfig.json: 프로젝트를 컴파일 하는데 필요한 루트 파일과 컴파일러 옵션을 지정합니다.

typeScript or javaScript project 설정을 합니다.

- "compilerOptions": 속성은 생략될 수 있으며 생략하면 컴파일러의 기본 값이 사용됩니다.
- "sourceMap": true

## **tsc vs babel**

---

how to convert from TypeScript to  JavaScript 

- Is your build output mostly the same as your source input files? Use `tsc`
- Do you need a build pipeline with multiple potential outputs? Use `babel` for transpiling and `tsc` for type checking

## **바벨을 사용해야 하는 이유**

---

**바벨7 이전**

TS > TS compiler > JS > Babel > JS 순서

웹팩은 두개의 컴파일러를 함께 사용하기 위해 사용된다. ( babel, tsc ) 웹팹 설정을 비틀어 *.ts 를 타입스크립트로 입력한 다음 결과를 바벨에 제공한다. 웹팩의 탑이스크립트 로더에는 ts-loader, awesome-typscript-loader 가 있는데 awe~  일부 작업의 부하로 컴파일 속도가 느리며, ts-loader는 많은 복잡한 캐시 로더를 함께 설정하여 사용해야 하는 불편함이 있다.

**바벨7 이후**

바벨은 타입스크립트를 우선 js로 변경한다. 

- 바벨 + 타입스크립트코드는 느린 컴파일 시간 개선
- 준비가 되었을 때만 타입 오류를 확인하라
( js로 우선 안정성 검사 하지 않고 컴파일한 다음 코드 실험이 끝나고 타입 검사를 진행한다. )
- TypeScript는 전체 프로젝트를 컴파일 하지만 Babel은 한번에 하나의 파일만 컴파일 한다.
```
{
	"compilerOptions": {
		// Target latest version of ECMAScript.
		"target": "esnext",
		// Search under node_modules for non-relative imports.
		"moduleResolution": "node",
		// Process & infer types from .js files.
		"allowJs": true,
		// Don't emit; allow Babel to transform files.
		"noEmit": true,
		// Enable strictest settings like strictNullChecks & noImplicitAny.
		"strict": true,
		// Disallow features that require cross-file information for emit.
		"isolatedModules": true,
		// Import non-ES modules as default imports.
		"esModuleInterop": true
	},
	"include": [
		"src"
	]
}
```
## 필요한 것들 정리

---

참고

[https://ui.toast.com/weekly-pick/ko_20181220](https://ui.toast.com/weekly-pick/ko_20181220)

[https://www.typescriptlang.org/tsconfig](https://www.typescriptlang.org/tsconfig)

[https://typescript-kr.github.io/pages/tsconfig.json.html](https://typescript-kr.github.io/pages/tsconfig.json.html)

---

## Error

- [webpack] TypeError: Cannot read property 'tap' of undefined

npm i -D html-webpack-plugin@4.4.0 webpack@4.40.2 webpack-cli@3.3.9

5버전대 webpack 이 충돌이 일어 날수 있다.