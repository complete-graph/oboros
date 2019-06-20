const O = require('oboros');

const architectMinds = {
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
  hydrateApp: ({ o, input: dehydratedAppState }) => {
    const hydratedMinds = {};
    Object.entries(dehydratedAppState.mind).forEach( ([ id, mindString ]) => {
      const mindFunction = o.x({ call: 'parseJS', input: mindString });
      hydratedMinds[id] = mindFunction;
    })
    const hydrateAppState = { ...dehydratedAppState, mind: hydratedMinds };
    const hydratedApp = new O();
    hydratedApp._o = hydrateAppState;
    return hydratedApp;
  },
  dehydrateApp: ({ input: app }) => {
    const mindStrings = {};
    Object.entries(app._o.mind).forEach( ([ id, mind ]) => mindStrings[id] = mind.toString());
    const dehydratedApp = { ...app._o, mind: mindStrings };
    return dehydratedApp;
  },
  parseJS: ({ input: jsString }) => Function('"use strict";return (' + jsString + ')')(),
  getApp: ({ o }) => o.x({ call: 'getMatter', input: 'app' }),
  setApp: ({ o, input: app }) => {
    o.x({ call: 'setMatter', input: { id: 'app', value: app }});
  },
  createNewApp: () => new O(),
}

module.exports = architectMinds;