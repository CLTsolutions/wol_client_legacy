import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { AuthState } from '../types'

type Props = {
   updateToken: (newToken: string) => void
}

export default class Signup extends Component<Props, AuthState> {
   constructor(props: Props) {
      super(props)
      this.state = {
         username: '',
         password: '',
      }
   }

   handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      const target = e.target
      const value = target.value
      const name = target.name
      this.setState({ [name]: value } as unknown as Pick<
         AuthState,
         keyof AuthState
      >)
   }

   handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault()
      fetch('http://localhost:3000/user/register', {
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
            //   console.log(data.sessionToken)
         })
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
               <Button type='submit'>Sign Up</Button>
            </Form>
         </div>
      )
   }
}
