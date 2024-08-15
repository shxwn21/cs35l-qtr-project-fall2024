import React, { useState, useEffect } from 'react';
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
  InputGroup,
  InputGroupText,
} from 'reactstrap';

const Signup: React.FC = () => {
  const initialFormData = {
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    bio: '',
    gender: '',
    year: '',
    major: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedData = localStorage.getItem('userFormData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem('userFormData', JSON.stringify(formData));

    try {
      const response = await fetch('http://localhost:8000/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      console.log('Signup successful!', result);

      navigate('/');
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col sm="6">
          <div className="signup-container">
            <h1>Create an Account</h1>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="email">Email:</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password:</Label>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <InputGroupText>
                    <Input
                      type="checkbox"
                      onChange={handleShowPasswordToggle}
                    />{' '}
                    Show Password
                  </InputGroupText>
                </InputGroup>
              </FormGroup>
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
                  <option value="man">Man</option>
                  <option value="woman">Woman</option>
                  <option value="non-binary">Non-binary</option>
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
                Sign Up
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
