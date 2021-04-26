import React, { Component } from "react";
import CustomNavbar from '../../components/CustomNavbar/CustomNavbar'
import Footer from '../../components/Footer/Footer'
import { Row, Col, Image } from "react-bootstrap";
import user from "../../assets/message.png";
import "./Home.css";
// here is the home Class where Land the page means its our landing page
export default class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <CustomNavbar />
          {/* Import the  component of NAVBAR */}
          {/* <Login /> */}
          <div className="ChatBottom">
            <div >
              <Col sm={1}></Col>
              <Col sm={5}>
                <div className="ChatTOP">
                  <ul>
                    <li>
                      <h4 className="messageText">The chat application include a login and logout system</h4>
                    </li>
                    <li>
                      <h4 className="messageText">The chat application have landing page where user can contact us and find about the application.</h4>
                    </li>
                    <li>
                      <h4 className="messageText">In this Chat application you can interact people with one to one chat and group chat.</h4>
                    </li>
                    <li>
                      <h4 className="messageText">In Group chat you can add participant ,remove participant or leave the group.</h4>
                    </li>
                    <li>
                      <h4 className="messageText">The chat application also have user profile where the user can see the profile, update the profile , change the password and delete the account.</h4>
                    </li>
                    <li>
                      <h4 className="messageText">This is a student chat application. Here you can easily chat with your friends if you have your friend’s email address.</h4>
                    </li>
                    <li>
                      <h4 className="messageText">After login user navigate to dashboard where he can see thier group or friend list and record of previous chat.</h4>
                    </li>
                    <li>
                      <h4 className="messageText">If the user is new on the user dashboard then there is a option of find friend and make friends.</h4>
                    </li>
                    <li>
                      <h4 className="messageText">The User can also have friend request which can be accepted and rejected by user.</h4>
                    </li>

                  </ul>
                </div>
              </Col>
              <Col sm={1}></Col>
              <Row>
                <Col sm={4}>

                  <Image src={user} />
                </Col>
              </Row>
            </div>
          </div>
          <Footer />
        </div>
      </React.Fragment>
    );
  }
}
