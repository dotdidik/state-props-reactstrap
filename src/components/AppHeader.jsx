import React, { Component } from 'react';
import { Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Container,
    Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { Link } from 'react-router-dom';
import store from 'store';
import isLoggedIn from '../helper/is_logged_in'
import { Redirect } from 'react-router-dom';

class AppHeader extends Component{
    constructor(props) {
        super(props); 
        this.state = {
          isOpen: false,
          modal: false,
          email: '',
          password: '',
          error: false
        };

        this.toggle = this.toggle.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
      }
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

      handleLogout = (e) => {
        store.remove('loggedIn');
      }

      render() {

        let auth;

        if( isLoggedIn() == false){
          auth = <Link to='/login'>login</Link>
        } else {
          auth =  <Button onClick={this.handleLogout}>Logout</Button>
        }

        return (
          <div>
            <Navbar color="success" expand="md">
              <Container>
              <NavbarBrand className='text-white' ><Link to='/'> Home </Link></NavbarBrand>
              <NavbarBrand className='text-white' ><Link to='/products'> Products </Link></NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem >
                    <NavLink className='text-white'><Link to='/about-me'>About</Link></NavLink>
                  </NavItem>
                  <NavItem>
                    {auth}
                  </NavItem>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      {this.props.opsi}
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>
                        Option 1
                      </DropdownItem>
                      <DropdownItem>
                        Option 2
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>
                        {auth}
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
              </Collapse>
              </Container>
            </Navbar>
          </div>
        );
      }
}

export default AppHeader;
