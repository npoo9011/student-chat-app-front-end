import React, { useState } from "react";
import { Row, Col, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import user from "../../assets/user.png";
import "./Login.css";
import axiosClient from "../../helper";
import Cookie from "cookie-universal";
function Login() {
  const cookies = Cookie();

  const [userData, setUserData] = useState({
    user_name: "",
    email: "",
    password: "",
  });

  const handleChangeData = (e) => {
    console.log(e.target.name, " : ", e.target.value);
    setUserData({
      ...userData,
      [e.target.name]: e.target.value.trim(),
    });
  };
  const [Error, setError] = useState(false);
  const history = useHistory();
  const navigateto = () => {
    history.push("/Signup");
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      userData.user_name === "" ||
      userData.email === "" ||
      userData.password === ""
    ) {
      setError(true);
    } else {
      setError(false);
      axiosClient()
        .post(`/api/users/signIn`, userData)
        .then((response) => {
          cookies.set("userData", response.data.Userdata);
          if (response.data.message === "Login Successfuly...!!!") {
            localStorage.setItem("Chattoken", response.data.token);
            history.push("/Chat");
          } else {
            alert("Login Failed");
          }
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
        <Col sm={5}>
          {Error === true ? <p className="error">All fields Required</p> : null}
          <div className="upperinput">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">
                User Name
              </span>
            </div>
            <input
              type="text"
              name="user_name"
              class="form-control"
              //   placeholder="Username"
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
              //   placeholder="Email"
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
              //   placeholder="Password"
              aria-label="Password"
              aria-describedby="basic-addon1"
              onChange={handleChangeData}
            />
          </div>
        
          <div className="logindiv">
            <button className="login" onClick={handleSubmit}>
              Login
            </button>
          </div>
          <h5 className="createAccount" onClick={() => navigateto()}>
            Create new account?
          </h5>
        </Col>
        <Col sm={1}></Col>
        <Row>
          <Col sm={4}>
            <h1 className="imageheading">Login</h1>
            <Image src={user} className="image" />
          </Col>
        </Row>
      </div>
    </div>
  );
}
export default Login;
