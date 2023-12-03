// import React, { useEffect, useState } from 'react';
// import { FormControl, OutlinedInput, InputAdornment, Button } from '@mui/material';
// import SendIcon from '@mui/icons-material/Send';
// import * as utils from '@/utils/chat.utils';

// export const ChatBlock = () => {
//     const [message, setMessage] = useState('');

//     const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
//         setMessage(event.target.value);
//     };

//     const handleSendClick = () => {
//         if (message.trim()) {
//             utils.handleChat("1", message);
//             setMessage('');
//         }
//     };

//     return (
//         <div className="chat-container absolute bottom-[5vh] flex flex-wrap w-[100vw] justify-center gap-2">
//             <FormControl sx={{
//                 backgroundColor: 'white',
//                 width: '60vw',
//             }}>
//                 <OutlinedInput
//                     id="outlined-chat-input"
//                     value={message}
//                     onChange={handleInputChange}
//                     startAdornment={<InputAdornment position="start">~</InputAdornment>}
//                 />
//             </FormControl>
//             <Button variant="contained"
//                 onClick={handleSendClick}
//                 endIcon={<SendIcon />} sx={{
//                     backgroundColor: "#1976d2!important",
//                 }}>
//                 Send
//             </Button>
//         </div>
//     )
//     return <>
//         <FormControl sx={{
//             backgroundColor: 'white',
//             width: '60vw',
//         }}>
//             <OutlinedInput
//                 id="outlined-chat-input"
//                 value={message}
//                 onChange={handleInputChange}
//                 startAdornment={<InputAdornment position="start">~</InputAdornment>}
//             />
//         </FormControl>
//         <Button variant="contained"
//             onClick={handleSendClick}
//             endIcon={<SendIcon />} sx={{
//             backgroundColor: "#1976d2!important",
//         }}>
//             Send
//         </Button>
//     </>;
// };