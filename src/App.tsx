import React, { Component } from 'react'
import Auth from './auth/Auth'
import Sitebar from './home/Navbar'
import WorkoutIndex from './workouts/WorkoutIndex'

type valueTypes = {
  token: string
}

class App extends Component<{}, valueTypes> {
  constructor(props: valueTypes) {
    super(props)
    this.state = {
      token: '',
    }
  }

  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.setState({
        // ! is a non-null assertion expression operator (TS)
        token: localStorage.getItem('token')!,
      })
    }
    console.log(this.state.token)
  }

  updateToken = (newToken: string) => {
    localStorage.setItem('token', newToken)
    this.setState({ token: newToken })
    console.log(this.state.token)
  }

  clearToken = () => {
    localStorage.clear()
    this.setState({ token: '' })
  }

  protectedViews = () => {
    return this.state.token === localStorage.getItem('token') ? (
      <WorkoutIndex token={this.state.token} />
    ) : (
      <Auth updateToken={this.updateToken} />
    )
  }

  render() {
    return (
      <div className='App'>
        <Sitebar clickLogout={this.clearToken} />
        {this.protectedViews()}
      </div>
    )
  }
}

export default App
