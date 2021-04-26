import React, { useEffect, useState } from "react";
import { Row, Col, Image } from "react-bootstrap";
import axiosClient from "../../../helper";
import "./FrientRequest.css";
import Cookie from 'cookie-universal';
function FrientRequest() {
  const cookies = Cookie()

  const [friendrequests, setfriendrequests] = useState([]);

  const getfriendrequests = (data) => {
    var modify_data = [];
    data.forEach(element => {
      const index = [element].findIndex((d) => d.status === "Requested");
      if (index !== -1) {
        modify_data.push(element)
      }
    });
    setfriendrequests(modify_data.reverse())

  };
  useEffect(() => {
    const senderdata = cookies.get("userData")
    axiosClient().get(`/api/users/`)
      .then((response) => {
        getfriendrequests(response.data.user.friendRequests)


      })
      .catch((error) => {
        alert("Some thing Went Wrong");
      });
  }, [])
  const handleAccept = (id) => {
    const senderdata = cookies.get("userData")
    const data = {
      "userId": senderdata.userId,
      "requestId": id
    }
    axiosClient().post(`/api/users/accept-request`, data)
      .then((response) => {
        alert(response.data.message)

      })
      .catch((error) => {
        alert("Some thing Went Wrong");
      });
  }
  const handleReject = (id) => {
    const senderdata = cookies.get("userData")
    const data = {
      "userId": senderdata.userId,
      "requestId": id
    }
    axiosClient().post(`/api/users/reject-request`, data)
      .then((response) => {
        alert(response.data.message)

      })
      .catch((error) => {
        alert("Some thing Went Wrong");
      });
  }
  return (
    <div className="container-fluid">


      <Col sm={3}></Col>
      <Row>
        <Col sm={6}>
          {friendrequests.length === 0 ?

            <div >

              <h1 style={{ textAlign: 'center', color: 'black' }}> NO REQUEST FOUND</h1></div>
            :
            friendrequests.map((x, index) =>
              <div className="Finddivrequest" key={index}>
                <p className="FriendStyling">User Name:    {(x.sender && x.sender.user_name) ? x.sender.user_name : ''}</p>
                <p className="FriendStyling">Email:           {(x.sender && x.sender.email) ? x.sender.email : ''}</p>
                <p className="FriendStyling">About:       {(x.sender && x.sender.about) ? x.sender.about : ''}</p>
                <div className="AcceptRejectDiv">
                  <button className="Accept"
                    onClick={() => handleAccept(x._id)} >
                    Accept
              </button>
                  <button className="Reject"
                    onClick={() => handleReject(x._id)} >
                    Reject
              </button>
                </div>
              </div>
            )}
        </Col>
      </Row>

    </div>
  );
}
export default FrientRequest;
