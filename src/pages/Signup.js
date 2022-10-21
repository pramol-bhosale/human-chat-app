import React,{useState} from 'react'
import {createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth, db} from '../firebase'
import {doc, setDoc} from 'firebase/firestore'
import {Link, useNavigate} from 'react-router-dom'
function Signup() {
const [error, setError] =useState(false)
const [user, setUser] = useState({})
const [displayName, setDisplayName] = useState()
const navigate = useNavigate()
// const addUsername=async ()=>{
//     try{
           
//        console.log("success fully username inserted")
      
//     }
//     catch(err){
//         console.log(err)
//         setError(true)
//     }
// }




const handleSubmit = async (event)=>{
    event.preventDefault()
    const displayName=event.target[1].value
    const email=event.target[0].value;
    const password=event.target[2].value;
    
    setDisplayName(displayName)
try{
const response = await  createUserWithEmailAndPassword(auth, email, password);
setUser(response.user)
await updateProfile(auth.currentUser, {
    displayName: displayName
   }) 
await setDoc(doc(db, 'users', response.user.uid), {
    'uid':response.user.uid,
    'displayName':displayName,
    'email': response.user.email
  })
  await setDoc(doc(db, 'userChat', response.user.uid), {})
  navigate("/");
}
catch(err){
    setError(true)
}

}

    return (
        <div className='row vh-100 gx-0 login-body justify-content-center  align-items-center  '>

            <div className='col-6 col-md-4 content p-5 rounded-4'>
                <div className=' mb-4 text-center pb-2 title'>
                    Human Chat
                </div>
                <form className='form' onSubmit={handleSubmit}>
                <div className='form-floating mb-3 '>
                        <input type="email" id="email" className='form-control' placeholder='example@gmail.com' />
                        <label htmlFor='username' style={{ color: "#a1a1aa" }}>email</label>
                    </div> 
                    <div className='form-floating'>
                        <input type="text" id="username" className='form-control' placeholder='pramolbhosale' />
                        <label htmlFor='username' style={{ color: "#a1a1aa" }}>Username</label>
                    </div>
                    <div className='form-floating mt-3'>
                        <input type="password" id="password" className='form-control' placeholder='pramolbhosale' />
                        <label htmlFor='password' style={{ color: "#a1a1aa" }}>Password</label>
                    </div>
                    <button className="btn  mt-4 w-100" type='submit'>Create Account</button>
                </form>

                <div className='text-muted mt-4 text-center'>
                   Already on Human Chat? <Link to="/login">Login</Link>
                </div>
            </div>
        </div>
    )
}


export default Signup