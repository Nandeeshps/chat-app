import React from 'react'
import Login from './Login'
import Signup from './Signup';
import { Link } from 'react-router-dom';
import "./style.css"

function Welcome() {
  return (
    <div className='head'>
        Welcome
        <Link to='./login'>Login</Link>
        <Link to='./signup'>Signup</Link>
        </div>
  )
}

export default Welcome