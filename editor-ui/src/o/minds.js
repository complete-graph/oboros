import { AppRegistry } from 'react-native';
import * as serviceWorker from '../serviceWorker';
import React from 'react';
import MainView from './view';

export default {
  createUI: ({ o }) => {
    class RootView extends React.Component {
      constructor() {
        super();
        this.state = { o };
        o.x({ call: 'setMind', input: { id: 'render', value: ({o}) => this.update({o}) } });
      }
      update(o) { this.setState({ o }) };
      render() { return <MainView o={o}/> };
    }
    AppRegistry.registerComponent('RootView', () => RootView);
    AppRegistry.runApplication('RootView', {
      initialProps: {},
      rootTag: document.getElementById('root')
    });
    serviceWorker.unregister(); // If you want your app to work offline and load faster, you can change unregister() to register() below. Note this comes with some pitfalls. Learn more about service workers: https://bit.ly/CRA-PWA
  }
}