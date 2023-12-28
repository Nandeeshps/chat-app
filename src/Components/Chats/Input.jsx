import React, { useContext, useState } from 'react'
import { IoSend } from "react-icons/io5";
import { RiImageAddFill } from "react-icons/ri";
import { CgAttachment } from "react-icons/cg";
import { AuthContext } from '../../Context/AuthContext';
import { ChatContext } from '../../Context/ChatContext.';
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import {v4 as uuid} from 'uuid';
import { upload } from '@testing-library/user-event/dist/upload';
import { ref, uploadBytesResumable, getStorage,  getDownloadURL  } from 'firebase/storage';


function Input() {

  const [text,setText] = useState("");
  const [img,setImg] = useState(null);

  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  const handleSend = async () => {
    if(img){
      const storage = getStorage(); 
      const storageRef = ref(storage,uuid());
      const uploadTask = uploadBytesResumable(storageRef,img);

      uploadTask.on(
        (error) => {
         console.error('upload error:',error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    }
    else{
      await updateDoc(doc(db,'chats',data.chatId),{
       messages: arrayUnion({
        id: uuid(),
        text,
        senderId:currentUser.uid,
        date:Timestamp.now(),
       }),
      });
    }

    await  updateDoc(doc(db,'userChats',currentUser.uid),{
      [data.chatId + '.lastMessage']: {
        text
      },
      [data.chatId+".date"]:serverTimestamp()
    });

    await  updateDoc(doc(db,'userChats',data.user.uid),{
      [data.chatId + '.lastMessage']: {
        text
      },
      [data.chatId+".date"]:serverTimestamp()
    });


    setText('');
    setImg(null);
  };
  return (
    <div className='input'>
      <input type="text" placeholder='Message' onChange={e=>setText(e.target.value)}
      value={text} />
      <div className="send">
      <CgAttachment size={20}/>
        <input type="file" style={{display:"none", cursor:"pointer"}} id="file" />
        <label htmlFor="file">
        <RiImageAddFill size={20} style={{cursor:"pointer"}}  onChange={e=>setImg(e.target.files[0])}/>
          </label>
          <IoSend size={20} style={{cursor:"pointer"}} onClick={handleSend}/>
      </div>
    </div>
  )
}

export default Input
