const O = require('oboros');

const editorMinds = {
  'app.callMind': ({ o, input: { id, value: eventString } }) => {
    const event = o.x({ call: 'parseJS', input: eventString });
    const app = o.x({ call: 'getApp' });
    app.x({ call: id, ...event });
  },
  'app.loadMind': ({ o, input: { id, value: mindString } }) => {
    const mind = o.x({ call: 'parseJS', input: mindString });
    const app = o.x({ call: 'getApp' });
    app.x({ call: 'setMind', input: { id, value: mind }});
  },
  parseJS: ({ input: jsString }) => Function('"use strict";return (' + jsString + ')')(),
  getApp: ({ o }) => o.x({ call: 'getMatter', input: 'app' }),
  loadApp: ({ o, input: app }) => {
    o.x({ call: 'setMatter', input: { id: 'app', value: app }});
  },
  createNewApp: () => new O(),
}

module.exports = editorMinds;