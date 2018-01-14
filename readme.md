# Starter Kit

Starter-kit for building robust Javascript development environment.

### Terms below are the same thing:

* Javascript Development Environment
* Boilerplate
* Starter Kit
* Seed
* Starter Project

## Outline

1. Intro
2. Editor and Configuration
3. Package management
4. Development Server
5. Automation
6. Transpailing
7. Bundling
8. Linting
9. Testing and CI (Continous Integration)
10. HTTP
11. Project structure
12. Production build
13. Automated deployment

## 1. Intro

What belongs in your starter kit?

1. Package Management
2. Bundling
3. Minification
4. Sourcemaps
5. Transpailing
6. Dynamic HTML Generation
7. Centralized HTTP
8. Mock API framework
9. Component libraries
10. Development Webserver
11. Linting
12. Automated testing
13. Continuous integration
14. Automated build
15. Automated deployment
16. Working example app (directory structure & file naming practices)

Github needed for?

* Continuous integration
* Automated deployment

## 2. Editor and Configuration

### 2.1 Editor

What to look for?

* Strong 2015+ support:
  * Autocompletion
  * Parse ES6 imports
  * Report unused imports
  * Automated refactoring
* Framework intelligence
* Built-in terminal

Selections:

* Atom
* Webstorm (Favorite but NOT FREE)
* Brackets
* VSCode (Recommended)

### 2.2 Automated Consistency via `Editorconfig`.

What for? Maintain consistency for the code in diferrent IDE.
How? Create file called `.editorconfig` in root of your project.

Recommendation:

```javascript
# editorconfig.org
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false
```

NOTES:

* VSCode need to install plugin to enable `.editorconfig`
* Make sure your team install appropriate plugin for the editor that their using

## 3. Package Management

Selections:

* Bower
* npm (Recommended)
* JSPM
  * Stands for Javascript package manager
  * allows you to install packages from its own list repo, as well as other repo including npm, github and bower.
  * JSPM can bundle your code
* Jam
* volo

Security Scanning:

* retire.js
* Node Security Platform (prefered)
  * https://nodesecurity.io/opensource

When to run security check?

* Manually : Easy to forget
* npm install : May be issue later
* production build : Expensive to change
* pull request : Expensive to change
* npm start: Slows start slightly (prefered)

## 4. Development Server

Selections

* http-server
  * Ultra simple
  * Single command serves current directory
* live-server
  * Lightweight
  * Supoort live-reloading
  * Improvement of http-server
* Express
  * Comprehensive
  * Highly configurable
    * not just static files but you can serve API
  * Production grade
  * Can run it anywhere
  * try also to check `Koa` and `Hapi`
* budo
  * Integrates with Browserify
  * Include hot reloading
* Webpack dev server
  * Built in to Webpack
  * Serves from memory
  * Includes hot reloading
* Browsersync
  * Dedicated IP for sharing work on LAN
  * All interaction remain in sync!
  * Great for cross-device testing
  * Integrates with Webpack, Express, browserify, gulp, and more

Sharing working progress

* localtunnel
  * Easily share work on your local machine
  * Setup:
    1. npm install localtunnel -g
    2. start your app
    3. lt --port 3000
  * Easiest setup
  * Ultra-versatile
  * Work nicely with browsersync
  * no security
* ngrok
  * Secure tunnel to your local machine
  * How?
    1. Signt up
    2. Install ngrok
    3. Install authtoken
    4. Start your app
    5. ./ngrok http 80
    6. or type `ngrok http 3000` where 3000 is the port number
  * Require initial setup work
  * Secure
* now
  * Quickly deploy Node.js to the cloud
  * How?
    1. npm install -g now
    2. Create start script
    3. type `now`
  * No firewall hole
  * Hosting presists
* Surge
  * Quickly host static files to public URL
  * Only support static files
  * How?
    1. npm install -g surge
    2. type `surge` in your project dir
  * No firewall hole
  * Hosting presists

