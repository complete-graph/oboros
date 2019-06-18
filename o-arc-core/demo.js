const O = require('oboros');
const architectMinds = require('./o');

const o = new O();
o.x({ call: 'setMinds', input: architectMinds });
const newApp = o.x({ call: 'createNewApp' });
o.x({ call: 'loadApp', input: newApp });
const app = o.x({ call: 'getApp' });
const appMinds = {
  setTestState: ({ o }) => {
    o.x({ call: 'setMatter', input: { id: 'test', value: 'test' } });
  }
};
app.x({ call: 'setMinds', input: appMinds });
app.x({ call: 'setTestState' });
o.x({ call: 'app.loadMind', input: {
  id: 'hello',
  value: `({ o, input }) => { 
    console.log('Hello ' + input + ', from App');
    o.x({ call: 'setMatter', input: { id: 'hello', value: 'HELLO' } });
  }`,
}});
o.x({ call: 'app.callMind', input: {
  id: 'hello',
  value: `{ input: 'Editor' }`,
}})

console.log('');
console.log('Editor');
console.log(o._o);
console.log('');
console.log('App');
console.log(app._o);