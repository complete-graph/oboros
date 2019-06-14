const O = require('oboros');

const editorMinds = {
  createNewApp: () => new O(),
  loadApp: ({ o, input: app }) => {
    o.x({ call: 'setMatter', input: { id: 'app', value: app }});
  },
}

const o = new O();
o.x({ call: 'setMinds', input: editorMinds });
const newApp = o.x({ call: 'createNewApp' });
o.x({ call: 'loadApp', input: newApp });
console.log(o._o.toJS());