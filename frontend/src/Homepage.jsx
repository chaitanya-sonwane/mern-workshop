  import React from 'react';
 import Homeimgf from './assets/Homeimgf.jpg';
import Homeimgs from './assets/Homeimgs.jpg';

  function Homepage() {
    return (
      <>
    <div className=" flex absolute bg-red-300 h-[100vh]">
          <h1 className="text-5xl font-bold ml-20 pt-25">MERN Stack Development<br/> Workshop's</h1>
          <p className='text-1xl ml-30 pt-10 font-bold'>About workshop</p>
          <p className='ml-30 '>The MERN Stack Development Workshop was designed to provide 
              <br/>practical knowledge
          of full-stack web development using MongoDB, Express.js,<br/> React.js, and Node.js. During 
          the workshop, participantslearned how 
          to build responsive<br/> and secure web  applications by integrating both 
          <br/>frontend and backend technologies.
      As part of the workshop,<br/> a complete Attendance Management System was developed.
          The application<br/> allows users to register and log 
          in securely,<br/>
          while administrators can manage participants,<br/> mark attendance,
          and monitor records<br/> through an interactive dashboard.
          The project follows<br/> industry-standard coding practices and demonstrates
            real-world full-stack development skills.</p>
          <button
    className="bg-purple-400 p-2 w-40 border border-[1px] rounded-lg ml-33 mt-5"
    type="submit"
  >
    Apply
  </button>

  <div className='h-50 w-50 bg-black mr-5 mt-2 rounded-lg'>
<img src={Homeimgs} alt="Workshop Banner" className="w-96 rounded-lg mt-5" />

  </div>
    
      </div>

  </>
    );
  }

  export default Homepage;