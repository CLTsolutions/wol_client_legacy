import React, { Component } from 'react'
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

  // const protectedViews = () => {
  //   return (this.state.token === localStorage.getItem('token') ?)
  // }

  render() {
    return (
      <div className='App'>
        <Sitebar clickLogout={this.clearToken} />
        <Auth updateToken={this.updateToken} />
      </div>
    )
  }
}

export default App
