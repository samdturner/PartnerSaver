# PartnerSaver

[Website link][weburl]

[weburl]: http://partnersaver27.herokuapp.com/tasks

## Concept
PartnerSaver is an app built for AIESEC Canada to help them organize their commitments to their donors. Each year, the non-profit depends on millions of dollars in corporate donations to operate.  PartnerSaver allows AIESEC Canada easily manage their commitments to donors and maintain these important relationships.

Credit: Thank you you to my amazing client, AIESEC Canada, for giving me permission to open source the project and share my work with community.  Also thank-you to the Shaka Code team for the webpack-rails starter pack.  https://github.com/shakacode/react-webpack-rails-tutorial


## Key Features
- Tasks are automatically saved on keystroke
- Create tasks and partners
- Easily filter tasks by type, status and deadline
- Search for tasks based on any string in the task
- Sort tasks by partner name, deadline, or title


## Technologies Used
- [React](http://facebook.github.io/react/)
- [Redux](https://github.com/reactjs/redux)
- [Webpack](https://github.com/webpack/docs/wiki)
- [npm](https://www.npmjs.com/)
- [ES2015](https://www.npmjs.com/)
- [Rails](https://rubygems.org/gems/rails/versions/4.2.6)
- [react-router](https://github.com/reactjs/react-router)
- [Sass modules (using webpack's css loader)](https://github.com/webpack/css-loader)
- [axios](https://github.com/mzabriskie/axios)
- [react_on_rails gem](https://github.com/shakacode/react_on_rails/)
- [React Bootstrap (bootswatch template)](https://react-bootstrap.github.io/)
- [Immutable.js](https://facebook.github.io/immutable-js/)
- [Font Awesome (icons)](https://github.com/FortAwesome/Font-Awesome)
- [Heroku](https://id.heroku.com)


## Technical Highlights
- Implemented actions creators that used axios, a promise based HTTP client.  This allowed me to chain success / error functions together while keeping the code readable and maintainable
- Configured webpack's css-loader to enable locally scoped css by default.  This configuration solves css problems that occur at scale: 1) Global collisions; 2) Overqualified Selectors; 3) Dead Code Elimination; 4) Non-deterministic resolution
- Implemented the KMP substring search algorithm to increase efficiency of searching for notes
- Used the react development pattern of container components and view components in order to separate concerns of logic and view.
- Automatically saves a task when a user begins typing.  Implemented a debounce function to solve the problem of overloading the server.


## Promise based HTTP client for simple callback chaining
One problem faced by data heavy apps that rely on a RESTful API is chaining ajax callbacks in a simple / maintainable way (aka avoiding "callback hell").  Axios helps solves this problem by allowing us to chain promises.

PartnerSaver uses a requestsManager.js file to store all API requests, keeping the app more organized and maintainable.

```
# client/app/libs/requestsManager.js

const TASKS_URL = 'api/tasks';

export default {

  fetchTasks(params) {
    return request({
      method: 'GET',
      url: TASKS_URL,
      params: params,
      responseType: 'json'
    });
  }

```

Promise based action creators allows for simple chaining.


```
# client/app/libs/requestsManager.js

export function sortTasks(params) {
  return dispatch => {
    dispatch(setIsFetching());
    dispatch(setSortType(params.selectedSortType));
    return(
      requestsManager
        .fetchTasks(params)
        .then(res => dispatch(fetchTasksSuccess(res.data)))
        .then(res => dispatch(setVisibleTasks()))
        .catch(res => dispatch(fetchTasksFailure(res.data)))
    )
  }
}

```


## Configured webpack's css and sass loaders to create css modules
At scale, CSS becomes less maintainable because of the following problems.

1) Global collisions
2) Overqualified Selectors
3) Dead Code Elimination
4) Non-deterministic resolution

By configuring webpack to apply a module loader to sass files, we can locally scope css and eliminate these scaling problems.

```
# client/webpack.client.base.config.js

config.module.loaders.push({
  test: /\.scss$/,
  exclude: /node_modules/,
  loaders: [
    'style',
    'css?modules&importLoaders=3&localIdentName=[name]__[local]__[hash:base64:5]',
    'postcss',
    'sass',
    'sass-resources',
  ]
})

```
