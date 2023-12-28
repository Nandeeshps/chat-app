import React, { useState } from 'react';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { RiChatPrivateLine } from 'react-icons/ri';
import { MdDarkMode, MdOutlineDarkMode, MdOutlineLogout } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom
import ChatSection from '../../Pages/All/ChatSection';
import {signOut} from 'firebase/auth';
import {auth} from '../../firebase';
import '../../Pages/All/ChatSection.css';

import './leftbar.css';

function Leftbar() {
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleItemClick = (index) => {
    setActiveIndex(index);
  };

  const [darkMode, setDarkMode] = useState(false);

  const toggleMode = () => {
    setDarkMode(!darkMode);
    document.querySelector('body').style.backgroundColor = darkMode ? 'white' : 'black';
  };

  const [showChat, setShowChat] = useState(false);

  const handleChatClick = () => {
    setShowChat(!showChat);
  };

  const handleChatSectionClick = () => {
    if(activeIndex === 0){
    navigate('/home/chats');
    }
    else if(activeIndex === 1){
      navigate('/home/groups');
      }
      else if(activeIndex === 2){
        navigate('/home/PCR');
        }
  };

  return (
    <nav className="sidebar-navigation">
      <ul>
        <li className={activeIndex === 0 ? 'active' : ''} onClick={() => handleItemClick(0)}>
          {/* Use handleChatSectionClick to navigate to '/chat-section' */}
          <div onClick={handleChatSectionClick}>
            <IoChatbubbleEllipsesOutline size={30}  />
          </div>
          {showChat && <ChatSection />}
          <span className="tooltip">Chats</span>
        </li>

        <li className={activeIndex === 1 ? 'active' : ''} onClick={() => handleItemClick(1)}>
        <div onClick={handleChatSectionClick}>
          <HiOutlineUserGroup size={30} />
          </div>
          {/* {showChat && <ChatSection />} */}
          <span className="tooltip">Groups</span>
        </li>
        <li className={activeIndex === 2 ? 'active' : ''} onClick={() => handleItemClick(2)}>
        <div onClick={handleChatSectionClick}>
          <RiChatPrivateLine size={30} />
          </div>
          {/* {showChat && <ChatSection />} */}
          <span className="tooltip">PCR</span>
        </li>
      </ul>

      <ul>
        <li className={activeIndex === 3 ? 'active' : ''} onClick={() => handleItemClick(3)}>
          <li onClick={toggleMode}>
            {darkMode ? <MdDarkMode size={30} /> : <MdOutlineDarkMode size={30} />}
          </li>
          <span className="tooltip">Themes</span>
        </li>
        <li className={activeIndex === 4 ? 'active' : ''} onClick={() => handleItemClick(4)}>
          <MdOutlineLogout size={30} onClick={()=>signOut(auth)}/>
          <span className="tooltip">Logout</span>
        </li>
      </ul>
    </nav>
  );
}

export default Leftbar;
