import React, { Component } from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";// Bootstrap Library
import { Link } from "react-router-dom";
import "./UserNavbar.css"; // Import the css file foe styling
import { BsFillChatFill ,BsChat} from 'react-icons/bs';
import {  FaUserFriends,FaUserAlt} from 'react-icons/fa';
import {AiFillSetting,AiOutlinePoweroff} from 'react-icons/ai';
import {HiUserGroup} from 'react-icons/hi';
export default class UserNavbar extends Component {


  render() {
    return (
      <React.Fragment>
        <Navbar default collapseOnSelect>
          <Navbar.Header>
            {/* Here you can Logo In the navbar Header */}
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            {/* Here The Left Nav Item */}
            <Nav pullLeft>
              <NavItem
                eventKey={1}
                componentClass={Link}
                href="/"
                to="/Chat"

              >
                Chat<BsFillChatFill style={{marginLeft:5}}/>
              </NavItem>
              <NavItem
                eventKey={1}
                componentClass={Link}
                href="/"
                to="/GroupChat"

              >
                Group Chat <BsChat style={{marginLeft:5}}/>
              </NavItem>
              <NavItem
                eventKey={1}
                componentClass={Link}
                href="/"
                to="/FrientRequest"

              >
                Friend Requests <FaUserFriends style={{marginLeft:5}}/>
              </NavItem>
              <NavItem
                eventKey={1}
                componentClass={Link}
                href="/"
                to="/FindUser"

              >
                Find User <FaUserAlt style={{marginLeft:5}}/>
              </NavItem>
              <NavItem
                eventKey={1}
                componentClass={Link}
                href="/"
                to="/CreateGroup"

              >
                Create Group <HiUserGroup style={{marginLeft:5}}/>
              </NavItem>

            </Nav>
            
            {/* Here The Right Nav Item */}
            <Nav pullRight>

              <NavItem
                eventKey={1}
                componentClass={Link}
                href="/"
                to="/viewprofile"

              >
               Setting <AiFillSetting style={{marginTop:2}} />
              </NavItem>
              <NavItem
                eventKey={1}
                componentClass={Link}
                href="/"
                to="/"

              >
             Logout  <AiOutlinePoweroff  style={{marginTop:2}}/>
              </NavItem>

            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </React.Fragment>
    );
  }
}
