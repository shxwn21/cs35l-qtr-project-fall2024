import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
import { UserContext } from '../context/user-context';


const User: React.FC = () => {
  const initialFormData = {
    firstname: '',
    lastname: '',
    bio: '',
    gender: '',
    year: '',
    major: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();
  const context = useContext(UserContext);
  
  useEffect(() => {
    
    const savedData = localStorage.getItem('userFormData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
    if(!context.user.isLoggedIn)
      navigate('/');
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/user/update-user-info', {
      credentials: 'include',
      method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname: formData.firstname,
          lastname: formData.lastname,
          bio: formData.bio,
          gender: formData.gender,
          year: formData.year,
          major: formData.major,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log('User info updated successfully!');
      localStorage.setItem('userFormData', JSON.stringify(formData));
      alert('Updated User Info');
      navigate('/home');
    } catch (error) {
      console.error('Error updating user info:', error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col sm="6">
          <div className="user-info-container">
            <h1>User Information</h1>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="firstname">First Name:</Label>
                <Input
                  type="text"
                  id="firstname"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="lastname">Last Name:</Label>
                <Input
                  type="text"
                  id="lastname"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="bio">Bio:</Label>
                <Input
                  type="textarea"
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="gender">Gender:</Label>
                <Input
                  type="select"
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="year">Year:</Label>
                <Input
                  type="text"
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="major">Major:</Label>
                <Input
                  type="text"
                  id="major"
                  name="major"
                  value={formData.major}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <Button color="primary" type="submit">
                Save
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default User;
