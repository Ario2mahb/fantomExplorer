import React from 'react'
import VisualiserComponent from '../components/visualiser.js'
const createReactClass = require('create-react-class')

let visualiserEmitter = require('../store/visualiserStore.js').default.emitter
let visualiserDispatcher = require('../store/visualiserStore.js').default.dispatcher

let Visualiser = createReactClass({
  getInitialState() {
    // const roundsData = visualiserData.roundsData
    // const blocksData = visualiserData.blocksData
    // const consensusEventsData = visualiserData.consensusEventsData

    return {
      roundsData: [],
      blocksData: [],
      consensusEventsData: []
    };
  },

  componentWillMount() {
    visualiserEmitter.removeAllListeners('consensusEvents');
    visualiserEmitter.removeAllListeners('rounds');

    visualiserEmitter.on('consensusEvents', this.consensusEventsReturned);
    visualiserEmitter.on('rounds', this.roundsReturned);
  },

  componentDidMount() {
    let content = {}
    visualiserDispatcher.dispatch({type: 'consensusEvents', content });
    visualiserDispatcher.dispatch({type: 'rounds', content });
  },

  render() {
    return (
      <VisualiserComponent
        roundsData={this.state.roundsData}
        blocksData={this.state.blocksData}
        consensusEventsData={this.state.consensusEventsData}
      />
    );
  },

  consensusEventsReturned(error, response) {
    if(error) {
      console.log(error)
    }

    if(response) {
      this.setState({consensusEventsData: response.data.consensusEvents.edges})
    }
  },

  roundsReturned(error, response) {
    if(error) {
      console.log(error)
    }

    if(response) {
      this.setState({roundsData: response.data.rounds.edges})
    }
  },
})

export default (Visualiser);
