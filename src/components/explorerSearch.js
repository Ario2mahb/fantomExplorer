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
  root: {
    flexGrow: 1,
    padding: 24
  },
  paperHeading: {
    padding: theme.spacing.unit * 2,
    textAlign: 'left',
    color: theme.palette.text.secondary,
    display: 'flex'
  },
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minHeight: 180
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
    marginTop: 0,
    marginBottom: 0
  },
  heading: {
    display: 'inline-block',
    flexGrow: 1,
  }
});

function ExplorerSearch(props) {
  const { classes } = props;

  return (
    <Paper className={classes.paperHeading}>
      <Typography className={classes.heading} variant="display1">
        Fantom Explorer
      </Typography>
      <TextField
        id="searchValue"
        autoFocus={true}
        type="search"
        placeholder="Transaction, Account ..."
        className={classes.textField}
        margin="normal"
        value={props.searchValue}
        onChange={props.handleChange}
        onKeyDown={props.onKeyDown}
        InputProps={{
          startAdornment: <InputAdornment position="start">
            <Search />
          </InputAdornment>,
        }}
      />
    </Paper>
  );
}

ExplorerSearch.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ExplorerSearch);
