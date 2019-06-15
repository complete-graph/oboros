import O from 'oboros';
import editorMinds from 'oboros-editor';
import editorUIMinds from './minds';

const ox = () => {
  const o = new O();
  o.x({ call: 'setMinds', input: editorMinds });
  o.x({ call: 'setMinds', input: editorUIMinds });
  const newApp = o.x({ call: 'createNewApp' });
  o.x({ call: 'loadApp', input: newApp });

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

  o.x({ call: 'createUI' });
}

export default ox;