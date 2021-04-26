import React, { useState } from "react";
import { Row, Col, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import user from "../../assets/signuplogo.png";
import "./Signup.css";
import axiosClient from "../../helper";

function Signup() {
  const [userData, setUserData] = useState({
    user_name: "",  
    email: "",
    password: "",
    cPassword: "",
  });

  const handleChangeData = (e) => {
    console.log(e.target.name, " : ", e.target.value);
    setUserData({
      ...userData,
      [e.target.name]: e.target.value.trim(),
    });
  };
  const [Error, setError] = useState(false);
  const [Error1, setError1] = useState(false);
  const history = useHistory();
  const navigateto = () => {
    history.push("/Login");
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      userData.user_name === "" ||
      userData.email === "" ||
      userData.password === ""
    ) {
      setError(true);
    } else if (userData.cPassword !== userData.password) {
      setError(false);
      setError1(true);
    } else {
      setError(false);
      axiosClient()
        .post(`api/users/signup`, userData)
        .then((response) => {
          alert(response.data.message);
        })
        .catch((error) => {
          alert("Some thing Went Wrong");
        });
    }
  };
  return (
    <div className="UpperBox">
      <div className="BoxShadow">
        <Col sm={1}></Col>

        <Col sm={4}>
          <h1 className="imageheading">Signup</h1>
          <Image src={user} className="image" />
        </Col>

        <Col sm={1}></Col>
        <Row>
          <Col sm={5}>
            {Error === true ? (
              <p className="error">All fields Required</p>
            ) : null}
            {Error1 === true ? (
              <p className="error">Password Not Match</p>
            ) : null}
            <div className="upperinput">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">
                  UserName
                </span>
              </div>
              <input
                type="text"
                class="form-control"
                name="user_name"
                // placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
                onChange={handleChangeData}
              />
            </div>

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

            <div className="otherinput">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">
                  Password
                </span>
              </div>
              <input
                type="Password"
                name="password"
                class="form-control"
                // placeholder="Password"
                aria-label="Password"
                aria-describedby="basic-addon1"
                onChange={handleChangeData}
              />
            </div>
            <div className="otherinput">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">
                  Confirm Password
                </span>
              </div>
              <input
                type="Password"
                name="cPassword"
                class="form-control"
                // placeholder="Password"
                aria-label="Password"
                aria-describedby="basic-addon1"
                required="true"
                onChange={handleChangeData}
              />
            </div>

            <div className="logindiv">
              <button className="login" onClick={handleSubmit}>
                Signup
              </button>
            </div>
            <h5 className="createAccount" onClick={() => navigateto()}>
              Already have an account?
            </h5>
          </Col>
        </Row>
      </div>
    </div>
  );
}
export default Signup;
