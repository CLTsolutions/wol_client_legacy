import React, { Component } from 'react'
import {
  Button,
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
} from 'reactstrap'

type Props = {
  clickLogout: () => void
}

interface NavbarState {
  isOpen: boolean
}

export default class Sitebar extends Component<Props, NavbarState> {
  constructor(props: Props) {
    super(props)
    this.state = {
      isOpen: false,
    }
  }

  toggle = () => {
    let newIsOpen = !this.state.isOpen
    this.setState({ isOpen: newIsOpen })
  }

  render() {
    return (
      <Navbar color='faded' light expand='md'>
        <NavbarBrand href='/'>Workout Log</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className='ml-auto' navbar>
            <NavItem>
              <Button onClick={this.props.clickLogout}>Logout</Button>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    )
  }
}
