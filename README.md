<p align="center">
<img src="https://raw.githubusercontent.com/msintaha/macchiato/master/assets/img/macchiato-text.png">
</p>

# Aubraint Integrated Care Platform (ICP)
A MEAN Stack multi-tenant application for ICP as described at www.aubrant.com.



#### The server and client sides are fully separate

## Setup
- Install NodeJS
- `npm install -g gulp gulp-cli eslint bower`
- First run server, then run client

## Server - Express JS
-  Create 2 mongoDB databases `icpDB`
- Navigate to server/
- `npm install` to install project dependencies
- `nodemon` to run the app
- `npm test` to run unit tests

```bash
.
├── app.js # Main node server folder
├── config
│   └── index.js # Configurations go here
├── controllers
│   └── org
│       ├── TEST
│       │   └── runner.js
│       └── index.js
│   └── tenant
│       ├── TEST
│       │   └── runner.js
│       └── index.js
│   └── user
│       ├── TEST
│       │   └── runner.js
│       └── index.js
├── models
│   └── org
│       └── index.js
│   └── tenant
│       └── index.js
│   └── user
│       └── index.js
├── package.json
├── public # assets folder
│   └── stylesheets
│       └── style.css
├── routes # contains all route endpoints
│   └── endpoints
│       └── index.js
├── test # A configuration for running tests
│   └── utils.js
└── views # Frontend view (not used)
    ├── error.jade
    ├── index.jade
    └── layout.jade
 ```

## Client - Angular JS
- Navigate to client/
- `npm install`
- `bower install`
- `gulp serve` to run the app
- `gulp test` to run unit tests

```bash
.
├── bower.json
├── gulpfile.js # Main gulp config
├── karma.conf.js # Karma test runner configurations
├── package.json
└── gulp # Contains gulp configurations 
└── src
    ├── app
    │   ├── components # Directives
    │   │   └── posts
    │   │       ├── posts.directive.js
    │   │       ├── posts.directive.spec.js
    │   │       └── posts.html
    │   ├── controllers # Controllers (views)
    │   │   ├── edit
    │   │   │   ├── edit.controller.js
    │   │   │   ├── edit.controller.spec.js
    │   │   │   └── edit.html
    │   │   ├── main
    │   │   │   ├── main.controller.js
    │   │   │   ├── main.controller.spec.js
    │   │   │   └── main.html
    │   │   ├── post
    │   │   │   ├── post.controller.js
    │   │   │   ├── post.controller.spec.js
    │   │   │   └── post.html
    │   │   └── publish
    │   │       ├── publish.controller.js
    │   │       ├── publish.controller.spec.js
    │   │       └── publish.html
    │   ├── filters # Custom filters
    │   │   └── sanitize
    │   │       └── sanitize.filter.js
    │   ├── index.config.js # Angular configurations
    │   ├── index.constants.js # Angular global constants
    │   ├── index.module.js # Angular modules
    │   ├── index.route.js # Angular routes
    │   ├── index.run.js # Main runblock of angular
    │   ├── index.scss # Main SASS file
    │   ├── partials # Static HTMLs
    │   │   ├── nav.html
    │   │   └── sidebar.html
    │   └── services # Angular services
    │       └── posts
    │           ├── posts.service.js
    │           └── posts.service.spec.js
    ├── assets # App assets
    │   └── img
    │       ├── favicon.ico
    │       ├── favicon.png
    │       └── aubrant.png
    └── index.html # Main index file
```

# License
This project is licensed under the MIT license.

If you have any questions or comments, please create an issue.
