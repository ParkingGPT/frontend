import React, { useState } from 'react';
import { Slide, IconButton } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export const ChatHistory = () => {
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
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
                {<textarea className="chat-box h-[50vh] w-[70vw] overflow-y-scroll mb-1 border-black rounded-[0.5vh] bg-aliceblue" id="chat-box"></textarea>}
            </Slide>

        </div>
    );
}