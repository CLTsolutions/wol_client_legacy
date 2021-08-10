import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { LoginState } from './Login'

type acceptedProps = {
  updateToken: (newToken: string) => void
}

export class Signup extends Component<acceptedProps, LoginState> {
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

  handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    fetch('http://localhost:3000/user/register', {
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
        <h1>Sign Up</h1>
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
          <Button type='submit'>Sign Up</Button>
        </Form>
      </div>
    )
  }
}

export default Signup
