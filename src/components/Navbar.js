import React, { useContext } from 'react'
import SearchBar from './SearchBar'
import {signOut} from 'firebase/auth'
import {auth} from '../firebase'
import { AuthContext } from '../context/AuthContext'
function Navbar() {
  const {curretUser} = useContext(AuthContext)
  return (
    <div>
         <div className='sideup p-3  pt-4 row gx-0'>
        <div className='col-4'>
            Human Chat
        </div>
        <div className='col-8 text-end'>
            <img src="https://static-cse.canva.com/blob/673651/DarkBlue3.b247b270.png" alt="" />
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