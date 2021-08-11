import React, { Component } from 'react'
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from 'reactstrap'
import { WorkoutState } from '../types'

type Props = {
  workoutToUpdate: object
  updateOff: () => void
  token: string
  fetchWorkouts: () => void
}
export default class WorkoutEdit extends Component<Props, WorkoutState> {
  constructor(props: Props) {
    super(props)
    this.state = {
      description: '',
      definition: '',
      result: '',
    }
  }

  workoutUpdate = (e: any, workout: any) => {
    e.preventDefault()
    fetch(`http://localhost:3000/log/${this.props.workoutToUpdate.id}`, {
      method: 'PUT',
      // append an obj to body of our req w/ a form matching the input expected by our server.
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
    }).then(res => {
      this.props.fetchWorkouts()
      this.props.updateOff()
    })
  }

  render() {
    return (
      <Modal isOpen={true}>
        <ModalHeader>Log a Workout</ModalHeader>
        <ModalBody>
          <Form onSubmit={workoutUpdate}>
            <FormGroup>
              <Label htmlFor='result'>Edit Result:</Label>
              <Input name='result' value={editRes} onChange={} />
            </FormGroup>
            <FormGroup>
              <Label htmlFor='description'>Edit Description:</Label>
              <Input name='description' value={editDesc} onChange={} />
            </FormGroup>
            <FormGroup>
              <Label htmlFor='definition'>Edit Definition:</Label>
              <Input
                type='select'
                name='definition'
                value={editDef}
                onChange={}
              >
                <option></option>
                <option value='Time'>Time</option>
                <option value='Weight'>Weight</option>
                <option value='Distance'>Distance</option>
              </Input>
            </FormGroup>
            <Button type='submit'>Update the workout!</Button>
          </Form>
        </ModalBody>
      </Modal>
    )
  }
}
