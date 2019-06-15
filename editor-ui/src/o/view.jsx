import React from 'react';
import { View, ScrollView, Text, Button, StyleSheet } from 'react-native';


const Main = ({ o }) => {
  return (
    <View>
      <Text style={styles.heading}>Oboros Editor</Text>
      <Matter o={o} />
      <Time o={o} />
      <Update o={o} />
    </View>
  )
}

const Matter = ({ o }) => {
  const app = o.x({ call: 'getApp' });
  const matter = app._o.get('matter').toJS();
  const matterViews = Object.entries(matter).map(([ id, value ], i) => {
    return (
      <View key={i} style={styles.text}>
        <Text>{id} : {JSON.stringify(value)}</Text>
      </View>
    )
  })
  return (
    <ScrollView style={styles.tile}>
      <Text style={styles.subHeading}>Matter</Text>
      {matterViews}
    </ScrollView>
  )
}

const Time = ({ o }) => {
  const app = o.x({ call: 'getApp' });
  const events = app._o.get('time').reverse().toJS();
  const eventViews = events.map((e, i) => {
    return (
      <View key={i} style={styles.text}>
        <Text>{e.call} - {e.t}</Text>
        <Text>input: {JSON.stringify(e.input)}</Text>
      </View>
    )
  })
  return (
    <ScrollView style={styles.tile}>
      <Text style={styles.subHeading}>Time</Text>
      {eventViews}
    </ScrollView>
  )
}

const Update = ({ o }) => {
  return (
    <Button title='update' onPress={() => {
      const app = o.x({ call: 'getApp' });
      app.x({ call: 'count' });
      o.x({ call: 'render' });
    }}/>
  )
}

const styles = StyleSheet.create({
  heading: {
    color: 'gray',
    fontSize: '2rem'
  },
  subHeading: {
    color: 'gray',
    fontSize: '1.4rem'
  },
  text: {
    marginTop: '1rem',
    margin: 10
  },
  tile: {
    maxHeight: '13rem',
    overflow: 'hidden',
  },
})

export default Main;