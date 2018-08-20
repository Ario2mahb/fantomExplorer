import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import SearchComponent from '../components/explorerSearch.js'
import TransactionComponent from '../components/explorerTransaction.js'
import AccountComponent from '../components/explorerAccount.js'
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


const createReactClass = require('create-react-class')

let explorerEmitter = require('../store/explorerStore.js').default.emitter
let explorerDispatcher = require('../store/explorerStore.js').default.dispatcher

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 24
  },
  search: {
    marginTop: '10%',
    maxWidth: '400px',
    margin: '0 auto'
  }
});

let Explorer = createReactClass({
  getInitialState() {
    let searchValue = ''
    let initialSearch = false
    if(this.props.match.params.id) {
      searchValue = this.props.match.params.id
      initialSearch = true
    }

    return {
      loading: false,
      searchValue: searchValue,
      activeAccount: null,
      activeTransaction: null,
      initialSearch: initialSearch
    };
  },

  componentWillMount() {
    explorerEmitter.removeAllListeners('account');
    explorerEmitter.removeAllListeners('transaction');

    explorerEmitter.on('account', this.accountReturned);
    explorerEmitter.on('transaction', this.transactionReturned);
  },

  componentDidMount() {
    if(this.state.initialSearch) {
      this.onSearch()
    }
  },

  render() {
    const { classes } = this.props;

    let view = <Typography className={classes.search} variant='display1'>Search for a Transaction or Account</Typography>

    if(this.state.activeTransaction!=null) {
      view = <TransactionComponent activeTransaction={this.state.activeTransaction} />
    }

    if(this.state.activeAccount != null) {
      view =  <AccountComponent activeAccount={this.state.activeAccount} />
    }

    return (
      <div className={classes.root}>
        <Grid container spacing={8} direction="row" justify="center" alignItems="flex-start">
          <Grid item xs={12} lg={8} xl={7}>
            <SearchComponent
              loading={this.state.loading}
              handleChange={this.handleChange}
              onKeyDown={this.onKeyDown}
              searchValue={this.state.searchValue}
              onSearch={this.onSearch}/>
          </Grid>
          <Grid item xs={12} lg={8} xl={7}>
            {view}
          </Grid>
        </Grid>
      </div>
    );
  },

  onKeyDown(event) {
    if (event.which == 13) {
      this.onSearch()
    }
  },

  handleChange (event) {
    if(event != null && event.target != null) {
      this.setState({
        [event.target.id]: event.target.value
      });
    }
  },

  onSearch() {
    if(this.validateSearchValue()) {
      this.setState({loading: true, activeTransaction: null, activeAccount: null});
      var content = { search: this.state.searchValue };
      explorerDispatcher.dispatch({type: 'account', content });
      explorerDispatcher.dispatch({type: 'transaction', content });
    }
  },

  accountReturned(error, data) {
    if(data.balance != 0 && data.account != 0) {
      this.setState({activeAccount: data})
    }
  },

  transactionReturned(error, data) {
    this.setState({activeTransaction: data})
  },

  validateSearchValue() {
    return true;
  }
})

Explorer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Explorer);
