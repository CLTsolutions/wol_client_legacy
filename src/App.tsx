import React, { Component } from 'react'
import Auth from './auth/Auth'
import Sitebar from './home/Navbar'
import { Token } from './types'
import WorkoutIndex from './workouts/WorkoutIndex'

type AppProps = {}
type AppState = {
   token: Token
}

class App extends Component<AppProps, AppState> {
   constructor(props: AppProps) {
      super(props)
      this.state = {
         token: '',
      }
   }

   componentDidMount(): void {
      if (localStorage.getItem('token')) {
         this.setState({
            // ! is a non-null assertion expression operator (TS)
            token: localStorage.getItem('token')!,
         })
      }
      console.log(this.state.token)
   }

   updateToken = (newToken: Token): void => {
      localStorage.setItem('token', newToken)
      this.setState({ token: newToken })
      console.log(this.state.token)
   }

   clearToken = (): void => {
      localStorage.clear()
      this.setState({ token: '' })
   }

   protectedViews = (): JSX.Element => {
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
