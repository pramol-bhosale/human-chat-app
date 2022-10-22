import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../context/AuthContext';

function SendMsg(props) {
  const ref = useRef();
  const {currentUser} =useContext(AuthContext)
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [props.text]);
  return (
    
    <>
     
     <div ref={ref} className='col-12 row gx-0 s-chat-box mt-4 mb-4'>
          <div className='offset-6 col-6 row gx-0 justify-content-end'>
             
             <div className='col-9 s-chat-text p-2'>
             {props ? props.text : null}
             <div className='text-center'>
             {props.img && 
             <img src={props.img} alt="" className='img-fluid'/>
             } 
             </div>
             </div>
             <div className='col-3 text-center'>
                <img src={`https://avatars.dicebear.com/api/avataaars/${currentUser.displayName}.svg`} alt="" className='chat-img'/> 
             </div>
          </div>


         </div>
    </>
  )
}

export default SendMsg