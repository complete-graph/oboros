import React from 'react';
import { View, ScrollView, Text as ReactText, Button as ReactButton, StyleSheet } from 'react-native';
import CodeEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/solarized_dark';

import prettier from "prettier/standalone";
import babel from "prettier/parser-babylon";
const prettierPlugins = [ babel ];
const formatJS = (jsString) => prettier.format(jsString, { parser: 'babel', plugins: prettierPlugins });

const Main = ({ o }) => {
  return (
    <View style={styles.main}>
      <Header>O-Arc</Header>
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
      <View key={i} style={styles.item}>
        <Text>{id} : {JSON.stringify(value)}</Text>
      </View>
    )
  })
  return (
    <View style={styles.window}>
      <SubHeader>Matter</SubHeader>
      <View style={styles.textArea}>
        {matterViews}
      </View>
    </View>
  )
}

const Time = ({ o }) => {
  const app = o.x({ call: 'getApp' });
  const events = app._o.time;
  const eventViews = events.map((e, i) => {
    return (
      <View key={i} style={styles.item}>
        <Text>{e.call} - {e.t}</Text>
        <Text>input: {JSON.stringify(e.input)}</Text>
      </View>
    )
  })
  return (
    <View style={styles.window}>
      <SubHeader>Time</SubHeader>
      <View style={styles.textArea}>
        {eventViews}
      </View>
    </View>
  )
}

class Mind extends React.Component {
  constructor() {
    super();
    this.state = { text: '{  }' };
  }
  render() {
    const { o } = this.props;
    const app = o.x({ call: 'getApp' });
    const mind = app._o.mind;
    const mindViews = Object.entries(mind).reverse().map(([ id, value ], i) => {
      return (
        <View key={i} style={styles.item}>
          <SubSubHeader>{id}</SubSubHeader>
          <Button title={id} onPress={() => callMind(o, id, this.state.text)} uppercase={false} />
          <Text>Input</Text>
          <CodeEditor
            mode="javascript"
            theme="solarized_dark"
            showGutter={false}
            wrapEnabled={true}
            editorProps={{$blockScrolling: true}}
            minLines={3}
            maxLines={5}
            value={this.state.text}
            onChange={(text) => this.setState({ text })}
          />
          <Text>Code</Text>
          <CodeEditor
            mode="javascript"
            theme="solarized_dark"
            showGutter={false}
            wrapEnabled={true}
            editorProps={{$blockScrolling: true}}
            value={formatJS(value.toString())}
            readOnly={true}
            maxLines={5}
          />
        </View>
      )
    })
    return (
      <View style={styles.window}>
        <SubHeader>Mind</SubHeader>
        <ScrollView style={styles.scrollLong} indicatorStyle='white'>
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

  oChange(oLang) {
    // mind macro
    let js = oLang.replace(
      /\bmind\b/, 
      '({ o, input, ...event }) =>'
    );
    // x macro
    // o.x macro
    const xRegex = /\ *x [^\s]* .*/;
    let jsLines = js.split(/\r?\n/);
    jsLines = jsLines.map((line) => {
      const xMatch = xRegex.test(line);
      if(xMatch) { // found x match
        const symbols = line.split(' ').reverse();
        const mindId = symbols[1];
        const input = symbols[0];
        line = `o.x({ call: '${mindId}', input: ${input} });`;
      }
      return line;
    })
    js = jsLines.join('\n');

    this.setState({ oLang, js });
  }

  jsChange(js) {
    // mind macro
    let oLang = js.replace(/\( *{ *\o *,.*\=>/, 'mind');
    // o.x macro
    const beforeString = "o.x({ call: '";
    const middleString = "', input: ";
    const endString =  " });"
    let oLangLines = oLang.split(/\r?\n/);
    oLangLines = oLangLines.map((line) => {
      const beforeStringIndex = line.indexOf(beforeString);
      const middleStringIndex = line.indexOf(middleString);
      const endStringIndex = line.indexOf(endString);
      if(beforeStringIndex > -1 && middleStringIndex > -1) { // found o.x match
        const mindIdStartIndex = beforeString.length;
        const mindIdEndIndex = middleStringIndex;
        const mindId = line.substring(mindIdStartIndex, mindIdEndIndex);
        const inputStartIndex = middleStringIndex + middleString.length;
        const inputEndIndex = endStringIndex;
        const input = line.substring(inputStartIndex, inputEndIndex);
        line = line.replace(beforeString, 'x ');
        line = line.replace(middleString, ' ');
        line = line.replace(endString, '');
      }
      return line;
    })
    oLang = oLangLines.join('\n');

    this.setState({ js, oLang });
  }

  render() {
    const { o } = this.props;
    return (
      <View style={styles.window}>
        <SubHeader>Mind Editor</SubHeader>
        <View style={styles.editor}>
          <Button title='update' onPress={() => loadMind(o, this.state.id, this.state.js)} />
          <Text>Mind</Text>
          <CodeEditor
            mode="javascript"
            theme="solarized_dark"
            showGutter={false}
            wrapEnabled={true}
            editorProps={{$blockScrolling: true}}
            minLines={3}
            maxLines={5}
            value={this.state.id}
            onChange={(id) => this.setState({ ...this.state, id })}
          />
          <Text>O Lang</Text>
          <CodeEditor
            name="o-lang-editor"
            theme="solarized_dark"
            tabSize={2}
            editorProps={{$blockScrolling: true}}
            value={this.state.oLang}
            onChange={(text) => this.oChange(text)}
          />
          <Text>JS</Text>
          <CodeEditor
            name="javascript-editor"
            mode="javascript"
            theme="solarized_dark"
            tabSize={2}
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

const Text = (props) => <ReactText style={styles.text}>{props.children}</ReactText>

const Header = (props) => <ReactText style={styles.header}>{props.children}</ReactText>

const SubHeader = (props) => <ReactText style={styles.subHeader}>{props.children}</ReactText>

const SubSubHeader = (props) => <ReactText style={styles.subSubHeader}>{props.children}</ReactText>

const Button = (props) => <ReactButton style={styles.button} color='#038796' {...props}/>


const styles = StyleSheet.create({
  main: {
    height: '100vh',
    width: '100vw',
    backgroundColor: '#01313F',
  },
  window: {
    margin: '0.5rem'
  },
  textArea: {
    backgroundColor: '#002B36',
  },
  header: {
    color: 'gray',
    fontSize: '2rem'
  },
  subHeader: {
    color: 'gray',
    fontSize: '1.4rem'
  },
  subSubHeader: {
    color: 'white',
    fontSize: '1.2rem'
  },
  text: {
    color: 'white',
  },
  item: {
    marginTop: '1rem',
    margin: 10
  },
  button: {
    backgroundColor: 'green',
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
  },
})

export default Main;