import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    background: theme.palette.background.default,
  },
  appBar: {
    background: theme.palette.background.default,
  }
});

class ScrollableTabsButtonForce extends React.Component {

  state = {
    value: (this.getHeader().length > 0 ? this.getHeader()[0].index : 0)
  };

  getHeader() {
    return this.props.headers.filter((header) => { return header.url == this.props.url });
  };

  handleChange = (event, value) => {
    this.setState({ value });
    window.location = this.props.headers[value].url
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <Tabs
        value={value}
        onChange={this.handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered={true}
      >
        {this.renderTabs()}
      </Tabs>
    );
  };

  renderTabs() {
    return this.props.headers.map((header) => {
      return <Tab key={header.index} label={header.title} />
    })
  }
}

ScrollableTabsButtonForce.propTypes = {
  classes: PropTypes.object.isRequired,
  headers: PropTypes.array.isRequired,
  url: PropTypes.string.isRequired
};

export default withStyles(styles)(ScrollableTabsButtonForce);
