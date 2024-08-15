// createAccount.tsx

import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from './InputField';
import { Link } from 'react-router-dom';

interface CreateAccountProps {
  // Define any specific props for CreateAccount, if needed
}

//Add new stuff

// Define the CreateAccount component as a functional component
const CreateAccount: React.FC<CreateAccountProps> = () => {

  // Define two state variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Destructure the 'name' and 'value' from the event.target
    const { name, value } = event.target;

    // Use a switch statement to update the corresponding state based on the input field name
    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  };


  const handleCreateAccount = () => {
    // Implement logic to handle creating an account (currently just logging)
    console.log('Creating account with email:', email, 'and password:', password);

    navigate('/userInfo');
  };

  const handleGoBack = () => {
    navigate('/');
  };

  // Return the JSX for the CreateAccount component
  return (
    <div>
    <h1>Let's get started.</h1>
      {/* Render the InputField component for the email input */}
      <InputField
        label="Email:"
        name="email"
        value={email}
        onChange={handleInputChange}
        placeholder="Enter your email"
      />

      {/* Render the InputField component for the password input */}
      <InputField
        label="Password:"
        name="password"
        value={password}
        onChange={handleInputChange}
        placeholder="Enter your password"
      />

      {/* Render a button that triggers the handleCreateAccount function on click */}
      <button onClick={handleGoBack}>Go Back</button>
      <button onClick={handleCreateAccount}>Create Account</button>
    </div>
  );
};

// Export the CreateAccount component as the default export of this file
export default CreateAccount;
