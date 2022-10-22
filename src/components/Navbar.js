import React, { useContext, useState } from 'react'
import SearchBar from './SearchBar'
import {signOut, updateProfile} from 'firebase/auth'
import {auth, storage} from '../firebase'
import { AuthContext } from '../context/AuthContext'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
function Navbar() {
  const {currentUser} = useContext(AuthContext)
  const [profile,setProfile] =useState(null)
  const [imageUrl, setImageUrl]=useState("https://static-cse.canva.com/blob/673651/DarkBlue3.b247b270.png")
  const update_pic=async()=>{
    
    const date=new Date().getTime();
     const storageRef=ref(storage,'image.jpg');
       await uploadBytesResumable(storageRef, profile).then(()=>{
        getDownloadURL(storageRef).then(async(downloadURL) => {
          await updateProfile(currentUser,{
                photoURL:downloadURL
          }) 
          console.log("upload done")
          setImageUrl(currentUser.photoURL);
  
         });
       })
       
           


  }
  return (
    <div>
         <div className='sideup p-3  pt-4 row gx-0'>
        <div className='col-4'>
            Human Chat
        </div>
        <div className='col-8 text-end'>
           <img src={currentUser.photoURL} alt="" /> 
            <button type="submit" className='rounded-1 ms-3' onClick={()=> signOut(auth)}>Logout</button>
        </div>
      </div>
      <div className='p-3 pb-0 searchbar' style={{color:"#d0d9e1"}}>
        <SearchBar />
      </div>
    </div>
  )
}

export default Navbar