'use client';
import React, { MouseEvent, useState } from 'react';

// const ClickableInput: React.FC = () => {
//   const handleClick = (evt: MouseEvent) => {
//     // Implement click functionality here
//     alert('Message sent!');
//   };

//   return (
//     <input
//         type="text"
//         placeholder="Click me"
//         onClick={handleClick}
//         style={{
//             padding: '10px',
//             paddingLeft: '15px',
//             width: '80vw',
//             height: '5vh',
//             borderRadius: '2vh',
//             borderColor: 'black',
//             borderWidth: '1.5px'
//         }}
//     />
//   );
// };

// const App = () => {
//   const sendMessage = () => {
//     // Implement send message functionality
//     alert('Input clicked!');
//   };

//   return (
//     <main>
//       <div>
//         <ClickableInput />
//         <span className="popuptext" id="myPopup">Popup text...</span>
//       </div>
//       <button className="send" onClick={sendMessage}>Send</button>
//     </main>
//   );
// };

// export default App;

const ChatInput: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [displayText, setDisplayText] = useState<string>('');
  const [showDisplayBox, setShowDisplayBox] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputText(event.target.value);
  };

  const handleSubmit = () => {
      setDisplayText(inputText);
      setInputText(''); // Clear input field
      setShowDisplayBox(true);
  };

  const handleInputClick = () => {
      setShowDisplayBox(false); // Hide display box when input is clicked
  };

  return (
      <div style={{ position: 'fixed', bottom: 0, width: '100%' }}>
          {showDisplayBox && (
              <div style={{ marginBottom: '40px', padding: '10px', border: '1px solid black' }}>
                  {displayText}
              </div>
          )}
          <input
              type="text"
              value={inputText}
              onChange={handleInputChange}
              onClick={handleInputClick}
              style={{ width: '100%', padding: '10px' }}
          />
          <button onClick={handleSubmit}>Send</button>
      </div>
  );
};

const App: React.FC = () => {
  return (
      <div>
          <ChatInput />
      </div>
  );
};

export default App;