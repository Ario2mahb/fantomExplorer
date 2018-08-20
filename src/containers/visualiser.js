import React from 'react'
import VisualiserComponent from '../components/visualiser.js'
import visualiserData from './visualiserData.js';
const createReactClass = require('create-react-class')


let Visualiser = createReactClass({
  getInitialState() {
    const roundsData = visualiserData.roundsData
    const blocksData = visualiserData.blocksData
    const consensusEventsData = visualiserData.consensusEventsData

    return {
      roundsData,
      blocksData,
      consensusEventsData
    };
  },

  render() {
    return (
      <VisualiserComponent
        roundsData={this.state.roundsData}
        blocksData={this.state.blocksData}
        consensusEventsData={this.state.consensusEventsData}
      />
    );
  }
})

export default (Visualiser);
