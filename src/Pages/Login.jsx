import React from 'react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";import { doc, setDoc } from 'firebase/firestore';
import { auth,db } from '../firebase';
import { useNavigate,Link } from 'react-router-dom';
import "./style.css"

function Login() {
  const navigate = useNavigate();

  const handelSubmit = async (e) =>{
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

   try {
    await signInWithEmailAndPassword(auth, email, password);
     navigate('/home');
   } catch (error) {
    console.log(error);
   }
  };

    return (
        <div className='head'>
           <form className="login" onSubmit={handelSubmit}>
          <input type="email" placeholder="Email"/>
          <input type="password" placeholder="Password"/>
          <button>Login</button>
          <b style={{color:"white"}}>Not Registered? <Link to = '/signup'>Signup</Link></b>
        </form>
        </div>
      )
}

export default Login
