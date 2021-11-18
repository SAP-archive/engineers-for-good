# How to start the app

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode without mocked API.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

The app will try to fetch countries from `localhost:3000/api/v1/countries`, which needs to be added to the backend.

### `npm run start:dev`

Runs the app in the development mode with mocked API.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

The countries API is mocked by miragejs.

## Mocked API

When starting the app in the development mode `npm start:dev`, The API (/api/v1/countries) is mocked by [miragejs](https://miragejs.com/) and will only be mocked in browser. 

miragejs server will be started along with the app, this is configured in [index.js](src/index.js)

```js
if (process.env.REACT_APP_ENV === "dev" && typeof makeServer === "function") {
  makeServer(); // For people following the tutorial
}
```

[server.js](src/server.js) sets up the miragejs mock server. All routes **must** be defined here.

### passthrough

You can pass through the routes with `this.passthrough('routes/to/passthrough')`, so that they will be skipped miragejs.

