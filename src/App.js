import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from './containers/header.js'
import Dashboard from './containers/dashboard.js'
import Visualiser from './containers/visualiser.js'
import Explorer from './containers/explorer.js'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: '#63ccff',
      main: '#039be5',
      dark: '#006db3',
      contrastText: '#e1e1e1'
    },
    secondary: {
      light: '#ff4081',
      main: '#f50057',
      dark: '#c51162',
      contrastText: '#e1e1e1'
    },
    background: {
      default: '#0f1213',
      paper: '#2a2a2a'
    }
  },
  shape: {
    borderRadius: 0
  },
  typography: {
    display1: {
      fontSize: '1.5rem',
      fontWeight: 300,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      lineHeight: '1.20588em',
      color: '#e1e1e1'
    },
    display2: {
      fontSize: '2.8125rem',
      fontWeight: 400,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      lineHeight: '1.13333em',
      marginLeft: '-.02em',
      color: '#e1e1e1'
    },
    display3: {
      fontSize: '1.5rem',
      fontWeight: 400,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      lineHeight: '2.70588em',
      color: '#e1e1e1'
    }
  }
});

function NotFound() {
  return (
    <div>
      Not Found
    </div>
  )
}

function MyApp() {
  return (
    <React.Fragment>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Router>
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/visualiser" exact component={Visualiser} />
            <Route path="/explorer" exact component={Explorer} />
            <Route path="/explorer/:id" exact component={Explorer} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    </React.Fragment>
  );
}

export default MyApp;
