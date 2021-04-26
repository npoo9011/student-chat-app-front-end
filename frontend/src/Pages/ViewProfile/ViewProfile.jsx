import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { AiFillSetting } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import "./ViewProfile.css";
import axiosClient from "../../helper";
import Cookie from 'cookie-universal'

// Here is the function of Tab panel 
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
// Here the The tab index is set according to click
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {


  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}


export default function ViewProfile() {
  //Initialize the hooks
  const cookies = Cookie()
  const history = useHistory();
  const [value, setValue] = React.useState(0);
  const [userView, setuserView] = React.useState({ // View Profile And update profile Hooks
    user_name: "",
    email: "",
    about: "",
  });
  const [userPassword, setuserPassword] = React.useState({// Password Section Hooks
    oldPassword: "",
    newPassword: "",
  });
  const [deleteAccount, setDeleteAccount] = React.useState({// Delete Account Hooks
    email: "",
    password: "",
  });

  const handleChangeDelete = (e) => {// Set Delete account hooks
    console.log(e.target.name, " : ", e.target.value);
    setDeleteAccount({
      ...deleteAccount,
      [e.target.name]: e.target.value.trim(),
    });
  };
  const handleChangePassword = (e) => {// set Password Section Hooks
    console.log(e.target.name, " : ", e.target.value);
    setuserPassword({
      ...userPassword,
      [e.target.name]: e.target.value.trim(),
    });
  };
  const handleChangeData = (e) => {// set View Profile And update profile Hooks
    console.log(e.target.name, " : ", e.target.value);
    setuserView({
      ...userView,
      [e.target.name]: e.target.value,
    });
  };

  const handleChange = (event, newValue) => { // function to set the value of index that help tp change the tab
    setValue(newValue);
  };
  useEffect(() => { // use effect function call the api before render method
    getuserdetail();
  }, [])

  const getuserdetail = () => { // Here is the function of  api of view Profile

    axiosClient().get(`/api/users`).then(response => {
      setuserView({
        ...userView,
        user_name: response.data.user.user_name,
        email: response.data.user.email,
        about: (response.data.user.about)? response.data.user.about : "",
      });
    });
  }
  const handleupdate = () => { // Here is the function of  api of update Profile
    axiosClient()
      .put(`/api/users/update`, userView)
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => {
        alert("Some thing Went Wrong");
      });
  }
  const handlepassword = () => {//  Here is the function of  api of change password
    axiosClient()
      .put(`/api/users/update-password`, userPassword)
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => {
        alert("Some thing Went Wrong");
      });
  }
  const handledelete = () => { //Here is the function of  api of delete Account
    axiosClient()
      .delete(`/api/users`)
      .then((response) => {
        alert(response.data.message);
        history.push("/")
      })
      .catch((error) => {
        alert("Some thing Went Wrong");
      });
  }
  const navigatetoback = () => {
    history.push("/Chat");
  }
  return (
    <div >
      {/* //Setting Icon */}
   
      <AiFillSetting style={{ fontSize: 22,  marginLeft: 10,cursor:'pointer', position:'absolute',marginTop:10}}  onClick={() => navigatetoback()} /> 
      <AppBar position="static" color="default" style={{  }}>
{/* Tabs Title And Design */}
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"

          aria-label="scrollable force tabs example"
        >
          <Tab style={{ fontSize: 13 }} label="View My Profile"  {...a11yProps(0)} />
          <Tab style={{ fontSize: 13 }} label="Update My Profile"  {...a11yProps(1)} />
          <Tab style={{ fontSize: 13 }} label="Change Password"  {...a11yProps(2)} />
          <Tab style={{ fontSize: 13 }} label="Delete my Account"  {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      {/* Here is the End of Tab BAr */}
      <TabPanel value={value} index={0}>  
      {/* //Tab Heading One and its content */}
        <div className="FirstPanel">
          <h1 className="headingview">View My Profile</h1>
          <div className="Tab">
            <div className="otherinput">
              <input
                type="text"
                name="user_name"
                class="form-control"
                value={`Name:    ${userView.user_name}`}
                aria-label="Name"
                aria-describedby="basic-addon1"

              />
            </div>
            <div className="otherinput">
              <input
                type="email"
                name="email"
                class="form-control"
                value={`Email:    ${userView.email}`}
                aria-label="Email"
                aria-describedby="basic-addon1"

              />
            </div>

            <div className="otherinput">
              <input
                type="text"
                name="about"
                class="form-control"
                value={`About:    ${userView.about}`}
                aria-label="About"
                aria-describedby="basic-addon1"

              />
            </div>
          </div>
        </div>
      </TabPanel>

      <TabPanel value={value} index={1}>
      {/* //Tab Heading two and its content */}

        <div className="SecondPanel">
          <h1 className="headingview">Update My Profile</h1>
          <div className="Tab">
            <div className="otherinput">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">
                  Name
                </span>
              </div>
              <input
                type="text"
                name="user_name"
                class="form-control"
                value={userView.user_name}
                aria-label="Name"
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
                value={userView.email}
                aria-label="Email"
                aria-describedby="basic-addon1"
                onChange={handleChangeData}

              />
            </div>

            <div className="otherinput">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">
                  About
                </span>
              </div>
              <input
                type="text"
                name="about"
                value={userView.about}
                class="form-control"
                aria-label="About"
                aria-describedby="basic-addon1"
                onChange={handleChangeData}

              />
            </div>
            <button className="update" onClick={handleupdate}>
              Update
              </button>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>

        <div className="ThirdPanel">
          <h1 className="headingview">Change Password</h1>
          <div className="Tab">
            <div className="otherinput">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">
                  Old Password
                </span>
              </div>
              <input
                type="password"
                name="oldPassword"
                class="form-control"
                aria-label="oldPassword"
                aria-describedby="basic-addon1"
                onChange={handleChangePassword}


              />
            </div>
            <div className="otherinput">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">
                  New Password
                </span>
              </div>
              <input
                type="password"
                name="newPassword"
                class="form-control"
                aria-label="newPassword"
                aria-describedby="basic-addon1"
                onChange={handleChangePassword}


              />
            </div>

            <div className="otherinput">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">
                  Re-enter New Password
                </span>
              </div>
              <input
                type="password"
                name="newPassword"
                class="form-control"
                aria-label="Email"
                aria-describedby="basic-addon1"
                onChange={handleChangePassword}

              />
            </div>
            <button className="update" onClick={handlepassword}>
              Submit
              </button>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={3}>

        <div className="FourthPanel">
          <h1 className="headingview">Delete My Account</h1>
          <div className="Tab">
            <div className="otherinput">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">
                  Email ID
                </span>
              </div>
              <input
                type="email"
                name="email"
                class="form-control"
                aria-label="Email"
                aria-describedby="basic-addon1"
                onChange={handleChangeDelete}

              />
            </div>
            <div className="otherinput">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">
                  Password
                </span>
              </div>
              <input
                type="password"
                name="password"
                class="form-control"
                aria-label="password"
                aria-describedby="basic-addon1"
                onChange={handleChangeDelete}
              />
            </div>


            <button className="update" onClick={handledelete}>
              Delete
              </button>
          </div>
        </div>
      </TabPanel>

    </div>
  );
}