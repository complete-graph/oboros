const { OrderedMap: Map, List } = require('immutable');

class O {
  constructor() {
    this.coreMinds = {
      getMatter: ({ o, input: id }) => o._o.getIn([ 'matter', id ]),
      setMatter: ({ o, input: { id, value } }) =>  o._o = o._o.setIn([ 'matter', id ], value),
      setMind: ({ o, input: { id, value } }) => o._o = o._o.setIn([ 'mind', id ], value),
      _updateTime: ({ input: { o, ...e } }) => {
        const record = { ...e, t: Date.now() }
        o._o = o._o.set('time', o._o.get('time').push(record));
      },
    }
    this._o = Map({
      x: (event) => { /// x( event: { o, call, input } )
        event.o._x({ call: '_updateTime', input: event });
        return event.o._x(event);
      },
      mind: Map({ ...this.coreMinds }),
      matter: Map({}),
      time: List([]),
    })
  }
  _x(event) {
    return this._o.getIn([ 'mind', event.call ])({ ...event, o: this });
  }
  x(event) {
    return this._o.get('x')({ ...event, o: this });
  }
}

module.exports = O;