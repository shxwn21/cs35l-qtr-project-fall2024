// userInfo.tsx
import React, { useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



function UserInfo() {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [year, setYear] = useState('');
  const [major, setMajor] = useState('');
  const [gender, setGender] = useState('');
  const [smoke, setSmoke] = useState('');
  const [drink, setDrink] = useState('');
  const [rise, setRise] = useState('');
  const [sleep, setSleep] = useState('');
  const navigate = useNavigate();

  // Event handler for dropdown changes
  const handleInputChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;


    // Update the state based on the dropdown that changed
    switch (name) {
      case 'year':
        setYear(value);
        break;
      case 'gender':
        setGender(value);
        break;
      case 'smoke':
        setSmoke(value);
        break;
      case 'drink':
        setDrink(value);
        break;
      case 'rise':
        setRise(value);
        break;
      case 'sleep':
        setSleep(value);
        break;
      default:
        break;
    }
  };

  const handleGoBack = () => {
    navigate('/createAccount');
  };

  const handleNext = () => {
    navigate('/userPref');
  };

  return (
    <div>
      <h1>Tell us about yourself.</h1>

      {/* Text input for Name */}
      <label htmlFor="name">Name:</label>
      <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />

      {/* Test input for Bio */}
      <label htmlFor="bio">Bio:</label>
      <input type="text" name="bio" id="bio" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Enter a short bio" />

      {/* Dropdown for Year */}
      <label htmlFor="year">Year:</label>
      <select name="year" id="year" value={year} onChange={handleInputChange}>
        <option value="" disabled selected>
          Select a year
        </option>
        <option value="freshman">Freshman</option>
        <option value="sophomore">Sophomore</option>
        <option value="junior">Junior</option>
        <option value="senior">Senior</option>
      </select>

      {/* Text input for Major */}
      <label htmlFor="major">Major:</label>
      <input type="text" name="major" id="major" value={major} onChange={(e) => setMajor(e.target.value)} placeholder="Enter your major" />

      {/* dropdown for gender*/}
      <label htmlFor="gender">Gender:</label>
      <select name="gender" id="gender" value={gender} onChange={handleInputChange}>
        <option value="" disabled selected>
          Enter your gender
        </option>
        <option value="female">Female</option>
        <option value="male">Male</option>
        <option value="nonbinary">Nonbinary</option>
      </select>

      {/* dropdwon for smoking */}
      <label htmlFor="smoke">Smoking:</label>
      <select name="smoke" id="smoke" value={smoke} onChange={handleInputChange}>
        <option value="" disabled selected>
          Do you smoke?
        </option>
        <option value="often">Often</option>
        <option value="never">Never</option>
        <option value="sometimes">Sometimes/I'll ask</option>
      </select>

      {/* dropdwon for drinking */}
      <label htmlFor="drink">Drinking:</label>
      <select name="drink" id="drink" value={drink} onChange={handleInputChange}>
        <option value="" disabled selected>
          Do you drink?
        </option>
        <option value="often">Often</option>
        <option value="never">Never</option>
        <option value="sometimes">Sometimes/I'll ask</option>
      </select>

      {/*dropdown for rise */}
      <label htmlFor="rise">Rise Time:</label>
      <select name="rise" id="rise" value={rise} onChange={handleInputChange}>
        <option value="" disabled selected>
          When do you wake up?
        </option>
        <option value="5">5 am</option>
        <option value="6">6 am</option>
        <option value="7">7 am</option>
        <option value="8">8 am</option>
        <option value="9">9 am</option>
        <option value="10">10 am</option>
        <option value="11">11 am</option>
        <option value="12">12 pm</option>
      </select>

      {/*dropdown for sleep */}
      <label htmlFor="sleep">Sleep Time:</label>
      <select name="sleep" id="sleep" value={sleep} onChange={handleInputChange}>
        <option value="" disabled selected>
          When do you go to bed?
        </option>
        <option value="8">8 pm</option>
        <option value="9">9 pm</option>
        <option value="10">10 pm</option>
        <option value="11">11 pm</option>
        <option value="12">12 am</option>
        <option value="1">1 am</option>
        <option value="2">2 am</option>
        <option value="3">3 am</option>
      </select>
      {/* Your user information content goes here */}
      
      <button onClick={handleGoBack}>Go Back</button>
      {/* Add a link to navigate back to the home page */}
      <button onClick={handleNext}>Next</button>
    </div>
  );
}

export default UserInfo;


