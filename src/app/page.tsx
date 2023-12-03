'use client';
import React, { MouseEvent } from 'react';

export default function Home(){
  let show: boolean | undefined = false;


  const handleBox = () => {
    if(!show){
      show = true;
      return true;
    }else{
      show = false
      return false;
    }
  }

  return (
    <main>
      <div className="chat-container">
        <textarea className="chat-box" id="chat-box"></textarea>
        <input onClick={handleBox} type="text" id="texting" placeholder="Type your message..."></input>
        <button className='send'/*onClick="sendMessage()"*/>Send</button>
    </div>
    </main>
  );
}


