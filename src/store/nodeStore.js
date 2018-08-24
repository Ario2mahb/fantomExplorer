import fetch from 'node-fetch';
import config from '../config'

let Dispatcher = require('flux').Dispatcher
let Emitter = require('events').EventEmitter

let dispatcher = new Dispatcher()
let emitter = new Emitter()

var Store = () => {

  dispatcher.register(function(payload) {
    switch (payload.type) {
    case 'participants':
      this.participants(payload);
      break;
    case 'stats':
      this.stats(payload);
      break;
    default:
      emitter.emit(payload.type, 'Invalid event dispatched', null)
      break;
    }

  }.bind(this))

  this.participants = function(payload) {
    var url = 'participants/'

    this.callApi(url,
      'GET',
      null,
      payload)
  }

  this.stats = function(payload) {
    var url = 'stats/'

    this.callApi(url,
      'GET',
      null,
      payload)
  }

  this.callApi = function(url, method, postData, payload) {
    var call = config.node+url

    fetch(call, {
      method: method,
      body: postData,
      headers: { 'Content-Type': 'application/json'},
    })
    .then(res => res.json())
    .then((res) => {
      emitter.emit(payload.type, null, res)
    })
    .catch((error) => {
      emitter.emit(payload.type, error, null)
    });
  }
}

var store = new Store()

export default ({
  store: store,
  dispatcher: dispatcher,
  emitter: emitter
})
