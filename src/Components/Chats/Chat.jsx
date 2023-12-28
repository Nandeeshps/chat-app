import React, { useContext } from 'react'
import Messages from './Messages';
import Input from './Input';
import { MdOutlineVideoCall } from "react-icons/md";
import { MdMoreVert } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";
import './style.css';
import { ChatContext } from '../../Context/ChatContext.';

function Chat() {

const {data} = useContext(ChatContext);

  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
            <MdOutlineVideoCall size={30} style={{cursor:'pointer'}}/>
            <IoCreateOutline size={30} style={{cursor:'pointer'}} />
            <MdMoreVert size={30} style={{cursor:'pointer'}}/>
        </div>
      </div>
      <Messages/>
      <Input/>
    </div>
  )
}

export default Chat 
