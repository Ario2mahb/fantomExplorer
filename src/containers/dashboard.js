import React from 'react'
import DashboardComponent from '../components/dashboard.js'
const createReactClass = require('create-react-class')

let Dashboard = createReactClass({
  getInitialState() {
    return {
      nodeData: {
      	"consensus_events": "7569",
      	"consensus_transactions": "504",
      	"events_per_second": "2.12",
      	"heartbeat": "1.00",
      	"id": "1",
      	"last_block_index": "502",
      	"last_consensus_round": "970",
      	"node_current": "1534246960",
      	"node_start": "1534243392",
      	"num_peers": "3",
      	"round_events": "11",
      	"rounds_per_second": "0.27",
      	"state": "Gossiping",
      	"sync_limit": "1000",
      	"sync_rate": "1.00",
      	"time_elapsed": "3567.82",
      	"transaction_pool": "0",
      	"transactions_per_second": "0.14",
      	"undetermined_events": "246"
      }
    };
  },

  render() {
    return (
      <DashboardComponent
        nodeData={this.state.nodeData}
      />
    );
  }
})

export default (Dashboard);