## 5. Automation

package.json

```javascript
"scripts": {
  "prestart": "node buildScripts/startMessage.js",  # run before script `start` executed
  "start": "npm-run-all --parallel security-check open:src",  # npm-run-all --parallel: run multiple script concurrently
  "open:src": "node buildScripts/srcServer.js",
  "security-check": "nsp check",
  "share": "ngrok http 3000"
},
```

## 6. Transpailer

Popular transpailer

1. Babel (\*Recomended)

* Write standarized JS
* Leverage full JS Ecosystem
* Use experimental features earlier, such as stage-(0-4) features
* No type defs, annotation required
* ES6 imports are statically analyzable
* Test, Lint, Babel, Great Libs, IDE = safety

2. Typescript

* Enhanced autocomplete
* Enhanced readability
* Safer refactoring
* Additional non-standard features, such as Interface

3. Elm

* Compile down to JS
* Clean syntax
* Immutable data structure
* Friendly errors
* All errors are compile-time errors
* Interops with JS

Babel configuration styles:

* .babelrc (\*Recommended)
  * not npm specific
  * Easier to read since isolated
  ```javascript
  {
    "presets": [
      "latest"  # (deprecated) use latest javascript features
      "env"  # babel-preset-env replaces es2015, es2016, es2017, latest
    ]
  }
  ```
* package.json
  * One less file in your project
  ```javascript
  {
    "name": "my-package",
    "version": "1.0.0",
    "scripts": {
      "prestart": "babel-node buildScripts/startMessage.js",  # babel-node require babel-cli
      "babel-version": "babel --version",
      "open:src": "babel-node buildScripts/srcServer.js",
    },
    "babel": {
      // my babel config here..
      "presets": ["env"]
    }
  }
  ```
  * references: https://babeljs.io/docs/plugins/#presets-stage-x-experimental-presets-

## 7. Bundling

Why bundling?

* CommonJS doesn't work in web browsers
* Package project into file(s)
  * If we have 5 pages
  * bundler can create seperate bundle for each page
  * that way user only have to download the relevant javascript for the first page on intial load‰
  * save bandwidth and speed pageload
* Import node performance

Module formats:

* IIFE (Immediately Invoked Function Expression)
  * removes variable from global scope
  * example:
    ```javascript
    (function() {
      // my code here..
    })();
    ```
  * old fashioned: AVOID this
* AMD (Asynchronous Module Definition)
  * example:
    ```javascript
    define(["jq", function(jq) {}]);
    ```
  * old fashioned: AVOID this
* CJS (CommonJS)
  * popularize by node
  * example:
    ```javascript
    var jquery = require("jquery");
    ```
* UMD (Universal Module Definition)
  * blend AMD with CommonJS
* ES6 Modules (\*Recommended)
  * example:
    ```javascript
    import jquery from "jquery";
    ```
  * RECOMMENDED, why?
    * standarized
    * statically analyzable
      * improve autocomplete
      * intellegence refactoring
      * fails fast
      * `tree shaking`
        * means: dead code elimination
    * Easy to read
      * compare to AMD and UMD
      * you can clean up your code using `named imports`
        * allow you to easily declared variable that reference pieces of the file of your importing
      * Default exports
        * specify clearly how others can consume your modules

Bundler tools:

* Require.Js
  * first popular bundler
  * utilized and helped popularized AMD pattern
* browserify
  * The first bundler to reach mass adoption
  * Bundle npm package for the web
    * browserify takes all of your code and all nmp packages that you're reference and bundle them up that browser can use
  * use CommonJS pattern
  * Large plugin ecosystem
* webpack (\*Recommend)
  * bundles more than just JS
  * Import CSS, images, etc like JS
  * Can inline images and styles if justify saving in http requests
  * Built in hot-reloading web server
  * webpack serves file from memory which speed development builds and
  * automatically update client site state like code changes
  * not just JS but your css, images and html
