import React, { Component } from 'react'
import { Col, Container, Row } from 'reactstrap'
import WorkoutCreate from './WorkoutCreate'
import WorkoutEdit from './WorkoutEdit'
import WorkoutTable from './WorkoutTable'

type Props = {
  token: string
}

interface WorkoutIndexState {
  workouts: []
  updateActive: boolean
  workoutToUpdate: object
}
export default class WorkoutIndex extends Component<Props, WorkoutIndexState> {
  constructor(props: Props) {
    super(props)
    this.state = {
      workouts: [],
      updateActive: false,
      workoutToUpdate: {},
    }
  }

  fetchWorkouts = () => {
    fetch('http://localhost:3000/log', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.props.token}`,
      }),
    })
      .then(res => res.json())
      .then(logData => {
        this.setState({ workouts: logData })
        console.log(logData)
      })
      .catch(err => console.log(err))
  }

  editUpdateWorkout = (workout: object) => {
    this.setState({ workoutToUpdate: workout })
    console.log(workout)
  }

  updateOn = () => {
    this.setState({ updateActive: true })
  }

  updateOff = () => {
    this.setState({ updateActive: false })
  }

  componentDidMount = () => {
    this.fetchWorkouts()
  }

  render() {
    return (
      <Container>
        <Row>
          <Col md='3'>
            <WorkoutCreate
              fetchWorkouts={this.fetchWorkouts}
              token={this.props.token}
            />
          </Col>
          <Col md='9'>
            <WorkoutTable
              workouts={this.state.workouts}
              editUpdateWorkout={this.editUpdateWorkout}
              updateOn={this.updateOn}
              fetchWorkouts={this.fetchWorkouts}
              token={this.props.token}
            />
          </Col>
          {this.state.updateActive ? (
            <WorkoutEdit
              workoutToUpdate={this.state.workoutToUpdate}
              updateOff={this.updateOff}
              token={this.props.token}
              fetchWorkouts={this.fetchWorkouts}
            />
          ) : (
            <></>
          )}
        </Row>
      </Container>
    )
  }
}
