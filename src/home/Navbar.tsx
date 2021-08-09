import React, { Component } from 'react'
import { Navbar, NavbarBrand } from 'reactstrap'

type acceptedProps = {
  clearLogout: () => void
}

export default class Sitebar extends Component<{}, acceptedProps> {
  constructor(props: acceptedProps) {
    super(props)
  }

  render() {
    return (
      <Navbar color='faded' light expand='md'>
        <NavbarBrand href='/'>Workout Log</NavbarBrand>
      </Navbar>
    )
  }
}