* rollup
  * Tree shaking
    * eliminate code that you are not using from final bundle
      * reduce bundle size
      * saving bandwidth
      * speeding page load
  * Faster loading production code
    * faster than browserify and webpack
    * because webpack and browserify have to inline module loader
    * whereas rollup moves all code into the same scope
  * Great for library authors
  * No hot reloading and code splitting yet
* JSPM
  * Uses SystemJS behind the scene
    * SystemJS use UMD
      * means: can load variety JS module style like AMD, CommonJS, ES6 modules
  * Can load modules at runtime
  * Has its own package manager
  * Can install from npm, git and more
  * use Rollup in its builder

Why webpack?

* Much more than JS
  * CSS
  * Images
  * Fonts
  * HTML
* Bundle splitting
* Hot module reloading
* Webpack2 offers tree shaking

Webpack config example:

```javascript
import path from 'path';

export default {
  debug: true,  # enable debugging
  devtool: 'inline-source-map',  # fast and good qualtiy, more checkout: https://webpack.js.org/configuration/devtool/
  noInfo: false,  # turn of webpack info log

  # entry
  # can be array: good way to inject middleware like hot-reloading
  # __dirname: get full path
  entry: [
    path.resolve(__dirname, 'src/index')
  ],
  target: 'web',  # web | node | electron

  # output
  # tell webpack where to put the bundle
  # NOTE: webpack won't actually generate any physical file for our development build.
  #       it will serve our build from memory.
  output: {
    path: path.resolve(__dirname, 'src'),
    publicPath: '/',
    filename: 'bundle.js'
  },

  # plugins
  # - enhance webpack power
  # - such as: hot-reloading, catching erros, linting styles and much more
  plugins: [],

  # Module
  # - tell webpack which file that we want to handle (webpack call this conscept `loaders`)
  # - loaders teach webpack how to handle from file types
  # - from example bellow we set that we want webpack to handle *.js and *.css
  # - you can handle sass, less, images and more
  # - complex webpack approach can see: "Building Application w/ React and Redux in ES6" or "Webpack fundamental" in pluralsight
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loaders: ['style','css']}
    ]
  }
}
```

Sourcemaps

* Used for debug transpiled and bundled code
* Maps code back to original code
* Part of our build
* Downloaded if you open developer tools
* for more checkout here: https://webpack.js.org/configuration/devtool/

How to use debugger?

```javascript
import './index.css';

import numeral from 'numeral';

const courseValue = numeral(1000).format('$0,0.00');
debugger;  # place here
console.log(`I would pay ${courseValue} for this awesome course!`);
```

## 8. Linting

Selection:

1. JSLint
2. JSHint
3. ESLint (\*Recommend)

Linting decisions:

1. Config format?

* ESLint config via package.json

```javascript
{
  "name": "myPackage",
  "version": "0.0.1",
  "eslintConfig": {
    "plugins": ["example"],
    "env": {
      "example/custom": true
    }
  }
}
```

* ESLint config via .eslintrc

```javascript
{
  "root": true,  # apply this config to all, don't look up on other eslintrc.json in each parent
  "extends": [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings"
  ],
  "parserOptions": {
    "ecmaVersion": 7,
    "sourceType": "module"
  },
  "env": {
    "browser": true,
    "node": true,
    "mocha": true
  },
  "rules": {}
}
```

2. Which built-in rules?
3. Warnings or errors?

* Warning
  * Can continue development
  * Can be ignored
  * Team must agree: Fix warnings
* Error
  * Breaks the build
  * Cannot be ignored
  * Team is forced to comply

4. Which plugins?
5. Use preset instead?

**ESLint**

If there are multiple configuration files in the same directory, ESLint will only use one. The priority order is:
source: https://eslint.org/docs/user-guide/configuring#configuration-file-formats

