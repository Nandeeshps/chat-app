import React,{useContext, useState} from "react";
import {getDocs, collection, query, where} from 'firebase/firestore';
import {AuthContext} from '../../Context/AuthContext';
import {db} from '../../firebase';
import { doc, getDoc,setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';


function Search() {

  const [username,setUsername] = useState("");
  const [user,setUser] = useState(null);

  const {currentUser} = useContext(AuthContext);

  const handleSearch= async () => {
    const q = query(collection(db,"users"),
    where("displayName","==",username));

    try {
      const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc)=>{
        setUser(doc.data())
    });
    } catch (error) {
      alert(error);
    }
    setUser(null);
    setUsername("");
  };

  const handleKey = e => {
    e.code === "Enter" && handleSearch();
  }

  const handleSelect =async () => {
    const combinedId = currentUser > user.uid ?
    currentUser.uid + user.uid
    : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, 'chats',combinedId));
    
      if(!res.exists()){}
      await setDoc(doc(db,"chats",combinedId),{messages:[]});
    
 
        await updateDoc(doc(db,"userChats",currentUser.uid),{
            [combinedId+".userInfo"]:{
              uid:user.uid,
              displayName:user.displayName,
            },
            [combinedId+".date"]: serverTimestamp()
        });

        await updateDoc(doc(db,"userChats",user.uid),{
          [combinedId+".userInfo"]:{
            uid:currentUser.uid,
            displayName:currentUser.displayName,
          },
          [combinedId+".date"]: serverTimestamp()
      });

  
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <div className="search">
      <div className="searchForm">
        <input type="text" 
        placeholder="Enter the search" 
        onKeyDown={handleKey}  
        onChange={e=>setUsername(e.target.value)} 
        value={username}
        />
      </div>
     { user && <div className="userChat" onClick={handleSelect}>
        <img src="" />
        <div className="userChatInfo">
          <span>{user.displayName}</span>
        </div>
      </div>
        }
    </div>
  );
}

export default Search;
