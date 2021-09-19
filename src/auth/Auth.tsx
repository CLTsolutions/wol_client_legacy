import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Token } from '../types'
import Login from './Login'
import Signup from './Signup'

type AuthProps = {
   updateToken: (newToken: Token) => void
}

type AuthCompState = {}

export default class Auth extends Component<AuthProps, AuthCompState> {
   constructor(props: AuthProps) {
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
