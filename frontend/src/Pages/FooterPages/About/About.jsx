import React, { Component } from "react";
import './About.css'
// here is the home Class where Land the page means its our landing page
export default class About extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">

         
            <div className="pageStyle">
            <h1 className="subHead">About US</h1>
             <h3 className="subHead">This is a student chat application. Here you can easily chat with your friends if you have your friend’s email address. </h3>
                </div>
        </div>
      </React.Fragment>
    );
  }
}