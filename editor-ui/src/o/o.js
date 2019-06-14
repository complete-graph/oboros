import O from 'oboros';
import editorMinds from 'oboros-editor';
import editorUIMinds from './minds';

const ox = () => {
  const o = new O();
  o.x({ call: 'setMinds', input: editorMinds });
  o.x({ call: 'setMinds', input: editorUIMinds });
  const newApp = o.x({ call: 'createNewApp' });
  o.x({ call: 'loadApp', input: newApp });
  o.x({ call: 'createUI' });
}

export default ox;