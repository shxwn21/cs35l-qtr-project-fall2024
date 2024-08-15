import React, {useEffect, useState} from 'react';

const Root: React.FC = () => {
    
  const [showSubheader, setShowSubheader] = useState(false);
  
    useEffect(() => {
      const delay = 1700; // Adjust delay as needed (in milliseconds)
  
      // Timeout to display subheader after the animation
      const timer = setTimeout(() => {
        setShowSubheader(true);
      }, delay);
  
      // Clear the timeout when the component unmounts or when the delay changes
      return () => clearTimeout(timer);
    }, []);
  
    return (
      <div className="background-container">
        <div className="animation-container">
          <div className="background-text-fill">
          <div className="text-animation">
            <span>R</span>
            <span>u</span>
            <span>m</span>
            <span>e</span>
            <span>e</span>
            <span>z</span>
          </div>
          <div className={`text-animation-subheader ${showSubheader ? 'show' : ''}`}>
            Find your perfect UCLA roommate!
        </div>
        </div>
        </div>
      </div>
    );
  };

export default Root;
