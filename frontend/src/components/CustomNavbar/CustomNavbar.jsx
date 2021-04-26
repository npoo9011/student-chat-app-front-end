import React, { Component } from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./CustomNavbar.css"; 
import logo from '../../assets/logo.png'
export default class CustomNavbar extends Component {


  render() {
    return (
      <React.Fragment>
        <Navbar default collapseOnSelect>
          <Navbar.Header
           >
             <img src={logo}></img>
          
                     <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            {/* Here The Left Nav Item */}
            <Nav pullLeft>
              <NavItem
                style={{fontSize:22,fontWeight:'bold',marginTop:12}}
                eventKey={1}
                componentClass={Link}


              >
                Student Chat Application 
              </NavItem>
              </Nav>
            {/* Here The Right Nav Item */}
            <Nav pullRight>
              <NavItem
                eventKey={1}
                componentClass={Link}
                href="/"
                to="/"

              >
            Home
              </NavItem>
              <NavItem
                eventKey={1}
                componentClass={Link}
                href="/"
                to="/Login"

              >
                Login
              </NavItem>
              <NavItem
                eventKey={1}
                componentClass={Link}
                href="/"
                to="/Signup"

              >
               Signup
              </NavItem>

            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </React.Fragment>
    );
  }
}
