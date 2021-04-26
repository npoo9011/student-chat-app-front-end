import React, { useState } from "react";
import { Row, Col, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axiosClient from "../../../helper";
import "./FindUser.css";
import Cookie from 'cookie-universal';
function FindUser() {
  const cookies = Cookie()
  const [userData, setUserData] = useState({
    user_name: "",
    email: "",
    about: "",
    id:""

  });

  const handleChangeData = (e) => {
    console.log(e.target.name, " : ", e.target.value);
    setUserData({
      ...userData,
      [e.target.name]: e.target.value.trim(),
    });
  };
  const [Error, setError] = useState(false);
  const [response, setresponse] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
    
      userData.email === "" 
          ) {
      setError(true);
    } else {
      setError(false); 
      axiosClient()
        .get(`/api/users/email/${userData.email}`, )
        .then((response) => {
          alert(response.data.message);
          setUserData({
            ...userData,
            user_name: response.data.user.user_name.trim(),
            email: response.data.user.email.trim(),
            about: (response.data.user.about)? response.data.user.about.trim() : "",
            id:response.data.user._id.trim(),
          });
          setresponse(true);
        })
        .catch((error) => {
          alert("Some thing Went Wrong");
        });
    }
  };
  const createRequest = (id) => {
    const senderdata =  cookies.get("userData")
    const data = {
      "sender":senderdata.userId,
      "receiver":id
    }
    axiosClient()
    .post(`/api/users/create-request`, data)
    .then((response) => {
      alert(response.data.message);
    })
    .catch((error) => {
      alert("Some thing Went Wrong");
    });

  }
  return (
    <div className="container-fluid">
      <div className="">
 

        <Col sm={3}></Col>
        <Row>
          <Col sm={5}>
          {Error === true ? <p className="error">field Required</p> : null}


            <div className="otherinput">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">
                  Email
                </span>
              </div>
              <input
                type="email"
                name="email"
                class="form-control"
                // placeholder="Email"
                aria-label="Email"
                aria-describedby="basic-addon1"
                onChange={handleChangeData}

              />
            </div>

           
            <div className="DistanceTop">
              <button className="" onClick={handleSubmit}>
                Find User
              </button>
            </div>
            {response === true?
            <div className="Finddiv">
                <p className="VariableStyling">User Name:   {userData.user_name}</p>
                <p className="VariableStyling">Email:           {userData.email}</p>
                <p className="VariableStyling">About:         {userData.about}</p>
              <button className="VariableStyling1" onClick={() =>createRequest(userData.id)} >
                Send Request
              </button>
            </div>:null}
          </Col>
        </Row>
      </div>
    </div>
  );
}
export default FindUser;
