import { doc, onSnapshot } from 'firebase/firestore';
import React,{useContext, useEffect, useState} from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext';
import { db } from '../firebase';

function Panel() {
  const [chats, setChats]=useState([])
  const {currentUser}=useContext(AuthContext)
  const {dispatch} =useContext(ChatContext)
  useEffect(()=>{
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChat", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  } ,[currentUser.uid]);
const handleSelect=(u)=>{
  
  dispatch({type:"CHANGE_USER",payload:u})
}
  return (
    <div className='panel m-3 '>
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat)=>(
        <div className='row gx-0 align-items-center msgList mt-3' key={chat[0]} onClick={()=>{handleSelect(chat[1].userInfo)}}>
        <div className='col-2 text-center'>
          <img src={`https://avatars.dicebear.com/api/avataaars/${chat[1].userInfo.displayName}.svg`} alt="" />
        </div>
        <div className='col-10'>
          <div className='col-12'>
            <span className='ms-2 '>{chat[1].userInfo.displayName}</span>
          </div>
          <div className='col-12'>
            <span className='ms-2 descrip' style={{fontSize:"12px"}}>{chat[1].lastMessage?.text}</span>
          </div>
        </div>
      </div>
      
      ))}
      
        </div>
  )
}


export default Panel