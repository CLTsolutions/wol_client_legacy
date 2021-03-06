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
import { Token, Workout } from '../types'

type WorkoutEditProps = {
   workoutToUpdate: Workout
   updateOff: () => void
   token: Token
   fetchWorkouts: () => void
}
export default class WorkoutEdit extends Component<WorkoutEditProps, Workout> {
   constructor(props: WorkoutEditProps) {
      super(props)
      this.state = {
         description: this.props.workoutToUpdate.description,
         definition: this.props.workoutToUpdate.definition,
         result: this.props.workoutToUpdate.result,
      }
   }

   workoutUpdate = (e: React.FormEvent<HTMLFormElement>): void => {
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

   handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      const target = e.target
      const value = target.value
      const name = target.name
      this.setState({ [name]: value } as unknown as Pick<
         Workout,
         keyof Workout
      >)
   }

   render() {
      return (
         <Modal isOpen={true}>
            <ModalHeader>Log a Workout</ModalHeader>
            <ModalBody>
               <Form onSubmit={this.workoutUpdate}>
                  <FormGroup>
                     <Label htmlFor='result'>Edit Result:</Label>
                     <Input
                        name='result'
                        value={this.state.result}
                        onChange={this.handleChange}
                     />
                  </FormGroup>
                  <FormGroup>
                     <Label htmlFor='description'>Edit Description:</Label>
                     <Input
                        name='description'
                        value={this.state.description}
                        onChange={this.handleChange}
                     />
                  </FormGroup>
                  <FormGroup>
                     <Label htmlFor='definition'>Edit Definition:</Label>
                     <Input
                        type='select'
                        name='definition'
                        value={this.state.definition}
                        onChange={this.handleChange}
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
