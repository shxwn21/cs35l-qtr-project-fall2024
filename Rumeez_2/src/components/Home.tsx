import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/user-context';
import { Container, Row, Col, Button, Card, CardBody, Spinner } from 'reactstrap';

const Home: React.FunctionComponent = (): JSX.Element => {
  const [data, setData] = useState<any>(null);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [currentUserData, setCurrentUserData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const context = useContext(UserContext);

  const getUserName = async function(userId: string) {
    try {
      const response = await fetch(`http://localhost:8000/look/getuser/${userId}`, {
          credentials: 'include' // Ensures cookies are included with the request
      });

      if (!response.ok) {

        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data.firstname; 
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }
  useEffect(() => {
    const backendUrl = 'http://localhost:8000/look';

    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await fetch(backendUrl, { credentials: 'include' });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }


        
        const userScores = await response.json();
        setData(userScores);
      
        const list = Object.keys(userScores || {});
      if (list.length === 0) {
        alert('Liked or Skipped all users');
        return;
      }


        const userIds = Object.keys(userScores || {});
        const userId = userIds[currentUserIndex];
        console.log(userId);
        if(userId === undefined)
        {
          alert('No More Users');
          return;
        }
        const userResponse = await fetch(`http://localhost:8000/look/getuser/${userId}`, { credentials: 'include' });

        if (!userResponse.ok) {
          throw new Error(`HTTP error! Status: ${userResponse.status}`);
        }
        

        const userData = await userResponse.json();
        setCurrentUserData(userData);
      } catch (error) {
        console.error('Error fetching data:', error);

        if (!context.user.isLoggedIn) {
          navigate('/');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [context, navigate, currentUserIndex]);

  const handleAction = async (actionType: 'like' | 'skip') => {
    if (loading) return;
    setLoading(true);

    

    try {
      const userIds = Object.keys(data || {});
      if (userIds.length === 0) {
        alert('No More Users');
        return;
      }
      const userId = context.user.userId;
      const userToActionId = userIds[currentUserIndex];
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
        // If both users have liked each other, show a matched popup
        const curName = await getUserName(userId as string);
        const otherName = await getUserName(userToActionId as string);
        const data = {
            chatName: `NewChat: ${curName} and ${otherName}`,
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

      setCurrentUserIndex((prevIndex) => (prevIndex + 1) % userIds.length);
    } catch (error) {
      console.error(`Error during ${actionType}:`, error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#aee3f5', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Container className="mt-4" style={{ backgroundColor: '#ffff00', padding: '20px', borderRadius: '10px', position: 'relative' }}>
        {loading && <Spinner color="primary" />}
        {data && currentUserData && !loading && (
          <Card>
            <CardBody>
              <Row className="mb-4">
                <Col>
                  <h3>User Details</h3>
                  <p><strong>First Name:</strong> {currentUserData.firstname}</p>
                  <p><strong>Last Name:</strong> {currentUserData.lastname}</p>
                  <p><strong>Gender:</strong> {currentUserData.gender}</p>
                  <p><strong>Year:</strong> {currentUserData.year}</p>
                  <p><strong>Major:</strong> {currentUserData.major}</p>
                  <p><strong>About Me:</strong> {currentUserData.bio}</p>
                </Col>
                <Col>
                  <h3>Preferences</h3>
                  <p><strong>Dorm Type:</strong> {currentUserData.preferences.dormType}</p>
                  <p><strong>Number of Roommates:</strong> {currentUserData.preferences.numberOfRoommates}</p>
                  <p><strong>Gender of Roommate:</strong> {currentUserData.preferences.genderOfRoomate}</p>
                  <p><strong>Smoking:</strong> {currentUserData.preferences.smoking ? 'Yes' : 'No'}</p>
                  <p><strong>Drinking:</strong> {currentUserData.preferences.drinking ? 'Yes' : 'No'}</p>
                  <p><strong>Rise Time:</strong> {currentUserData.preferences.riseTime}</p>
                  <p><strong>Sleep Time:</strong> {currentUserData.preferences.sleepTime}</p>
                  <p><strong>Temperature:</strong> {currentUserData.preferences.temp}</p>
                </Col>
              </Row>
            </CardBody>
          </Card>
        )}
      </Container>

      {data && currentUserData && !loading && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <h2 style={{ fontWeight: 'bold', fontSize: '24px', marginBottom: '10px' }}>
            Compatibility Score: {((data[Object.keys(data)[currentUserIndex]] || 0) * 100).toFixed(2)}%
          </h2>
          {/* Room Together and Skip Buttons */}
          <div>
            <Button color="success" size="lg" onClick={() => handleAction('like')} className="me-2">
              Room Together
            </Button>
            <Button color="primary" size="lg" onClick={() => handleAction('skip')}>
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
  
  
};

export default Home;
