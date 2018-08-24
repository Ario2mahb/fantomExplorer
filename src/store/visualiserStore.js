import fetch from 'node-fetch';
import config from '../config'

let Dispatcher = require('flux').Dispatcher
let Emitter = require('events').EventEmitter

let dispatcher = new Dispatcher()
let emitter = new Emitter()

var Store = () => {

  dispatcher.register(function(payload) {
    switch (payload.type) {
    case 'consensusEvents':
      this.consensusEvents(payload);
      break;
    case 'rounds':
      this.rounds(payload);
      break;
    default:
      emitter.emit(payload.type, 'Invalid event dispatched', null)
      break;
    }

  }.bind(this))

  this.consensusEvents = function(payload) {
    let url = 'graphql/'

    let postData = {
      query: `
      {
        consensusEvents {
          edges {
            cursor
            node {
              hash
              payload
            }
          }
        }
      }`
    }

    this.callApi(url,
      'POST',
      postData,
      payload)
  }

  this.rounds = function(payload) {
    let url = 'graphql/'

    let postData = {
      query: `
      {
        rounds {
          edges {
            cursor
            node {
              round_number
              payload
            }
          }
        }
      }`
    }

    this.callApi(url,
      'POST',
      postData,
      payload)
  }

  this.callApi = function(url, method, postData, payload) {
    var call = config.visualiserGQL+url

    fetch(call, {
      method: method,
      body: JSON.stringify(postData),
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
