import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/user-context';
import { Input, InputGroup, InputGroupText, Container, Row, Col, Card, CardBody, Button } from 'reactstrap';

const Search: React.FC = (): JSX.Element => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const context = useContext(UserContext);
  const [userId, setUserId] = useState<string>();
  const [userName, setUserName] = useState<string>()
  const handleSearchClick = () => {
    const searchQuery = { name: searchValue };

    fetch('http://localhost:8000/search', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(searchQuery),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setSearchResults(data); 
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

    setSearchValue('');
    setUserName(context.user.firstName);
      setUserId(context.user.userId);
  };

  const handleRoomTogetherClick = async (userData: any) => {
    const userToActionName = userData.firstname;
    console.log(userData);
    const userToActionId = userData._id;
    const actionType = 'like';
    const actionUrl = `http://localhost:8000/look/${actionType}/${userId}/${userToActionId}`;

    const response = await fetch(actionUrl, { method: 'POST', credentials: 'include' });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const loggedInUser = await fetch(`http://localhost:8000/look/getuser/${userId}`, { credentials: 'include' });
    const loggedInUserData = await loggedInUser.json();

    const userToAction = await fetch(`http://localhost:8000/look/getuser/${userToActionId}`, { credentials: 'include' });
    const userToActionData = await userToAction.json();

    if (
      loggedInUserData.usersLiked.includes(userToActionId) &&
      userToActionData.usersLiked.includes(userId)
    ) {
      const data = {
        chatName: `NewChat: ${userName} and ${userToActionName}`,
      };
      try {
        const response = await fetch('http://localhost:8000/chat/create', {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
          });
          if(!response.ok)
          {
              throw new Error('Network response was not ok');
          }
          response.text().then(async responseT => {
            const chatId = JSON.parse(responseT);
            console.log(chatId);
            const user1Data = {
                chatId: chatId,
                userId: userId,
            };
            console.log(user1Data);
            try {
              const response = await fetch('http://localhost:8000/chat/join', {
                  credentials: 'include',
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(user1Data)
                });
                if(!response.ok)
                {
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                console.error('Error:', error);
            }
            
            const user2Data = {
              chatId: chatId,
              userId: userToActionId,
            };
            try {
              const response = await fetch('http://localhost:8000/chat/join', {
                  credentials: 'include',
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(user2Data)
                });
                if(!response.ok)
                {
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                console.error('Error:', error);
            }

          }).catch(error => {
            console.error('Error:', error);
          });
      } catch (error) {
          console.error('Error:', error);
      }

      alert('Matched!'); 
    }
  };



  return (
    <div>
      <div>
        <> </>
        <> </>
      </div>

      <InputGroup size="mg">
        <InputGroupText>
          <button onClick={handleSearchClick}>Search</button>
        </InputGroupText>
        <Input
          placeholder="Search by Name"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </InputGroup>

      {/* Display search results */}
      <Container className="mt-4">
        {searchResults.map((userData, index) => (
          <Row key={index}>
            <Col>
              <Card>
                <CardBody>
                  <p><strong>First Name:</strong> {userData.firstname}</p>
                  <p><strong>Last Name:</strong> {userData.lastname}</p>
                  <p><strong>Gender:</strong> {userData.gender}</p>
                  <p><strong>Year:</strong> {userData.year}</p>
                  <p><strong>Major:</strong> {userData.major}</p>
                  <p><strong>About Me:</strong> {userData.bio}</p>

                 
                  <h4>Preferences</h4>
                  <ul>
                    <li><strong>Dorm Type:</strong> {userData.preferences.dormType}</li>
                    <li><strong>Number of Roommates:</strong> {userData.preferences.numberOfRoommates}</li>
                    <li><strong>Gender of Roommate:</strong> {userData.preferences.genderOfRoomate}</li>
                    <li><strong>Smoking:</strong> {userData.preferences.smoking ? 'Yes' : 'No'}</li>
                    <li><strong>Drinking:</strong> {userData.preferences.drinking ? 'Yes' : 'No'}</li>
                    <li><strong>Rise Time:</strong> {userData.preferences.riseTime}</li>
                    <li><strong>Sleep Time:</strong> {userData.preferences.sleepTime}</li>
                    <li><strong>Temperature:</strong> {userData.preferences.temp}</li>
                  </ul>
                  <div>
                    <Button color="success" size="lg" onClick={() => handleRoomTogetherClick(userData)}>
                      Room Together
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        ))}
      </Container>
    </div>
  );
};

export default Search;
export {};
