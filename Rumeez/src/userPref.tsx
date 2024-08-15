// userPref.tsx
import React, { useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function UserPref() {
    const [year, setYear] = useState('');
    const [gender, setGender] = useState('');
    const [smoke, setSmoke] = useState('');
    const [drink, setDrink] = useState('');
    const [rise, setRise] = useState('');
    const [sleep, setSleep] = useState('');
    const [temp, setTemp] = useState('');
    const [numRoommates, setNumRoommates] = useState('');
    const [dorm1, setDorm1] = useState('');
    const [dorm2, setDorm2] = useState('');
    const [dorm3, setDorm3] = useState('');
    const navigate = useNavigate();

    //event handler for dropdown changes
    const handleInputChange = (event: ChangeEvent<HTMLSelectElement>) => {
     const {name, value} = event.target

     const handleGoBack = () => {
        navigate('/userInfo')
     };

    //  //TODO: insert link to profile page
    //  const handleNext = () => {
    //     navigate('/userInfo')
    //  };

    //update state based on dropdown that changed
    switch(name){
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
        case 'temp':
            setTemp(value);
            break;
        case 'numRoommates':
            setNumRoommates(value);
            break;
        case 'dorm1':
            setDorm1(value);
            break;
        case 'dorm2':
            setDorm2(value);
            break;
        case 'dorm3':
            setDorm3(value);
            break;
    }
};

    const handleGoBack = () => {
        navigate('/userInfo');
      };

    return (
        <div>
            <h1>Tell us what you want.</h1>

             {/* Dropdown for Year */}
            <label htmlFor="year">Year:</label>
            <select name="year" id="year" value={year} onChange={handleInputChange}>
                <option value="" disabled selected>
                    What year would you like your roommate to be?
                </option>
                <option value="freshman">Freshman</option>
                <option value="sophomore">Sophomore</option>
                <option value="junior">Junior</option>
                <option value="senior">Senior</option>
                <option value="any">Doesn't matter</option>
             </select>

            {/* dropdown for gender*/}
        <label htmlFor="gender">Gender:</label>
        <select name="gender" id="gender" value={gender} onChange={handleInputChange}>
            <option value="" disabled selected>
                What gender would you like your roommate to be?
            </option>
         <option value="female">Female</option>
         <option value="male">Male</option>
         <option value="nonbinary">Nonbinary</option>
         <option value="any">Doesn't matter</option>
        </select>


      {/* dropdwon for smoking */}
      <label htmlFor="smoke">Smoking:</label>
      <select name="smoke" id="smoke" value={smoke} onChange={handleInputChange}>
        <option value="" disabled selected>
          Enter your roommate smoking preference.
        </option>
        <option value="often">Often</option>
        <option value="never">Never</option>
        <option value="sometimes">Sometimes/Ask me</option>
      </select>

        {/* dropdwon for drinking */}
        <label htmlFor="smoke">Drinking:</label>
      <select name="drink" id="drink" value={drink} onChange={handleInputChange}>
        <option value="" disabled selected>
          Enter your roommate drinking preference.
        </option>
        <option value="often">Often</option>
        <option value="never">Never</option>
        <option value="sometimes">Sometimes/Ask me</option>
      </select>

        {/*dropdown for rise */}
      <label htmlFor="rise">Rise Time:</label>
      <select name="rise" id="rise" value={rise} onChange={handleInputChange}>
        <option value="" disabled selected>
          Enter your roommate rise time preference.
        </option>
        <option value="5">5 am</option>
        <option value="6">6 am</option>
        <option value="7">7 am</option>
        <option value="8">8 am</option>
        <option value="9">9 am</option>
        <option value="10">10 am</option>
        <option value="11">11 am</option>
        <option value="12">12 pm</option>
        <option value="any">Doesn't matter</option>
      </select>

      {/*dropdown for sleep */}
      <label htmlFor="sleep">Sleep Time:</label>
      <select name="sleep" id="sleep" value={sleep} onChange={handleInputChange}>
        <option value="" disabled selected>
        Enter your roommate sleep time preference.
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

    {/*dropdown for temp */}
    <label htmlFor="sleep">Temperature:</label>
      <select name="temp" id="temp" value={temp} onChange={handleInputChange}>
        <option value="" disabled selected>
        Enter your temperature preference.
        </option>
        <option value="warm">Cold (68-71°F)</option>
        <option value="medium">Medium (72-75°F)</option>
        <option value="Warm">Warm(76-79°F)</option>
      </select>

          {/*dropdown for numRoommates */}
    <label htmlFor="numRoommates">Number of Roommates:</label>
      <select name="numRoommates" id="numRoommates" value={numRoommates} onChange={handleInputChange}>
        <option value="" disabled selected>
        How many roommmates would you like?
        </option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
      </select>

                {/*dropdown for dorm1 */}
    <label htmlFor="dorm1">First choice housing type:</label>
      <select name="dorm1" id="dorm1" value={dorm1} onChange={handleInputChange}>
        <option value="" disabled selected>
        Enter a housing preference.
        </option>
        <option value="plazadouble">Plaza Double</option>
        <option value="plazatriple">Plaza Triple</option>
        <option value="plazadoubleprivbath">Plaza Double Priv Bath</option>
        <option value="plazatripleprivbath">Plaza Triple Priv Bath</option>
        <option value="deluxedouble">Deluze Triple</option>
        <option value="deluxetriple">Deluxe Triple</option>
        <option value="classicdouble">Classic Double</option>
        <option value="classictriple">Classic Triple</option>
        <option value="universityapartments">University Apartments</option>
      </select>

                      {/*dropdown for dorm2 */}
    <label htmlFor="dorm2">Second choice housing type:</label>
      <select name="dorm2" id="dorm2" value={dorm2} onChange={handleInputChange}>
        <option value="" disabled selected>
        Enter a housing preference.
        </option>
        <option value="plazadouble">Plaza Double</option>
        <option value="plazatriple">Plaza Triple</option>
        <option value="plazadoubleprivbath">Plaza Double Priv Bath</option>
        <option value="plazatripleprivbath">Plaza Triple Priv Bath</option>
        <option value="deluxedouble">Deluze Triple</option>
        <option value="deluxetriple">Deluxe Triple</option>
        <option value="classicdouble">Classic Double</option>
        <option value="classictriple">Classic Triple</option>
        <option value="universityapartments">University Apartments</option>
      </select>

                            {/*dropdown for dorm2 */}
    <label htmlFor="dorm3">Third choice housing type:</label>
      <select name="dorm3" id="dorm3" value={dorm3} onChange={handleInputChange}>
        <option value="" disabled selected>
        Enter a housing preference.
        </option>
        <option value="plazadouble">Plaza Double</option>
        <option value="plazatriple">Plaza Triple</option>
        <option value="plazadoubleprivbath">Plaza Double Priv Bath</option>
        <option value="plazatripleprivbath">Plaza Triple Priv Bath</option>
        <option value="deluxedouble">Deluze Triple</option>
        <option value="deluxetriple">Deluxe Triple</option>
        <option value="classicdouble">Classic Double</option>
        <option value="classictriple">Classic Triple</option>
        <option value="universityapartments">University Apartments</option>
      </select>

      <button onClick={(handleGoBack)}>Go Back</button>
      <button>Next</button>

        </div>
    );
}

export default UserPref;