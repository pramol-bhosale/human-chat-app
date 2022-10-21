import React, { useEffect, useRef } from 'react'

function SendMsg(props) {
  const ref = useRef();
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
                <img src="https://image.shutterstock.com/image-photo/young-handsome-man-beard-wearing-260nw-1768126784.jpg" alt="" className='chat-img'/> 
             </div>
          </div>


         </div>
    </>
  )
}

export default SendMsg