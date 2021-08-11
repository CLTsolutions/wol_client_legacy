import React, { Component } from 'react'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'

type acceptedProps = {
  updateToken: (newToken: string) => void
}

export interface LoginState {
  username: string
  password: string
}

export default class Login extends Component<acceptedProps, LoginState> {
  constructor(props: acceptedProps) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target
    const value = target.value
    const name = target.name
    this.setState({ [name]: value } as unknown as Pick<
      LoginState,
      keyof LoginState
    >)
  }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    fetch('http://localhost:3000/user/login', {
      method: 'POST',
      body: JSON.stringify({
        user: {
          username: this.state.username,
          passwordhash: this.state.password,
        },
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then(res => res.json())
      .then(data => {
        this.props.updateToken(data.sessionToken)
        //   console.log(data)
      })
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
              onChange={this.handleChange}
              name='username'
              value={this.state.username}
              required
              type='text'
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor='password'>Password</Label>
            <Input
              onChange={this.handleChange}
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
