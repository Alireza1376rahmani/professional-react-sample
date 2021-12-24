import React from 'react';
import { Button, Col, Row, Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Paragraph, Title } = Typography;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Row style={{ height: '100vh' }} type='flex' justify='center' align='middle'>
          <Col>
            <Row>
              <Col span={12} offset={6}>
                <div>
                  <Title level={1}>500</Title>
                  <Paragraph>{''}</Paragraph>
                  <Paragraph>Something went wrong</Paragraph>
                  <Paragraph>
                    <Link to='/dashboard'>
                      <Button>Go to main page</Button>
                    </Link>
                  </Paragraph>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      );
    }

    return this.props.children;
  }
}

export default React.memo(ErrorBoundary);