1. .eslintrc.js
2. .eslintrc.yaml
3. .eslintrc.yml
4. .eslintrc.json
5. .eslintrc (deprecated) --> use JSON or YAML
6. package.json

eslint-loader vs eslint-watch

* eslint-loader:

  * Re-lints all files upon save

* eslint-watch(\*recommend):
  * add watch functionality for eslint
  * ESLint wrapper that adds file watch
  * Not tied to webpack
  * Better warning/error formatting
  * Display clean message
  * Easily lint test and build script too

create eslint:

```javascript
./node_modules/.bin/eslint --init
```

## 9. Testing and Continuous Integration

* Testing style:

  1. Unit: Single function or module
  2. Integration: Interaction between multiple modules
  3. UI: Automated interaction with UI, example: using Selenium

* Unit testing desicion:

  1. **Framework**

     * Mocha
       * No assertion
     * Jasmine
       * Include assertion library built in
     * Tape
     * QUnit
     * AVA
     * Jest:
       * From facebook
       * Popular over react developer
       * Wrapper of jasmine

  2. **Assertion Library**

     what's an assertion? Declare what you expect

     ```javascript
     expect(2 + 2).to.equal(4);
     assert(2 + 2).equals(4);
     ```

     Assertion libraries:

     1. Chai (most popular)
     2. Should.js
     3. expect

  3. **Helper Libraries**

     1. JSDOM

        * Implementation of the browser DOM
        * Run DOM-related tests without a browser
        * Useful when u wanna write test that involve HTML and interaction in the browser using node

     2. Cheerio

        * Jquery for the server
        * Query virtual DOM using JQuery selectors

  4. **Where to run tests?**

     * Browser

       * Karma, Testem
       * Testing in actual browser
       * Slower

     * Headless Browser

       * PhantomJS
       * browser that doesn't have UI
       * automated test u don't need the actual interface

     * In memory DOM

      * JSDOM
      * lighterweight of PhantomJS
      * Fast and quick to setup

  5. **Where to place tests?**

      - `Centralized`
        
        - Separate from source code
        - less "noise" in src folder
        - People don't want test deploy to production
      
      - `Alongside`

        - Easy import: test path is relative to source code, if using `centralized` if the path changed than the test broken
        - Clear visibility
        - naming convention: `something.spec.js` or `something.test.js`
        - no recreating folder structure

  6. **When to run tests?**

      Unit test should run when you hit save

      - Rapid feedback
      - Facilitates TDD
      - Automatic = Low friction
      - Increases test visibility

* Testing plan:

  1. Framework? Mocha
  2. Assertion Library? Chai
  3. Helper Libraries? JSDOM
  4. Where to run tests? Node
  5. Where to place tests? Alongside
  6. When to run tests? when hit `save`

* Example test script using mocha in package.json

  ```json
  "scripts": {
    ...
    "test": "mocha --reporter progress buildScripts/testSetup.js \"src/**/*.test.js\""
  }
  ```
  Reporter can be:
    1. progress
    2. min
    4. nyan
    0. more check https://mochajs.org/#reporters


* Continous Integration

  Why wee need CI:

  - Forgot to commit new file
  - Forgot to update package.json
  - Commit doesn't run cross-platform
  - Node version conflict
  - Bad merge
  - Didn't run tests
  - Catch mistakes quickly

  What does a CI server do?

  - Run automated build
  - run your tests
  - Check code coverage
  - Automate deployment

  Selection:
  
  1. Travis (Popular)
  2. Appveyor (Windows support)
  3. Jenkins (Popular)
  4. CircleCI
  5. Semaphore
  6. SnapCI

  Travis CI:

  1. config by create `.travis.yml`
  ```yml
  language: node_js
  node_js:
    - "8"
  ```
  2. register TravisCI
  
  Appveyor

  1. config by create `appveyor.yml`
  ```yml
  # Test against this version of Node.js
  environment:
    matrix:
    # node.js
    - nodejs_version: "8"

  # Install scripts. (runs after repo cloning)
  install:
    # Get the latest stable version of Node.js or io.js
    - ps: Install-Product node $env:nodejs_version
    # install modules
    - npm install

  # Post-install test scripts.
  test_script:
    # Output useful info for debugging.
    - node --version
    - npm --version
    # run tests
    - npm test

  # Don't actually build.
  build: off
  ```


  

