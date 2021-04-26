import React, { useState, useEffect } from "react";
import { Row, Col, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axiosClient from "../../../helper";
import Moment from 'react-moment';
import UserNavbar from '../../../components/UserNav/UserNavbar'
import "./Chat.css";
import profile from '../../../assets/profile.png'
import Cookie from 'cookie-universal';
import io from "socket.io-client";

export const SOCKET_IO_URL = "http://localhost:4000/";

const socket = io(SOCKET_IO_URL);
function Chat() {
  const cookies = Cookie()
  const [response, setresponse] = useState([]);
  const [ChatMessages, setChatMessages] = useState([]);
  const [Message, setMessage] = useState("");
  const [chatID, setchatID] = useState("");
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const senderdata = cookies.get("userData")
    axiosClient().get(`/api/users/`)
      .then((response) => {
        setresponse(response.data.user.friends)

      })
      .catch((error) => {
        alert("Some thing Went Wrong");
      });
  }, [])

  const Connecttoserever = () => {
    socket.on("connect", data => {
    });
    socket.on("chat_messages", data => {
      setChatMessages(data.data)
    });
    socket.on("joined", data => {
    });
    setInitialized(true);
  };
  const joinChat = (chatId) => {
    socket.emit("join_chat", chatId);
  }
  useEffect(() => {
    if (!initialized) {
      Connecttoserever();
    }
  });
  const chatShow = (id) => {
    const senderdata = cookies.get("userData")
    const data = {
      "userId": senderdata.userId,
      "friendId": id
    }
    axiosClient().post(`/api/users/find-chat`, data)
      .then((response) => {
        setchatID(response.data.chat._id)
        setChatMessages(response.data.chat.messages)

        joinChat(response.data.chat._id)


      })
      .catch((error) => {
        alert("Some thing Went Wrong");
      });
  }
  const handlesubmitMessage = () => {
    const senderdata = cookies.get("userData")

    const data = {
      chatId: chatID,
      message: Message,
      author: senderdata.userId
    }
    socket.emit("chat_message", data);
    setMessage("");
  }
  const senderdata = cookies.get("userData")
  // console.log(ChatMessages,"hohijihju")
  return (


    <div className="container-fluid">
      <div className="NavbarDiv">
        <UserNavbar />
      </div>
      <Row>
      <Col sm={3} md={3} xs={12} lg={3}>
        <div className="RidhtStickDiv">
          <input className="Searchfield" placeholder="Search"></input>
          {response.map(x =>
            <div className="Chatone" onClick={() => chatShow(x._id)}>
              <img src={profile} alt="no img" className="imageicon" />
              <p className="username"> {x.user_name}</p>

            </div>
          )}
        </div>
      </Col>
    
        <Col sm={9} md= {9} lg= {9} xs={12}>
          <div className="mESSAGESdIV">
            {ChatMessages.map(x =>
              <div >
                {x.author === senderdata.userId ?
                <div>
                  <p className="rightText"> {x.text}</p> 
                  <p className="righttime">
                  <Moment format="YYYY/MM/DD HH:mm">{x.created_at}
                  </Moment>
                  </p></div>

                  :
                  <div>
                  <p className="leftText"> {x.text}</p>
                  <p className="leftTime" >
                  <Moment format="YYYY/MM/DD HH:mm">{x.created_at}
                  </Moment>
                    </p></div>
                }
              </div>
            )}
          </div>
          
        </Col>
      </Row>
      <Row className="lastInputdiv">
         <div className="inner-lastInputdiv">
            <input
              type="text"
              className="form-control sp-search-field"
                value={Message}
              onChange={(event) => setMessage(event.target.value)}
            />
            <button className="sendButton" onClick={handlesubmitMessage}>
              Send
            </button>
          </div>
      </Row>

    </div>
  );
}
export default Chat;
