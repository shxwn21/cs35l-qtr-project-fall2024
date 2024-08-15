
//TODO List:
//1) Create a new file for every link to a new page 
//   and title it after that page. 
//2) Move the main app component to its own seperate file
//3) Import app to every page to ensure that access to the 
//   interface props is available in every file

import React, {useState, ChangeEvent} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserInfo from './userInfo'; // Adjust the import here
import { handleButtonClick } from './buttonLogic';
import InputField from './InputField'; // Correct the path if needed
import CreateAccount from './createAccount';
import User_Home_Page from './pages/User_Home_page';
import User_Settings_and_Info from './pages/User_Settings_and_Info';
import UserPref from './userPref';

      //In Progress
  //TODO: {Write Login Render Function for two scenarios: 
  //       (1) render new page if credential match
  //       (2) Display error message saying login is wrong }
  //  *NOTE: Will handle fetching data from backend to verify 
  //         entered user credentials. 


interface LoginValidProps {
  event_login_click: () => void
}

const LoginIsValid: React.FC<LoginValidProps> = ({event_login_click}) => {
  return (
    <Link to="pages/User_Home_page"> 
        <button onClick={event_login_click}> Login</button>
    </Link>
  ); 
};

interface LoginInvalidProps {
  event_login_click: () => void
  set_trackClicks: () => void
  accessTrack_clicks: () => boolean
}


const LoginIsInvalid: React.FC<LoginInvalidProps> = ({event_login_click, set_trackClicks, accessTrack_clicks}) => {
  if(!accessTrack_clicks()) {
    return (
        <button onClick={event_login_click}> Login </button>
      );
  }
  else {
    return (
      //Just Realized that I could have made an one entire component to capture and display all subcomponents 
          //In the format I wanted. B/c I didn't the Error is going to be diplayed beneath the login button
          //for when login credentials are invalid
      <div>
        <button onClick={event_login_click}> Login </button>
        <p style={{color : 'red'}}> Username or password incorrect </p>
      </div>
    );
  }
};

const Login: React.FC<AppProps> = (
  {setUsername_entry, setPassword_entry, set_to_LoggedIn, set_to_LoggedOut, set_trackClicks,
    accessUsername_entry, accessPassword_entry, accessLogin_status, accessTrack_clicks}
   ) => {

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
  
    switch (name) {
      case 'username':
        setUsername_entry(value);
          break; 
      case 'password':
        setPassword_entry(value);
          break; 
      default:
        break;
    }
  };

  const handleLoginClick = () => {
    const login_validity = isLogin_Valid(); // Perform actual login validation logic

    if(!accessTrack_clicks()) {
      set_trackClicks();
    }

    if(login_validity) {
        set_to_LoggedIn(); 
    }
    // Other login-related actions based on validation
  };

  const isLogin_Valid = (): boolean => {
    const username = accessUsername_entry();
    const password = accessPassword_entry();
    // Validate the credentials and return true/false
    return true; // Placeholder, replace with actual validation logic
  };

  //Return for Login Button
      //Display login User_Home_Page when valid login
  if(accessLogin_status()) { 
      return(
          <div>
              <InputField label="Username: " name="username" value={accessUsername_entry()} onChange={handleInputChange} placeholder="Enter your username" />
              <InputField label="Password: " name="password" value={accessPassword_entry()} onChange={handleInputChange} placeholder="Enter your password" />
              <LoginIsValid 
                        event_login_click={handleLoginClick} 
              /> 
          </div> 
        );
      }
          //Display login User_Home_Page when valid login
      else {
        return(
            <div> 
              <InputField label="Username: " name="username" value={accessUsername_entry()} onChange={handleInputChange} placeholder="Enter your username" />
              <InputField label="Password: " name="password" value={accessPassword_entry()} onChange={handleInputChange} placeholder="Enter your password" />
              <LoginIsInvalid 
                            event_login_click={handleLoginClick} 
                            set_trackClicks={set_trackClicks}
                            accessTrack_clicks={accessTrack_clicks}
              /> 
            </div>
        );
      }    
}

function Createacc() {
return( 
  <Link to="/createAccount">
      <button className="create_acc"> Create Account </button>
  </Link>
);
}

