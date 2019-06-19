import React from 'react';
import { View, ScrollView, Text, TextInput, Button, StyleSheet } from 'react-native';
import brace from 'brace';
import CodeEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/solarized_dark';

const Main = ({ o }) => {
  return (
    <View>
      <Text style={styles.heading}>Oboros Editor</Text>
      <View style={{ flexDirection: 'row', alignItems: 'stretch' }}>
        <Matter o={o} />
        <Time o={o} />
        <Mind o={o} />
        <MindEditor o={o} />
      </View>
    </View>
  )
}

const Matter = ({ o }) => {
  const app = o.x({ call: 'getApp' });
  const matter = app._o.matter;
  const matterViews = Object.entries(matter).map(([ id, value ], i) => {
    return (
      <View key={i} style={styles.text}>
        <Text>{id} : {JSON.stringify(value)}</Text>
      </View>
    )
  })
  return (
    <View>
      <Text style={styles.subHeading}>Matter</Text>
      {matterViews}
    </View>
  )
}

const Time = ({ o }) => {
  const app = o.x({ call: 'getApp' });
  const events = app._o.time;
  const eventViews = events.map((e, i) => {
    return (
      <View key={i} style={styles.text}>
        <Text>{e.call} - {e.t}</Text>
        <Text>input: {JSON.stringify(e.input)}</Text>
      </View>
    )
  })
  return (
    <View>
      <Text style={styles.subHeading}>Time</Text>
      {eventViews}
    </View>
  )
}

class Mind extends React.Component {
  constructor() {
    super();
    this.state = { text: '{}' };
  }
  render() {
    const { o } = this.props;
    const app = o.x({ call: 'getApp' });
    const mind = app._o.mind;
    const mindViews = Object.entries(mind).map(([ id, value ], i) => {
      return (
        <View key={i} style={styles.text}>
          <Button title={id} onPress={() => callMind(o, id, this.state.text)} />
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={(text) => this.setState({ text })}
            value={this.state.text}
          />
          <Text>{id} : {value.toString()}</Text>
        </View>
      )
    })
    return (
      <View>
        <Text style={styles.subHeading}>Mind</Text>
        <ScrollView style={styles.scrollLong}>
          {mindViews}
        </ScrollView>
      </View>
    )
  }
}

const callMind = (o, id, value) => {
  o.x({ call: 'app.callMind', input: { id, value } });
  o.x({ call: 'render' });
}

class MindEditor extends React.Component {
  constructor() {
    super();
    this.state = { id: '', text: '', js: '', oLang: '' };
  }

  jsToO(js) {

  }

  oChange(oLang) {
    this.setState({ oLang, js: oLang.replace('o', 'o.x({ call: ') });
  }

  jsChange(js) {
    this.setState({ js, oLang: js.replace('const', '') });
  }

  render() {
    const { o } = this.props;
    return (
      <View>
        <Text style={styles.subHeading}>Mind Editor</Text>
        <View style={styles.editor}>
          <Button title='update' onPress={() => loadMind(o, this.state.id, this.state.text)} />
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={(id) => this.setState({ ...this.state, id })}
            value={this.state.id}
          />
          <CodeEditor
            name="o-lang-editor"
            theme="solarized_dark"
            editorProps={{$blockScrolling: true}}
            value={this.state.oLang}
            onChange={(text) => this.oChange(text)}
          />
          <CodeEditor
            name="javascript-editor"
            mode="javascript"
            theme="solarized_dark"
            editorProps={{$blockScrolling: true}}
            value={this.state.js}
            onChange={(text) => this.jsChange(text)}
          />
        </View>
      </View>
    )
  }
}

const loadMind = (o, id, value) => {
  o.x({ call: 'app.loadMind', input: { id, value } });
  o.x({ call: 'render' });
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
  scroll: {
    maxHeight: '13rem',
    overflow: 'hidden',
  },
  scrollLong: {
    maxHeight: '35rem',
    overflow: 'hidden',
  },
  editor: {
    height: '35rem',
    width: '20rem'
  }
})

export default Main;