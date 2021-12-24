import React, { Component } from 'react';
import { Spin } from 'antd';

export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    state = {
      component: null,
    };

    async componentDidMount() {
      const { default: component } = await importComponent();

      this.setState({
        component,
      });
    }

    render() {
      const C = this.state.component;

      return C ? (
        <C {...this.props} />
      ) : (
        <div
          style={{
            height: '30px',
            width: '30px',
            textAlign: 'center',
            position: 'absolute',
            top: '50%',
            marginLeft: '-15px',
            marginTop: '-15px',
            left: '50%',
          }}
        >
          <Spin size='large' />
        </div>
      );
    }
  }

  return AsyncComponent;
}
