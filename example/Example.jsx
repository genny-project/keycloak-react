import './example.css';
import React, { Component } from 'react';
import { Grid, Row, Col } from 'flex-react';


class FlexReactExample extends Component {
  render() {
    return (
      <Grid className="example">
        <Row>
          <Col sm={6}>
            <p>Apart from on mobile, this will take up 50% of the row!</p>
          </Col>

          <Col sm={6}>
            <p>And this will take up the other 50%!</p>
          </Col>
        </Row>

        <Row center>
          <Col xs={4}>
            <p>This will be centered!</p>
          </Col>
        </Row>

        <Row>
          <Col xs={4} xsOffset={4}>
            <p>This is another way to make something centered!</p>
          </Col>
        </Row>

        <Row spaceBetween>
          <Col sm={3}>
            <p>This will be aligned on the left,</p>
          </Col>

          <Col sm={3}>
            <p>and this will be aligned on the right!</p>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default FlexReactExample;
