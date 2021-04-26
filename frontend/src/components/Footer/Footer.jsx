import React, { Component } from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";// Bootstrap Library
import { Link } from "react-router-dom";
import "./Footer.css"; // Import the css file foe styling
export default class Footer extends Component {


  render() {
    return (
      <React.Fragment>
        <Navbar default collapseOnSelect>

          <Navbar.Collapse>
            {/* Here The Left Nav Item */}
            <Nav pullCenter>
              <NavItem
                eventKey={1}
                componentClass={Link}
                href="/"
                to="/About"

              >
                About Us
              </NavItem>

            </Nav>
            {/* Here The Right Nav Item */}
            <Nav pullRight>
              <NavItem
                eventKey={1}
                componentClass={Link}
                href="/"
                to="/Contact"

              >
                Contact Us
              </NavItem>


            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </React.Fragment>
    );
  }
}
