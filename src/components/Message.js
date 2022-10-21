import React from 'react'

function Message({c}) {
    console.log(c)
  return (
    <div>
        {c.senderId}
    </div>
  )
}

export default Message