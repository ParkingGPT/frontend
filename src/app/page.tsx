'use client';
import React from 'react';
import { MapComponent } from './components/map';
import { ChatHistory } from './components/chatHistory';
import { FormControl, OutlinedInput, InputAdornment, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export default function Home(){

  return (
    <main className='font-sans flex h-[100vh] m-0'>
      <MapComponent center={{ lat: 22.54992, lng: 0 }} />
      <div className='arrow absolute bottom-[15vh] w-[100vw] flex flex-wrap justify-center'><ChatHistory /></div>
      <div className="chat-container absolute bottom-[5vh] flex flex-wrap w-[100vw] justify-center gap-2">
        <FormControl sx={{
            backgroundColor: 'white',
            width: '60vw',
          }}>
            <OutlinedInput
              id="outlined-chat-input"
              startAdornment={<InputAdornment position="start">~</InputAdornment>}
            />
          </FormControl>
          <Button variant="contained" endIcon={<SendIcon />} sx={{
            backgroundColor: "#1976d2!important",
        }}>
          Send
          </Button>
    </div>
    </main>
  );
}


