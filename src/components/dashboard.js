import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import RoundsWidget from './roundsWidget.js'
import EventsWidget from './eventsWidget.js'
import TransactionsWidget from './transactionsWidget.js'
import StatusWidget from './statusWidget.js'

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 24
  },
  paperHeading: {
    padding: theme.spacing.unit * 2,
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minHeight: 180
  },
});

function Dashboard(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Paper className={classes.paperHeading}>
            <Typography variant="display1">
              Node Performance Statistics
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
          <Paper className={classes.paper}>
            <StatusWidget nodeData={props.nodeData} />
          </Paper>
        </Grid>
        <Grid item xs={6} sm={4} md={4} lg={2} xl={2}>
          <Paper className={classes.paper}>
            <RoundsWidget nodeData={props.nodeData} />
          </Paper>
        </Grid>
        <Grid item xs={6} sm={4} md={4} lg={2} xl={2}>
          <Paper className={classes.paper}>
            <TransactionsWidget nodeData={props.nodeData} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={2} xl={2}>
          <Paper className={classes.paper}>
            <EventsWidget nodeData={props.nodeData} />
          </Paper>
        </Grid>   
      </Grid>
    </div>
  );
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  nodeData: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
