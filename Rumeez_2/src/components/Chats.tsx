import React, { useEffect, useState } from "react";
import { Button } from "reactstrap"
import { useNavigate } from 'react-router-dom';

const Chats: React.FunctionComponent = (): JSX.Element => {
  const [chats, setChats] = useState([]);
  const [chatNames, setNames] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => 
  {
    fetch('http://localhost:8000/user', {
    credentials: 'include' // Ensures cookies are included with the request
    })
    .then(response =>
      {
        if(!response.ok)
        {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
          const userChats = data.chats;
          setChats(userChats);
      })
      .catch(error => console.error('Fetch error', error));
    }, []);

  useEffect(() => {
    const fetchChatNames = async () => {
        try {
            const namesArray = [];

            for (const chatId of chats) {
                const response = await fetch(`http://localhost:8000/chat/get/${chatId}`, {
                    credentials: 'include'
                });

                if (!response.ok) {
                  console.log(chatId)
                  throw new Error('Network response was not ok');
                }

                const chatData = await response.json();
                namesArray.push(chatData.chatName); // Assuming 'name' is the property in the response
            }

            // namesArray now contains the names corresponding to each chatId
            setNames(namesArray);

        } catch (error) {
            console.error('Fetch error', error);
        }
    };

    if (chats.length > 0) {
        fetchChatNames();
    }
  }, [chats]); // Re-run when chats array changes

  const handleChatClick = (chatId: string) => {
    navigate(`/chat/${chatId}`);
  }
  return <div>
    <h1 style={{ textAlign: "center" }}>Chats</h1>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", marginTop: "20px" }}>
      {chats.map((id, index) => (
        <Button 
          key={index} 
          style={{ 
            backgroundColor: 'white', // Alternate colors
            color: 'black', // Text color for readability
            width: '60%' // Set a specific width for uniformity
          }} 
          onClick={() => handleChatClick(id)}
        >
          {chatNames[index]}
        </Button>
      ))}
    </div>
  </div>
};


export default Chats;