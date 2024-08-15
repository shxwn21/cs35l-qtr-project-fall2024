export const handleButtonClick = () => {
    // display popup asking for phone number
    const user_email = prompt("Please enter your user email:");
  
    // check if the user entered a phone number
    if (user_email !== null && user_email.trim() !== "") {
      // user provided a phone number
      console.log(`User email entered: ${user_email}`);
      // Add further logic here (e.g., send the phone number to a server, send text to number to verify.)
    } else {
      // User canceled or entered an empty phone number
      console.log("User email entry cancelled or empty.");
    }
  };
