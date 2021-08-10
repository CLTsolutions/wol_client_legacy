import React, { Component } from 'react'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'

type acceptedProps = {
  updateToken: (newToken: string) => void
}

export interface LoginState {
  username: string
  password: string
}

export class Login extends Component<acceptedProps, LoginState> {
  constructor(props: acceptedProps) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
  }

  inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target
    const value = target.value
    const name = target.name
    //  const input = e.target.value
    this.setState({ [name]: value } as unknown as Pick<
      LoginState,
      keyof LoginState
    >)
  }

  handleSubmit = (e: any) => {
    e.preventDefault()
    fetch('http://localhost:3000/user/login', {
      method: 'POST',
      body: JSON.stringify({
        user: {
          username: this.state.username,
          passwordHash: this.state.password,
        },
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then(res => res.json())
      .then(data => this.props.updateToken(data.token))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label htmlFor='username'>Username</Label>
            <Input
              onChange={this.inputHandler}
              name='username'
              value={this.state.username}
              required
              type='text'
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor='password'>Password</Label>
            <Input
              onChange={this.inputHandler}
              name='password'
              value={this.state.password}
            />
          </FormGroup>
          <Button type='submit'>Login</Button>
        </Form>
      </div>
    )
  }
}

export default Login
