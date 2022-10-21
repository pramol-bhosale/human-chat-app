import React from 'react'

function ReceivedMsg(props) {
    
  return (
    
    <>
     
     <div className='col-12 row gx-0 r-chat-box'>
          <div className='col-6 row gx-0 mt-4 mb-4'>
             <div className='col-3 text-center'>
                <img src="https://image.shutterstock.com/image-photo/young-handsome-man-beard-wearing-260nw-1768126784.jpg" alt="" className='chat-img'/> 
             </div>
             <div className='col-9 r-chat-text p-3'>
             {props ? props.text : null}
             <br/>
             {props.img && 
             <img src={props.img} alt="" className='img-fluid'/>
             } 
              </div>

              
          </div>


         </div>
    
    </>
  )
}

export default ReceivedMsg