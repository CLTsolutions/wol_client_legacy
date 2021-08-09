import React, { Component } from 'react'
import './App.css'
import Auth from './auth/Auth'
import Sitebar from './home/Navbar'

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
        // ! is non-null assertion expression operator
        token: localStorage.getItem('token')!,
      })
    }
  }

  updateToken = (newToken: string) => {
    localStorage.setItem('token', newToken)
    this.setState({ token: newToken })
  }

  clearToken = () => {
    localStorage.clear()
    this.setState({ token: '' })
  }

  // const protectedViews = () => {
  //   return (this.state.token === localStorage.getItem('token') ?)
  // }

  render() {
    return (
      <div className='App'>
        <Sitebar clickLogout={this.clearToken} />
        <Auth />
      </div>
    )
  }
}

export default App
