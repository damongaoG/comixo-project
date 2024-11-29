import React, {useEffect} from 'react';

const Preloader: React.FC = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      const preloader = document.getElementById('preloader');
      if (preloader) {
        preloader.style.display = 'none';
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div id="preloader">
      <div id="loading-center">
        <div id="loading-center-absolute">
          <div className="object" id="object_one"></div>
          <div className="object" id="object_two"></div>
          <div className="object" id="object_three"></div>
          <div className="object" id="object_four"></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
