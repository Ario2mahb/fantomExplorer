import fetch from 'node-fetch';
import config from '../config'

let Dispatcher = require('flux').Dispatcher
let Emitter = require('events').EventEmitter

let dispatcher = new Dispatcher()
let emitter = new Emitter()

var Store = () => {

  dispatcher.register(function(payload) {
    switch (payload.type) {
    case 'account':
      this.account(payload);
      break;
    case 'transaction':
      this.transaction(payload);
      break;
    default:
      emitter.emit(payload.type, 'Invalid event dispatched', null)
      break;
    }
  }.bind(this))

  this.account = function(payload) {
    var url = 'account/'+payload.content.search

    this.callApi(url,
      'GET',
      null,
      payload)
  }

  this.transaction = function(payload) {
    var url = 'transaction/'+payload.content.search

    this.callApi(url,
      'GET',
      null,
      payload)
  }

  this.callApi = function(url, method, postData, payload) {
    var call = config.explorerNode+url

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
