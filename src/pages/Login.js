import React, {useState} from 'react'
import  {auth} from '../firebase'
import {signInWithEmailAndPassword} from "firebase/auth"
import {useNavigate,Link} from 'react-router-dom'
function Login() {
const [error , setError]=useState(false)
const navigate= useNavigate()
const handleSubmit=async(event)=>{
    console.log("form submitted")
    event.preventDefault();
const email= event.target[0].value
const password=event.target[1].value
await signInWithEmailAndPassword(auth, email, password)
.then((userCredential) => {
  navigate("/")
})
.catch((err) => {
setError(true)
});
}



    return (
        <div className='row vh-100 gx-0 login-body justify-content-center  align-items-center  '>

            <div className='col-6 col-md-4 content p-5 rounded-4'>
                <div className=' mb-4 text-center pb-2 title'>
                    Human Chat
                </div>
                <form className='form ' onSubmit={handleSubmit}>
                    <div className='form-floating'>
                        <input type="email" id="username" className='form-control' placeholder='pramolbhosale' />
                        <label htmlFor='username' style={{ color: "#a1a1aa" }}>Email</label>
                    </div>
                    <div className='form-floating mt-3'>
                        <input type="password" id="password" className='form-control' placeholder='pramolbhosale' />
                        <label htmlFor='password' style={{ color: "#a1a1aa" }}>Password</label>
                    </div>
                    <button className="btn  mt-4 w-100" type='submit'>Login</button>
                </form>
                
                <div className='text-muted mt-4 text-center'>
                    {error && <span>Something went wrong<br/></span>}
                    
                    Not on Human Chat yet? <Link to="/register">Register</Link>
                </div>
            </div>
        </div>
    )
}


export default Login