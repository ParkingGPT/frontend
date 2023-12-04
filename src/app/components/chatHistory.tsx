import React, { useState, useEffect } from 'react';
import { Slide, IconButton, Button, FormControl, InputAdornment, OutlinedInput } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SendIcon from '@mui/icons-material/Send';
import * as chat from '@/utils/chat.utils';

export const ChatHistory = () => {
    const [expanded, setExpanded] = useState(false);
    const [messages, setMessages] = useState<string[]>([]);

    const [chatText, setChatText] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setChatText(event.target.value);
    };

    const messagesToString = () => {
        if(messages.length === 0) return '';
        return messages.join('\n');
    };

    const handleSendClick = () => {
        messages.push("user: " + chatText)
        setMessages(messages);
        if (messages.length === 0) { 
            chat.initSession("1").then((res) => {
                    messages.push(res)
                    setMessages(messages);
                });
        }
        if (chatText.trim()) {
            setChatText('');
            setExpanded(true);
            setIsTyping(true);
            chat.handleChat("1", chatText).then((res) => {
                messages.push(res)
                setMessages(messages);
                setIsTyping(false);
            });
        }
    };

    // useEffect(() => {
    //     const _ = chat.initSession("1").then((res) => {
    //         const message = res.message
    //         setMessages([...messages, res]);
    //     });
    // }, [messages]);

    return (
        <>
            <div className='arrow absolute bottom-[15vh] w-[100vw] flex flex-wrap justify-center'>
                <div>
                    <div className='flex flex-wrap justify-center mb-2'>
                        {!expanded &&
                            <IconButton className='bg-slate-50' aria-label="expand" size="small" onClick={() => { setExpanded(!expanded) }}>
                                <KeyboardArrowUpIcon fontSize="small" />
                            </IconButton>
                        }
                        {expanded &&
                            <IconButton className='bg-slate-50' aria-label="expand" size="small" onClick={() => { setExpanded(!expanded) }}>
                                <KeyboardArrowDownIcon fontSize="small" />
                            </IconButton>
                        }
                    </div>
                    <Slide direction="up" in={expanded} mountOnEnter unmountOnExit>
                        {<textarea className="chat-box h-[50vh] w-[70vw] overflow-y-scroll mb-1 border-black rounded-[0.5vh] bg-aliceblue" id="chat-box" value={messagesToString()}>
                        </textarea>}
                    </Slide>
                </div>
            </div>
            <div className="chat-container absolute bottom-[5vh] flex flex-wrap w-[100vw] justify-center gap-2">
                <FormControl sx={{
                    backgroundColor: 'white',
                    width: '60vw',
                }}>
                    <OutlinedInput
                        id="outlined-chat-input"
                        value={chatText}
                        onChange={handleInputChange}
                        startAdornment={<InputAdornment position="start">~</InputAdornment>}
                    />
                </FormControl>
                <Button variant="contained"
                    onClick={handleSendClick}
                    endIcon={<SendIcon />} sx={{
                        backgroundColor: "#1976d2!important",
                    }}>
                    Send
                </Button>
            </div>
        </>
    );
}