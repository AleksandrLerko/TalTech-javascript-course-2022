# To start use this command:
~~~sh
npm run start
~~~

# TypeScript configuring

## Install babel-loader, TypeScript and babel deoendencies with those commands:
~~~sh
npm install babel-loader --save-dev
npm install typescript --save-dev
npm install --save-dev @babel/core @babel/cli @babel/plugin-proposal-class-properties @babel/preset-env @babel/preset-typescript
~~~

## Add to webpack.config.js:
```js script
resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
}

module: {
    rules: [{
        // Include ts, tsx, js, and jsx files.
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
    }],
}
```

### To buid it all (dist folder) use:
~~~sh
npx webpack
~~~

## Create .babelrc:
```js script
{
    "presets": ["@babel/preset-env", "@babel/preset-typescript"],
    "plugins": [
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-proposal-object-rest-spread"
    ]
}
```

## tsconfig.json
```js script
{
    "compilerOptions": {
        "allowSyntheticDefaultImports": true,
        "noFallthroughCasesInSwitch": true,
        "noUnusedParameters": true,
        "noImplicitReturns": true,
        "esModuleInterop": true,
        "noUnusedLocals": true,
        "noImplicitAny": true,
        "alwaysStrict": true,
        "declarationDir": "dist/types",
        "declaration": true,
        "target": "es2015",
        "module": "es2015",
        "strict": true
    },
    "include": [
        "src/**/*"
    ],
    "exclude": [
        "node_modules",
        "dist"
    ]
}
```


