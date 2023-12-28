import React from 'react'
import Sidebar from '../../Components/Chats/Sidebar';
import Search from '../../Components/Chats/Search';
import Navbar from '../../Components/Chats/Navbar';
import Messages from '../../Components/Chats/Messages';
import Input from '../../Components/Chats/Input';
import Chat from '../../Components/Chats/Chat';
import './ChatSection.css';

function ChatSection() {
  return (
    <div className='interface'>
<Sidebar/>

<Chat/>

      
    </div>
  )
}

export default ChatSection