## 10. HTTP Calls

* HTTP call approches

  1. Node
      - http
      - request
  2. Browser
      - XMLHttpRequest
      - JQuery AJAX
      - Fetch
  3. Node & Browser
      - isomorphic-fetch
      - xhr
      - SuperAgent
      - Axios

* Pollyfill

  is a piece of code (or plugin) that provides the technology that you, the developer, expect the browser to provide natively.

* How to implement pollyfill?


  ```javascript
  <script src="https://cdn.polyfill.io/v2/polyfill.min.js">
  ```

  Only send pollyfill to those who need it. in example bellow is `fetch`
  ```javascript
  <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=fetch">
  ```

* Why mock HTTP?

  - Unit Testing
  - Instant Response
  - Keep working when service are down
  - Rapid prototyping
  - Avoid inter-team bottlenecks
  - Work Offline

* How to mock HTTP

  - Nock
  - Static JSON
  - Create development webserver
    - api-mock
    - JSON server
      - create fake database using static JSON
      - create webservice that works with static JSON
    - JSON Schema faker
      - create different fake data
    - Browsersync
    - Express

* Plan for mocking HTTP

  1. Declare our schema:
      - JSON schema faker - [repl](http://json-schema-faker.js.org/#gist/eb11f16c9edccf040c028dc8bd2b1756)
  2. Generate Random data:
      - [faker.js](https://rawgit.com/Marak/faker.js/master/examples/browser/index.html "Title")
        - generating realistic name, address, email, etc
      - [chance.js](http://chancejs.com/ "Title")
        - generating realistic name, address, email, etc
      - [randexp.js](http://fent.github.io/randexp.js/ "Title")
        - create random data based on regular expression
  3. Serve data via API
      - JSON server
        - support CRUD

* JSON schema

  standard for describing json data format

## 11. Project Structure

1. Put your JS in .js file
    - don't put your javascript alongside with html

2. Consider organizing by feature

  - Organize by file type (DON'T)
    ```sh
    /components
    /data
    /model
    /views
    ```
  - Organize by feature (DO This)
    ```sh
    /authors
    /courses
    ```
3. Extract Logic into `POJOs` (Plain Old Javascript Objects)
  
  - POJOs
    - stands for `Plain Old Javascript Objects`
    - Pure logic.
    - No framework-specific code
    - for example:
      - If you working in React, much of your logic should exist outside of React components. This make your logic easy to test, easy to reuse, help minimize your ties to the framework you've selected.
      - This minimize impact of switching to another framework.
      - check the example from [react-slingshot](https://github.com/coryhouse/react-slingshot). Yang dimaksud POJOs ada di folder src/utils
## 12. Production Build

* Minification

  How does minification work?

  - Shortens variable and function names
  - Removes comments
  - Removes whitespaces and new lines
  - result in smaller file size which help speed's page load
  - Webpack2 & Rollup bisa mengeliminasi code yang ga dipake (dinamakan Tree-shaking)
  - Debug via sourcemap 

* Referencing bundled assets in HTML

  1. Hard code
  2. Manipulate via Node
  3. html-webpack-plugin

* Cache busting

  - Save HTTP Requests
  - Force request for latest version
  - How?
    - Hash bundle filename: using `webpack-md5-hash` plugin
      - `webpack-md5-hash` will create hash depend on the source code
      - if any changes on the source code then the hash will change
    - Generate HTML dynamiclly
  - using `webpack

## 13. Production Deploy

Notes:

* npm start -s --> run in silince mode
