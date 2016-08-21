# SaySomething

Saysomething is a simple real-time chat application implemented with long polling AJAX technique. React.js is used in front-end side, and Node.js / MongoDB is used in the back-end side.

**Preview:** https://saysomething.hoah.xyz/

## Tech
Following technologies are used in this project
- react
- webpack
- webpack-dev-server
- babel
- redux
- redux-actions
- redux-saga
- axios
- node-sass
- style-loader, css-loader, sass-loader
- react-custom-scrollbars
- express
- mongodb
- mongoose
- nodemon
- dotenv
- eslint

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
- node.js 4.5.0^
- npm 2.15.9^ *(using npm 3.x is recommended due to its faster speed)*
- MongoDB 3.0^ *(you can host a database from http://mlab.com/)

### Installing
1. Install global dependencies
    ```
    npm install -g babel-cli webpack webpack-dev-server nodemon
    ```
    - **babel-cli** lets you use babel commands from console.
    - **webpack** lets you bundle the client-side codes and **webpack-dev-server** is a module for the development server.
    - **nodemon** restarts the node webserver whenever the code changes during development.

2. Clone the project from github repository
    ```
    git clone https://github.com/velopert/saysomething.git
    cd saysomething
    ```
3. Install local dependencies  
   There are two directories: client / server, go inside each folder and install the local dependencies
    ```
    cd client
    npm install
    cd ../server
    npm install
    ```
4. Modify *server/.env* file  
    .env file stores the PORT of the server, and URI of the database. Rename the .env.cpy file to .env. (If not shown, toggle hidden files visibility) This is feature of local dependency *dotenv*
    ```
    PORT=3000
    DB_URI="mongodb://host:port/saysomething"
    ```
    The default port of server is 3000. If you change this port, you also have to change in *client/config/webpack.config.dev.js* file (devServer: proxy).
    This project requires a mongodb server. You can install install mongodb server on local machine or host a database from https://mlab.com/
    
### Development
In development environment, you have to run dev script from both of the client and server directories (either open multiple terminals or use screen of UNIX)
```
cd client
npm run dev
```
Development server of client uses 4000 port, and it can be changed from *client/config/webpack.config.dev.js*. Hot-Module-Reloading is enabled in this development server. If you access http://host:4000/ and modify the code, the changes will applied immediately.
```
cd server
npm run dev
```
When the server runs in development environment, it will restart the server when the files get modified.

### Building the source
Both front-end side and back-end side codes need to be built because both sides use ES6 syntax, and additionally, the front-end side uses webpack to bundle the codes.  

To build, you have to run build script in both of the client and server directory as you did when you install the local dependencies.
```
cd client
npm run build
```
```
cd server
npm run build
```

### Run the server
(You have to go through building process to do this)
```
cd server
npm start
```
### License
[MIT License](http://opensource.org/licenses/MIT).  
Copyright (c) 2016 [velopert](https://www.velopert.com/).
