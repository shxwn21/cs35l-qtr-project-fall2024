import React, { useState, useContext } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap';

import {  useNavigate } from 'react-router-dom';
import { UserContext } from '../context/user-context';

const Preference: React.FC = () => {
  const [formData, setFormData] = useState({
    dormType: '',
    numberOfRoommates: '',
    genderOfRoomate: '',
    smoking: '',
    drinking: '',
    riseTime: '',
    sleepTime: '',
    temp: '',
  });
  const navigate = useNavigate();
  const [originalFormData] = useState({ ...formData });
  const context = useContext(UserContext);  
  if(!context.user.isLoggedIn)
    navigate('/');


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:8000/user/update-preferences', {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dormType: formData.dormType,
          numberOfRoommates: Number(formData.numberOfRoommates),
          genderOfRoomate: formData.genderOfRoomate,
          smoking: formData.smoking === 'Yes', // Convert to boolean
          drinking: formData.drinking === 'Yes', // Convert to boolean
          riseTime: formData.riseTime,
          sleepTime: formData.sleepTime,
          temp: formData.temp,
        }),
      });
  
      if (response.ok) {
      
        console.log('Preferences updated successfully!');
        alert('Updated Preferenes Saved!')
        navigate('/home');
      } else {
        console.error(`Preferences update failed. Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error updating preferences:', error);
    }
  };
  
  return (
    <Container>
      <Row className="justify-content-center">
        <Col sm="6">
          <div className="preference-container">
            <h1>Set Your Preferences</h1>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="dormType">Dorm Type:</Label>
                <Input
                  type="select"
                  id="dormType"
                  name="dormType"
                  value={formData.dormType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>
                    Select dorm type
                  </option>
                  <option value="plaza double">Plaza Double</option>
                  <option value="plaza triple">Plaza Triple</option>
                  <option value="plaza double priv bath">Plaza Double Priv Bath</option>
                  <option value="plaza triple priv bath">Plaza Triple Priv Bath</option>
                  <option value="deluxe double">Deluxe Double</option>
                  <option value="deluxe triple">Deluxe Triple</option>
                  <option value="classic double">Classic Double</option>
                  <option value="classic triple">Classic Triple</option>
                  <option value="university apartments">University Apartments</option>
                </Input>
              </FormGroup>

              <FormGroup>
                <Label for="numberOfRoommates">Number of Roommates:</Label>
                <Input
                  type="select"
                  id="numberOfRoommates"
                  name="numberOfRoommates"
                  value={formData.numberOfRoommates}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>
                    Select number of roommates
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </Input>
              </FormGroup>

              <FormGroup>
                <Label for="genderOfRoomate">Roommate Gender:</Label>
                <Input
                  type="select"
                  id="genderOfRoomate"
                  name="genderOfRoomate"
                  value={formData.genderOfRoomate}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>
                    Select roommate gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="nonbinary">Nonbinary</option>
                  <option value="No preference">No preference</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="smoking">Smoking:</Label>
                <Input
                  type="select"
                  id="smoking"
                  name="smoking"
                  value={formData.smoking}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>
                    Select smoking preference
                  </option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="drinking">Drinking:</Label>
                <Input
                  type="select"
                  id="drinking"
                  name="drinking"
                  value={formData.drinking}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>
                    Select drinking preference
                  </option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="temp">Temperature:</Label>
                <Input
                  type="select"
                  id="temp"
                  name="temp"
                  value={formData.temp}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>
                    Select temperature preference
                  </option>
                  <option value="warm">Warm (76-79°F)</option>
                  <option value="medium">Medium (72-75°F)</option>
                  <option value="cold">Cold (68-71°F)</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="riseTime">Rise Time:</Label>
                <Input
                  type="select"
                  id="riseTime"
                  name="riseTime"
                  value={formData.riseTime}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>
                    Select rise time preference
                  </option>
                  <option value="5">5 am</option>
                  <option value="6">6 am</option>
                  <option value="7">7 am</option>
                  <option value="8">8 am</option>
                  <option value="9">9 am</option>
                  <option value="10">10 am</option>
                  <option value="11">11 am</option>
                  <option value="12">12 pm</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="sleepTime">Sleep Time:</Label>
                <Input
                  type="select"
                  id="sleepTime"
                  name="sleepTime"
                  value={formData.sleepTime}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>
                    Select sleep time preference
                  </option>
                  <option value="7">7 pm</option>
                  <option value="8">8 pm</option>
                  <option value="9">9 pm</option>
                  <option value="10">10 pm</option>
                  <option value="11">11 pm</option>
                  <option value="12">12 am</option>
                  <option value="1">1 am</option>
                  <option value="2">2 am</option>
                  <option value="3">3 am</option>
                </Input>
              </FormGroup>
              <Button color="primary" type="submit">
                Save Preferences
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Preference;




