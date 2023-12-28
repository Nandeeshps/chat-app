import React, { useContext } from 'react'
import { IoCreateOutline } from "react-icons/io5";
import { auth } from '../../firebase';
import { AuthContext } from '../../Context/AuthContext';
import { MdAccountCircle } from "react-icons/md";

function Navbar() {
  const {currentUser} = useContext(AuthContext);
  return (
    <div className='navbar'>
      <span className="logo">Chats</span>
      <div className="user">
      <IoCreateOutline size={25} style={{cursor:'pointer'}} />
        <img src={<MdAccountCircle/>} alt="profile" />
      </div>
    </div>
  )
}

export default Navbar
