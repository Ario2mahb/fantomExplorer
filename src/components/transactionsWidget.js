import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 12
  },
  heading: {
    paddingBottom: 16
  },
  value: {
    display: 'inline-block',
    padding: 2
  },
  boxed: {
    background: '#dedede',
    color: '#0f1213',
    width: 'fit-content',
    padding: '2px 4px'
  }
});

function TransactionsWidget(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Typography className={classes.heading} variant="subheading" align='left'>
              Transactions
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.value} variant="display2" align='right'>
              {props.nodeData.consensus_transactions}
          </Typography>
          <Typography className={classes.value} variant="display3" align='left'>
              {'TXNS'}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <div>
            <Typography className={classes.boxed} variant="body1" align='left'>
                {props.nodeData.transactions_per_second+' txns p/s'}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

TransactionsWidget.propTypes = {
  classes: PropTypes.object.isRequired,
  nodeData: PropTypes.object.isRequired
};

export default withStyles(styles)(TransactionsWidget);
