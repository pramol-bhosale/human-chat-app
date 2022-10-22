import { arrayUnion, doc, onSnapshot, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../context/ChatContext'
import { db, storage } from '../firebase';
import ReceivedMsg from './ReceivedMsg';
import SendMsg from './SendMsg';
import {v4 as uuid} from "uuid"
import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage'

import { AuthContext } from '../context/AuthContext';

function Chats() {
  
   const {data} =useContext(ChatContext);
   const [text, setText]=useState()
   const [img, setImg] = useState(null)
   const {currentUser} = useContext(AuthContext)
   const [messages,setMessages]=useState([])
   const handleSend =async()=>{
      if(img){
         const storageRef = ref(storage, uuid());

         const uploadTask = uploadBytesResumable(storageRef, img);
   
         uploadTask.on(
           (error) => {
             //TODO:Handle Error
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
      }else{
         await updateDoc(doc(db,"chats",data.chatId), {
            messages: arrayUnion({
               id: uuid(),
               "text":text,
               "senderId":currentUser.uid,
               "date":Timestamp.now()
            })
        });
      }
      await updateDoc(doc(db, "userChat", currentUser.uid), {
         [data.chatId + ".lastMessage"]: {
           text,
         },
         [data.chatId + ".date"]: serverTimestamp(),
       });
   
       await updateDoc(doc(db, "userChat", data.user.uid), {
         [data.chatId + ".lastMessage"]: {
           text,
         },
         [data.chatId + ".date"]: serverTimestamp(),
       });
   
       setImg(null);
       setText("");
   }


   useEffect(() => {
      const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
        
      });
  
      return () => {
        unSub();
      };
    }, [data.chatId]);
  
  return (
    <div className='row gx-0 '>
      
        {/* navigation bar of chat box with user profile and name the one whom with you are chatting */}
    { data.chatId !=="null" && <><div className='row gx-0 col-12 chat-nav p-3 align-items-center '>
           <div className='col-3 text-center'>
            <img src={`https://avatars.dicebear.com/api/avataaars/${data.user.displayName}.svg`} alt="" />
           </div>
           <div className='col-9'>
            <span>{data.user.displayName}</span>
           </div>
         </div>
         <div className='chat-box'>
         {messages.map((c) => (
         <>
         {c.senderId === currentUser.uid ? <SendMsg  text={c.text} img={c.img} />: <ReceivedMsg text={c.text} img={c.img}/>}
         </>   
       ))}
        
         </div>
         <div className='col-12 p-type-box row gx-0 align-items-center'>
        <div className='col-8'>
        <input type="text" name="" placeholder='Type something.......' className='type-box' value={text} onChange={(e)=>{setText(e.target.value)}}/>
        </div>
        <div className='col-4 row gx-0 align-items-center justify-content-end'>
         <div className='col-3 text-end'>
         <label htmlFor="fileinput">
         <i className="bi bi-paperclip"></i>
         </label>
         </div>
         <div className='col-3 text-center'>
         <input type="file" id="fileinput" className='d-none'  onChange={(e)=>setImg(e.target.files[0])}/>
         <label htmlFor="fileinput">
         <i className="bi bi-image-fill"></i>
         </label>
         </div>
         <div className='col-5 text-center'>
             <button type="submit" className='' onClick={handleSend}>Send</button>
         </div>
        </div>
        
         </div></>}
        {
          data.chatId ==="null" &&
          <div className='m-5' style={{color:"grey",fontSize:"20px"}}>
            Tap to start conversation.
          </div> 
        }

    </div>
  )
}
export default Chats
