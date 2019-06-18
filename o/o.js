class O {
  
  constructor() {
    this._create_o();
    this._injectCoreMinds();
  }

  _create_o() {
    this._o = {

      mind: {},

      matter: {},

      time: [],

    }
  }

  _injectCoreMinds() {
    const coreMinds = {

      x: ({ o, ...event }) => {
        o._x({ call: '_updateTime', input: { o, ...event } });
        return o._x(event);
      },
      
      _updateTime: ({ input: { o, ...event } }) => o._o.time.unshift({ ...event, t: Date.now() }),

      setMind: ({ o, input: { id, value } }) => o._o.mind[id] = value,

      setMinds: ({ o, input: mindMap }) => o._o.mind = { ...o._o.mind, ...mindMap },

      setMatter: ({ o, input: { id, value } }) => o._o.matter[id] = value,

      getMatter: ({ o, input: id }) => o._o.matter[id],

    }
    this._o.mind = { ...this._o.mind, ...coreMinds };
  }

  x(event) {
    return this._o.mind.x({ ...event, o: this });
  }

  _x(event) {
    return this._o.mind[event.call]({ ...event, o: this });
  }

}

module.exports = O;