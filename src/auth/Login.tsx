import React, { Component } from 'react'

// type acceptedProps = {
//    updateToken: ()
// }

export interface LoginState {
  username: string
  password: string
}

export class Login extends Component<LoginState, {}> {
  constructor() {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
  }
  render() {
    return <div></div>
  }
}

export default Login
