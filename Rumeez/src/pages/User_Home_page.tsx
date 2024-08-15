//User_Home_page
import React from 'react';
import {Link} from 'react-router-dom'
import {useNavigate } from 'react-router-dom';





interface User_Info {
      //Number of roommates
    roommates: number
      //Room mate gender
    genderOfRoomate: string
    smoking: boolean
    drinking: boolean
    riseTime: string
    sleepTime: string
    temp: string  
}


interface User_data_props {
  user_data: number | boolean | string
  label: string
}
const User_Info_Button: React.FC<User_data_props> = ({user_data, label}) => {


    //Converts User_Info data to string format
  function converDataToString(value: number | boolean | string) {
      if(typeof value !== 'string') {
              //returns parameter in string format
          return JSON.stringify(value);
      }


      return value;
  }


   // Intermediary function to handle the event and pass value to handleDataConversion


    return(
      <p>  {label}:  {converDataToString(user_data)} </p>
    );
}


function User_settings () {
 
  //function handleUserSettings(): void { setNavigation_path('pages/User_Settings_and_Info') }
  return(
    <Link to="/pages/User_Settings_and_Info">
        <button>
              Link to User Settings and Info
        </button>
    </Link>
  );
}


function User_Home_Page () {


  //Prototype to fill params until can figure out
      // how to fill in the params with backend data
      // retrieval
  const userInfo: User_Info = {
    roommates: 2,
    genderOfRoomate: "male",
    smoking: true,
    drinking: false,
    riseTime: "7 AM",
    sleepTime: "11 PM",
    temp: "warm"
  };

  //let temp_data = "waiting_for_backend"

  return (
    <div>
        <div>
          <User_Info_Button user_data={userInfo.roommates} label="Number of roommates: " />
        </div>


        <div>
          <User_Info_Button user_data={userInfo.genderOfRoomate} label="Gender of Roommates: " />
        </div>


        <div>
          <User_Info_Button user_data={userInfo.riseTime} label="RiseTime: " />
        </div>


        <div>
          <User_Info_Button user_data={userInfo.sleepTime} label="BedTime: " />
        </div>


        <div>
          <User_Info_Button user_data={userInfo.temp} label="Room Temperature: " />
        </div>


        <div>
          <User_Info_Button user_data={userInfo.smoking} label="Smoke: " />
        </div>


        <div>
          <User_Info_Button user_data={userInfo.drinking} label="Drink: " />
          {/* Other JSX elements */}
        </div>
       
        <User_settings /> 
        {/*TODO: Add drop-down for top three room choices*/}
                
  </div>
  );
}


export default User_Home_Page;
