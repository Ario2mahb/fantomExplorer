import React from 'react'
import DashboardComponent from '../components/dashboard.js'
const createReactClass = require('create-react-class')

let nodeEmitter = require('../store/nodeStore.js').default.emitter
let nodeDispatcher = require('../store/nodeStore.js').default.dispatcher

let Dashboard = createReactClass({
  getInitialState() {
    return {
      participants: {
        "0x0499D1A9BD84FDA510FA9F41D5DC45566DB3FD38504ABC0AFBE068471BA9E82CB3D20BE76A7F6A6A6246BAE878FCC25C1CFFCDBB323F86E5FAF8459E2E1A9F8336":0,
        "0x04EC501B7E7FC9682FDAA4EA23E965CAA8BCC98CBCE5F08DEDDF69140E17B63DC184693F214C0ACF4460D5DC43B0568B57A22D5D0E89E46D0A28DE0B25D9662001":1
      },
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

  componentWillMount() {
    nodeEmitter.removeAllListeners('participants');
    nodeEmitter.removeAllListeners('stats');

    nodeEmitter.on('participants', this.participantsReturned);
    nodeEmitter.on('stats', this.statsReturned);

    this.refreshData();
  },

  refreshData() {
    this.setState({loading: true});
    var content = {  };
    nodeDispatcher.dispatch({type: 'participants', content });
    nodeDispatcher.dispatch({type: 'stats', content });
  },

  participantsReturned(error, data) {
    if(error) {
      console.log(error)
    }

    if(data) {
      this.setState({participants: data})
    }
  },

  statsReturned(error, data) {
    if(error) {
      console.log(error)
      this.setState({nodeData: {
      	"consensus_events": "N/A",
      	"consensus_transactions": "N/A",
      	"events_per_second": "0",
      	"heartbeat": "N/A",
      	"id": "N/A",
      	"last_block_index": "N/A",
      	"last_consensus_round": "N/A",
      	"node_current": "N/A",
      	"node_start": "N/A",
      	"num_peers": "N/A",
      	"round_events": "N/A",
      	"rounds_per_second": "0",
      	"state": "Offline",
      	"sync_limit": "N/A",
      	"sync_rate": "N/A",
      	"time_elapsed": "N/A",
      	"transaction_pool": "N/A",
      	"transactions_per_second": "0",
      	"undetermined_events": "N/A"
      }})
    }

    if(data) {
      this.setState({nodeData: data})
    }
  },

  render() {
    return (
      <DashboardComponent
        participants={this.state.participants}
        nodeData={this.state.nodeData}
      />
    );
  }
})

export default (Dashboard);
