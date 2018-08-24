import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Big from 'big.js';

const styles = theme => ({
  paperHeading: {
    padding: theme.spacing.unit * 2,
    textAlign: 'left',
    color: theme.palette.text.secondary,
    display: 'flex',
    marginBottom: 8
  },
  heading: {
    paddingBottom: 12
  },
  heading2: {
    paddingTop: 24,
    paddingBottom: 12
  },
  inline: {
    display: 'inline-block',
    padding: 4
  },
  outlined: {
    border: '1px solid #e1e1e1',
    padding: '3px 6px'
  },
  dottedUnderline: {
    borderBottom: '1px dashed #999',
    margin: '10px 0px'
  }
});

function ExplorerSearch(props) {
  const { classes } = props;

  if(props.activeAccount == null) {
    return <div>NOPE</div>
  }

  return (
    <div>
      <Paper className={classes.paperHeading}>
        <Grid container>
          <Grid item xs={12}>
            <Typography className={classes.heading} variant="display1">
              Account
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <div  className={classes.outlined}>
              <Typography className={classes.inline} variant="body2" >
                Address
              </Typography>
              <Typography className={classes.inline} variant="body1">
                {props.activeAccount.address}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Paper>
      <Paper className={classes.paperHeading}>
        <Grid container>
          <Grid item xs={12}>
            <Typography className={classes.heading} variant="display1">
              Summary
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.dottedUnderline}></Grid>
          <Grid item xs={4} align="left">
            <Typography variant="body1">
              Balance
            </Typography>
          </Grid>
          <Grid item xs={8} align="right">
            <Typography variant="body1" wrap="nowrap">
              {Big(props.activeAccount.balance/10000000000000000).toFixed(2)+" Eth"}
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.dottedUnderline}></Grid>
          <Grid item xs={4} align="left">
            <Typography variant="body1">
              Nonce
            </Typography>
          </Grid>
          <Grid item xs={8} align="right">
            <Typography variant="body1" wrap="nowrap">
            {props.activeAccount.nonce}
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.dottedUnderline}></Grid>
        </Grid>
      </Paper>
    </div>
  );
}

ExplorerSearch.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ExplorerSearch);
