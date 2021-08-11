import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import Login from './Login'
import Signup from './Signup'

type Props = {
  updateToken: (newToken: string) => void
}

export default class Auth extends Component<Props, {}> {
  constructor(props: Props) {
    super(props)
  }
  render() {
    return (
      <Container>
        <Row>
          <Col md='6' className='auth-container'>
            <Signup updateToken={this.props.updateToken} />
          </Col>
          <Col md='6' className='login-col'>
            <Login updateToken={this.props.updateToken} />
          </Col>
        </Row>
      </Container>
    )
  }
}
