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
    paddingBottom: 12
  },
  value: {
    padding: 2
  },
  valuePositive: {
    padding: 2,
    color: '#80cd42'
  },
  valueNegative: {
    padding: 2,
    color: '#B00020'
  },
  dottedUnderline: {
    borderBottom: '1px dashed #999'
  }
});

function StatusWidget(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={8}>
        <Grid item xs={12} sm={6}>
          <Grid item xs={12}>
            <Typography className={classes.heading} variant="subheading" align='left'>
              Status
            </Typography>
          </Grid>
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <Typography className={classes.value} variant="headline" align='left'>
                {'Current Status'}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography className={props.nodeData.state == 'Gossiping' ? classes.valuePositive : classes.valueNegative} variant="display2" align='left'>
                {props.nodeData.state}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid item xs={12} className={classes.dottedUnderline}>
          </Grid>
          <Grid container spacing={0}>
            <Grid item xs={6}>
              <Typography variant='body2' align='left'>
                Peers
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='body2' align='right'>
                {props.nodeData.num_peers}
              </Typography>
            </Grid>
            <Grid item xs={12} className={classes.dottedUnderline}>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='body2' align='left'>
                Sync Limit
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='body2' align='right'>
                {props.nodeData.sync_limit}
              </Typography>
            </Grid>
            <Grid item xs={12} className={classes.dottedUnderline}>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='body2' align='left'>
                Sync Rate
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='body2' align='right'>
                {props.nodeData.sync_rate}
              </Typography>
            </Grid>
            <Grid item xs={12} className={classes.dottedUnderline}>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='body2' align='left'>
                Heartbeat
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='body2' align='right'>
                {props.nodeData.heartbeat}
              </Typography>
            </Grid>
            <Grid item xs={12} className={classes.dottedUnderline}>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='body2' align='left'>
                Last Block
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='body2' align='right'>
                {props.nodeData.last_block_index}
              </Typography>
            </Grid>
            <Grid item xs={12} className={classes.dottedUnderline}>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='body2' align='left'>
                Uptime (seconds)
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='body2' align='right'>
                {props.nodeData.time_elapsed}
              </Typography>
            </Grid>
            <Grid item xs={12} className={classes.dottedUnderline}>
            </Grid>
          </Grid>

        </Grid>
      </Grid>
    </div>
  );
}

StatusWidget.propTypes = {
  classes: PropTypes.object.isRequired,
  nodeData: PropTypes.object.isRequired
};

export default withStyles(styles)(StatusWidget);
