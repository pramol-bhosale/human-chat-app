import React from 'react'
import Chats from '../components/Chats'
import Panel from '../components/Panel'
import Navbar from '../components/Navbar'
function Home() {
  return (
    <div className='row gx-0 vh-100 home-body  align-items-center'>
      <div className='row gx-0 justify-content-center ' style={{height:"600px"}}>
        <div className='col-4 sidebar'>
          <Navbar />
          <Panel />
        </div>
        <div className='col-6 chat-parent'>
          <Chats />
        </div>
      </div>
      <div className='col-12 text-center end-caption'>
        Human Chat made by pramol-bhosale &#11088;
      </div>

    </div>
  )
}


export default Home