import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'

export default class Auth extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col md='6' className='auth-container'>
            Signup
          </Col>
          <Col md='6' className='login-col'>
            Login
          </Col>
        </Row>
      </Container>
    )
  }
}
