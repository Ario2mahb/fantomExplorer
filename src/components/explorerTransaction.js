import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Search from '@material-ui/icons/Search';

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

  if(props.activeTransaction == null) {
    return <div>NOPE</div>
  }

  return (
    <div>
      <Paper className={classes.paperHeading}>
        <Grid container>
          <Grid item xs={12}>
            <Typography className={classes.heading} variant="display1">
              Transaction
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <div  className={classes.outlined}>
              <Typography className={classes.inline} variant="body2" >
                Transaction
              </Typography>
              <Typography className={classes.inline} variant="body1">
                {props.activeTransaction.transactionHash}
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
              From
            </Typography>
          </Grid>
          <Grid item xs={8} align="right">
            <Typography variant="body1" wrap="nowrap">
              {props.activeTransaction.from}
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.dottedUnderline}></Grid>
          <Grid item xs={4} align="left">
            <Typography variant="body1">
              To
            </Typography>
          </Grid>
          <Grid item xs={8} align="right">
            <Typography variant="body1" wrap="nowrap">
            {props.activeTransaction.to}
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.dottedUnderline}></Grid>
          <Grid item xs={4} align="left">
            <Typography variant="body1">
              Gas Used
            </Typography>
          </Grid>
          <Grid item xs={8} align="right">
            <Typography variant="body1" wrap="nowrap">
            {props.activeTransaction.gasUsed+" gwei"}
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.dottedUnderline}></Grid>
          <Grid item xs={4} align="left">
            <Typography variant="body1">
              Cumulative Gas Used
            </Typography>
          </Grid>
          <Grid item xs={8} align="right">
            <Typography variant="body1" wrap="nowrap">
            {props.activeTransaction.cumulativeGasUsed+" gwei"}
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.dottedUnderline}></Grid>
          <Grid item xs={4} align="left">
            <Typography variant="body1">
              Contract Address
            </Typography>
          </Grid>
          <Grid item xs={8} align="right">
            <Typography variant="body1" wrap="nowrap">
            {props.activeTransaction.contractAddress}
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.dottedUnderline}></Grid>
          <Grid item xs={4} align="left">
            <Typography variant="body1">
              Root
            </Typography>
          </Grid>
          <Grid item xs={8} align="right">
            <Typography variant="body1" wrap="nowrap">
            {props.activeTransaction.root}
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
