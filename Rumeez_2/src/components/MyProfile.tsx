import React, { useEffect, useState, useContext } from 'react';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import { UserContext } from '../context/user-context';

const MyProfile: React.FC = (): JSX.Element => {
  const [userData, setUserData] = useState<any>(null);
  const context = useContext(UserContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/look/getuser/${context.user.userId}`, {
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const user = await response.json();
        setUserData(user);
      } catch (error) {
        console.error('Error fetching user data:', error);
        
      }
    };

    fetchUserData();
  }, [context.user.userId]);

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h3>Your Profile</h3>
          {userData && (
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
              </CardBody>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default MyProfile;
