import React, { useContext, useEffect,useRef } from 'react'
import './style.css';
import { MdAccountCircle } from "react-icons/md";
import { AuthContext } from '../../Context/AuthContext';
import { ChatContext } from '../../Context/ChatContext.';


function Message({message}) {

  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

 
  return (
    <div
      ref={ref}
      className={`message ${message.senderId == currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
           <MdAccountCircle/>
          }
          alt=""
        />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {/* {message.img && <img src={message.img} alt="" />} */}
      </div>
    </div>
  )
}

export default Message
