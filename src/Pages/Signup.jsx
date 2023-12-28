import React from 'react'
import "./style.css"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore';
import { auth,db } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();

  const handelSubmit = async (e) =>{
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

   try {
     const res = await createUserWithEmailAndPassword(auth, email, password)
    await setDoc(doc(db,"users",res.user.uid),{
      uid: res.user.uid,
      displayName,
      email,
      password,
    });

    await setDoc(doc(db,"userChats",res.user.uid), {});
    navigate('/login');

   } catch (error) {
    console.log(error);
   }
 

  }
  return (
    <div className='head'>
       <form className="login" onSubmit={handelSubmit}>
      <input type="text" placeholder="User Name"/>
      <input type="email" placeholder="Email"/>
      <input type="password" placeholder="Password"/>
      <button>Sign Up</button>
      <b style={{color:"white"}}>Registered? <Link to = '/login'>Login</Link></b>
    </form>
    </div>
  )
}

export default Signup
