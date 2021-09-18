import React, { Component } from 'react'
import { Button, Table } from 'reactstrap'
import { Token, Workout } from '../types'
// import { Workout } from '../types'

type Props = {
   token: Token
   // workouts: Array<[key: string]>
   workouts: Workout[]
   editUpdateWorkout: (workout: Workout) => void
   updateOn: () => void
   fetchWorkouts: () => void
}
export default class WorkoutTable extends Component<Props, {}> {
   deleteWorkout = (workout: Workout) => {
      fetch(`http://localhost:3000/log/${workout.id}`, {
         method: 'DELETE',
         headers: new Headers({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.props.token}`,
         }),
      })
         // Refetch all workouts so only workouts which haven't been deleted are detected.
         .then(() => this.props.fetchWorkouts())
   }

   workoutMapper = (): JSX.Element[] => {
      return this.props.workouts.map((workout, index: number) => {
         return (
            <tr key={index}>
               <th scope='row'>{workout.id}</th>
               <td>{workout.result}</td>
               <td>{workout.description}</td>
               <td>{workout.definition}</td>
               <td>
                  {/* using the functions passed as props from WorkoutIndex */}
                  <Button
                     color='warning'
                     onClick={() => {
                        this.props.editUpdateWorkout(workout)
                        this.props.updateOn()
                     }}
                  >
                     Update
                  </Button>
                  {/* onClick takes a callback fn defined in our JSX.
              - It calls deleteWorkout with a 'workout' argument, which is defined
              -- through our .map in workoutMapper. */}
                  <Button
                     color='danger'
                     onClick={() => {
                        this.deleteWorkout(workout)
                     }}
                  >
                     Delete
                  </Button>
               </td>
            </tr>
         )
      })
   }

   render() {
      return (
         <>
            <h3>Workout History</h3>
            <hr />
            <Table striped>
               <thead>
                  <tr>
                     <th>#</th>
                     <th>Result</th>
                     <th>Description</th>
                     <th>Definition</th>
                  </tr>
               </thead>
               <tbody>{this.workoutMapper()}</tbody>
            </Table>
         </>
      )
   }
}
