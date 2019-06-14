//import React from 'react';
import { AppRegistry } from 'react-native';
import * as serviceWorker from './serviceWorker';
import App from './App';

AppRegistry.registerComponent('App', () => App);
AppRegistry.runApplication('App', {
  initialProps: {},
  rootTag: document.getElementById('root')
});

serviceWorker.unregister(); // If you want your app to work offline and load faster, you can change unregister() to register() below. Note this comes with some pitfalls. Learn more about service workers: https://bit.ly/CRA-PWA
