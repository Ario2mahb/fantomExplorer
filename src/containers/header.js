import React from 'react'
import HeaderComponent from '../components/header.js'
const createReactClass = require('create-react-class')

let Header = createReactClass({
  getInitialState() {
    return {
      url: window.location.pathname,
      headers: [
        {
          index: 0,
          title: 'Dashboard',
          url: '/dashboard'
        },
        {
          index: 1,
          title: 'Visualiser',
          url: '/visualiser'
        },
        {
          index: 2,
          title: 'Explorer',
          url: '/explorer'
        }
      ]
    };
  },

  render() {
    return (
      <HeaderComponent
        headers={this.state.headers}
        url={this.state.url}
      />
    );
  }
})

export default (Header);
