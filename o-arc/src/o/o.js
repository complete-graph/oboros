import O from 'oboros';
import architectMinds from 'o-arc-core';
import architectUIMinds from './minds';

const ox = () => {
  const o = new O();
  o.x({ call: 'setMinds', input: architectMinds });
  o.x({ call: 'setMinds', input: architectUIMinds });
  const newApp = o.x({ call: 'createNewApp' });
  o.x({ call: 'loadApp', input: newApp });
  setupApp(o);
  o.x({ call: 'createUI' });
}

const setupApp = (o) => {
  const app = o.x({ call: 'getApp' });
  app.x({ call: 'setMatter', input: { id: 'count', value: 0 } });
  const appMinds = {
    count: ({ o }) => {
      let count = o.x({ call: 'getMatter', input: 'count' });
      count = count + 1;
      o.x({ call: 'setMatter', input: { id: 'count', value: count } });
    }
  };
  app.x({ call: 'setMinds', input: appMinds });
}

export default ox;