const Home: React.FC<AppProps> = (
  {setUsername_entry, setPassword_entry, set_to_LoggedIn, set_to_LoggedOut, set_trackClicks,
    accessUsername_entry, accessPassword_entry, accessLogin_status, accessTrack_clicks}
) => {

  return (
    <div>
      <h1>Rumeez</h1>
      <h2>Find your perfect roommate.</h2>
      <Login 
       setUsername_entry={setUsername_entry}
       setPassword_entry={setPassword_entry}
       set_to_LoggedIn={set_to_LoggedIn}
       set_to_LoggedOut={set_to_LoggedOut}
       set_trackClicks={set_trackClicks}
       accessUsername_entry={accessUsername_entry}
       accessPassword_entry={accessPassword_entry}
       accessLogin_status={accessLogin_status}
       accessTrack_clicks={accessTrack_clicks}
      />
      <Createacc />
    </div>
  );
}

   //Defining App Props
interface AppProps {
  //Mutator Function Types
setUsername_entry: (value: string) => void
setPassword_entry: (value: string) => void
set_to_LoggedIn: () => void
set_to_LoggedOut: () => void
set_trackClicks: () => void
//login_click: () => JSX.Element


    //Accessor Function Types
accessUsername_entry: () => string
accessPassword_entry: () => string
accessLogin_status: () => boolean
accessTrack_clicks: () => boolean
}




function App () {
  //Stores user's username associated with account
const [username_entry, setUsername_entry] = useState('');
  //Stores user's password associated with account
const [password_entry, setPassword_entry] = useState('');
  //Tracks click status of user's login and logout status
const [login_status, setLogin_status] = useState(false);
  //Tracks how many times, if ever, the user has clicked the login button
const [trackLoginClicks, setTrackLoginClicks] = useState(false);



  //Mutator Functions
function changeUsername_entry(value: string): void { setUsername_entry(value)};
function changePassword_entry(value: string): void { setPassword_entry(value)};
function change_to_LoggedIn(): void { setLogin_status(true)};
function change_to_LoggedOut(): void { setLogin_status(false)};
function change_trackClicks(): void {setTrackLoginClicks(true)}

  //Accessor Function
function retLogin_entry():string { return username_entry }
function retPassword_entry():string { return password_entry }
function retLogin_status():boolean { return login_status }
    //This function returns if login clicks has been clicked once or more times
function retTrack_clicks(): boolean {return trackLoginClicks}




//Temporarily defined here:
function handleLoginClick() {




    //Store vars from App states locally to reduce
      //computatutional time complexities
    const Username_entry = retLogin_entry();
    const Password_entry = retPassword_entry();




    //TODO: {Retrieve data from backend on user credentials entered via axios}




    //1)If (user is found)
      //update the Login_status
      //render home page
    //2)If (user is not found)
      //Display error message:
      //"username or password incorrect"




      //Branch 1
      change_to_LoggedIn();




      //return( <p> Logged In :p </p>)




   
    //Branch 2




}

return (
  <Router>
    <div className="App">
      {/* Use Routes to wrap your Route components */}
      <Routes>
        <Route path="/" element={
            <Home 
            setUsername_entry={changeUsername_entry}  
            setPassword_entry={changePassword_entry}
            set_to_LoggedIn={change_to_LoggedIn}
            set_to_LoggedOut={change_to_LoggedOut}
            set_trackClicks={change_trackClicks}
            accessUsername_entry={retLogin_entry}
            accessPassword_entry={retPassword_entry}
            accessLogin_status={retLogin_status}
            accessTrack_clicks={retTrack_clicks}
            /> } />
        <Route path="/userInfo" element={<UserInfo />} />
        <Route path="/pages/User_Home_page" element={<User_Home_Page />}  />
        <Route path="/createAccount" element={<CreateAccount />} />
        <Route path="/pages/User_Settings_and_Info" element={ <User_Settings_and_Info />} />
        <Route path="/userPref" element={ <UserPref />} />
          {/* Other routes go here */}
          </Routes>
      </div>
    </Router>
  );
}

export default App;