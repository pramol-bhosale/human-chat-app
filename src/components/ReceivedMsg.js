import React, { useContext, useEffect, useRef } from 'react'
import { ChatContext } from '../context/ChatContext';

function ReceivedMsg(props) {
  const {data} =useContext(ChatContext)
  const ref = useRef();
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [props.text]);
  return (
    
    <>
     
     <div ref={ref}  className='col-12 row gx-0 r-chat-box'>
      
          <div className='col-6 row gx-0 mt-4 mb-4'>
             <div className='col-3 text-center'>
                <img src={ `https://avatars.dicebear.com/api/avataaars/${data.user.displayName}.svg`} alt="" className='chat-img'/> 
             </div>
             <div className='col-9 r-chat-text p-2'>
             {props ? props.text : null}
             <div className='text-center'>
             {props.img && 
             <img src={props.img} alt="" className='img-fluid'/>
             } 
             </div>
              
              </div>

              
          </div>


         </div>
    
    </>
  )
}

export default ReceivedMsg