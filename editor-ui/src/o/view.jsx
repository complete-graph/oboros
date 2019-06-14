import React from 'react';
import { View, Text, Button } from 'react-native';

const Views = {
  Main: ({ o }) => {
    const app = o.x({ call: 'getApp' });
    const appMinds = {
      setTestState: ({ o }) => {
        o.x({ call: 'setMatter', input: { id: 'test', value: 'test' } });
      }
    };
    app.x({ call: 'setMinds', input: appMinds });
    return (
      <View>
        <Text>Oboros Editor</Text>
        <Button title='update' onPress={() => {
          app.x({ call: 'setTestState' });
          o.x({ call: 'render' });
        }}/>
        <Text>{JSON.stringify(app._o.toJS())}</Text>
      </View>
    )
  },
}

export default Views;