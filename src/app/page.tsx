'use client';
import React from 'react';
import { MapComponent } from './components/map';
import { ChatHistory } from './components/chatHistory';

export default function Home() {

  return (
    <main className='font-sans flex h-[100vh] m-0'>
      <MapComponent center={{ lat: 22.54992, lng: 0 }} />

      <ChatHistory />
    </main>
  );
}


