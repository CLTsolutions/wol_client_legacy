import React, { Component } from 'react'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import { WorkoutState } from '../types'

type Props = {
  fetchWorkouts: () => void
  token: string
}

// export interface WorkoutState {
//   description: string
//   definition: string
//   result: string
// }

export default class WorkoutCreate extends Component<Props, WorkoutState> {
  constructor(props: Props) {
    super(props)
    this.state = {
      description: '',
      definition: '',
      result: '',
    }
  }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    fetch('http://localhost:3000/log', {
      method: 'POST',
      body: JSON.stringify({
        log: {
          description: this.state.description,
          definition: this.state.definition,
          result: this.state.result,
        },
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.props.token}`,
      }),
    })
      .then(res => res.json())
      .then(logData => {
        console.log(logData)
        this.setState({
          description: '',
          definition: '',
          result: '',
        })
        this.props.fetchWorkouts()
      })
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target
    const value = target.value
    const name = target.name
    this.setState({ [name]: value } as unknown as Pick<
      WorkoutState,
      keyof WorkoutState
    >)
  }

  render() {
    return (
      <>
        <h3>Log a Workout</h3>
        {/* Calling above handleSubmit fn */}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label htmlFor='description' />
            <Input
              name='description'
              value={this.state.description}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor='definition' />
            <Input
              type='select'
              name='definition'
              value={this.state.definition}
              onChange={this.handleChange}
            >
              <option value='Time'>Time</option>
              <option value='Weight'>Weight</option>
              <option value='Distance'>Distance</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label htmlFor='result' />
            <Input
              name='result'
              value={this.state.result}
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button type='submit'>Click to Submit</Button>
        </Form>
      </>
    )
  }
}
