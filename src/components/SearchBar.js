import React,{useContext, useState} from 'react'
import {db} from '../firebase'
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { AuthContext } from '../context/AuthContext';
 function SearchBar() {
  const [userName, setUserName]=useState("")
  const [user, setUser]=useState(null)
  const [err, setErr]=useState(false)
  const {currentUser} = useContext(AuthContext)
  const handleKey =(e) =>{
    console.log(e.key)
    if(e.key==="Enter"){
        handleSearch();
    }
  }
  const handleSearch=async()=>{
    setErr(false)
    console.log("in handle search")
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );

    try {
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot._snapshot.docChanges[0].length)
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
        console.log(doc.data())
      });
    
    } catch (err) {
      console.log(err);
      setErr(true);
    }
  }

  const handleSelect=async()=>{
    const combinedId= currentUser.uid > user.uid ? user.uid+currentUser.uid : currentUser.uid+user.uid;
    try{
      const result= await getDoc(doc(db, "chats", combinedId));
      if(!result.exists()){
        await setDoc(doc(db, "chats",combinedId),{messages: []})
        await updateDoc(doc(db, "userChat",currentUser.uid),{
          [combinedId + ".userInfo"]:{
            uid:user.uid,
            displayName:user.displayName,
            photoURL:user.photoURL
          },
          [combinedId + ".date"]: serverTimestamp()

        });
        console.log(currentUser.displayName)
       await updateDoc(doc(db, "userChat",user.uid),{
          [combinedId + ".userInfo"]:{
            uid:currentUser.uid,
            displayName:currentUser.displayName,
            photoURL:currentUser.photoURL
          },
          [combinedId + ".date"]: serverTimestamp()

        }); 
      }
    }catch(err){
      console.log(err)
    }
    setUser(null);
    setUserName("");

  }
  return (
    <div className='panel'>
       <input type="text"  placeholder='find human' className='form-control' value={userName} onChange={(e)=>{setUserName(e.target.value)}} onKeyPress={handleKey}/>
       {err && <span>User not found</span>}
       {user &&  <div className='row gx-0 align-items-center msgList mt-3' onClick={handleSelect}>
        <div className='col-2 text-center'>
          <img src="https://static-cse.canva.com/_next/static/assets/100-brilliant-color-combinations_w600xh337_8d6833889d691c050e76a344befd0a787278d466a1ddeb150f8d6dd8b0227d44.avif" alt="" />
        </div>
        <div className='col-10'>
          <div className='col-12'>
            <span className='ms-2 '>{user.displayName}</span>
          </div>
          <div className='col-12'>
            <span className='ms-2 descrip' style={{fontSize:"12px"}}></span>
          </div>
        </div>
      </div> }
    </div>
  )
}


export default SearchBar