const editorMinds = {
  'app.executeMind': () => null,
  'app.loadMind': ({ o, input: { id, value: mindString } }) => {
    const mind = o.x({ call: 'parseJsString', input: mindString });
    const app = o.x({ call: 'getApp' });
    app.x({ call: 'setMind', input: { id, value: mind }});
  },
  parseJsString: ({ input: jsString }) => Function('"use strict";return (' + jsString + ')')(),
  getApp: ({ o }) => o.x({ call: 'getMatter', input: 'app' }),
  loadApp: ({ o, input: app }) => {
    o.x({ call: 'setMatter', input: { id: 'app', value: app }});
  },
  createNewApp: () => new O(),
}

module.exports = editorMinds;

// Demo
const O = require('oboros');
const o = new O();
o.x({ call: 'setMinds', input: editorMinds });
const newApp = o.x({ call: 'createNewApp' });
o.x({ call: 'loadApp', input: newApp });
const app = o.x({ call: 'getApp' });
const appMinds = {
  setTestState: ({ o }) => {
    o.x({ call: 'setMatter', input: { id: 'test', value: 'test' } });
  }
}
app.x({ call: 'setMinds', input: appMinds });
app.x({ call: 'setTestState' });
o.x({ call: 'app.loadMind', input: {
  id: 'hello',
  value: `() => console.log('App says hello')`,
}});
app.x({ call: 'hello' });
console.log('');
console.log('Editor');
console.log(o._o.toJS());
console.log('');
console.log('App');
console.log(app._o.toJS());
