import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import AppRouter from './AppRouter';
// import AuthProvider from './AuthProvider';
import 'antd/dist/antd.css';
import './assets/global.scss';
import ErrorBoundary from './ErrorBoundary';

class App extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        {/* <AuthProvider> */}
        <ErrorBoundary>
          <AppRouter />
        </ErrorBoundary>
        {/* </AuthProvider> */}
      </Provider>
    );
  }
}

App.propTypes = {
  store: PropTypes.object.isRequired,
};

export default App;
