import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import logo from './assests/profile.png';
import Dashboard from './Components/Dashboard';
import Myfiles from './Components/Myfiles';
import Aiassist from './Components/AIassist';
import Myreport from './Components/Myreport';
import resume from './assests/ANDREWS_RESUME.jpg';
import protfolio from './assests/MyPorfolioModal.png';
import QR from  './assests/MyPortfolioQR.png'; 
import { MdDashboard } from "react-icons/md";
import { LuFiles } from "react-icons/lu";
import { GiArtificialIntelligence } from "react-icons/gi";
import { BiSolidReport } from "react-icons/bi";
import { PiClockCounterClockwiseLight } from "react-icons/pi";
import { FiArrowUp } from "react-icons/fi";

function App() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileDates, setFileDates] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [progressBarVisible, setProgressBarVisible] = useState(false);

  useEffect(() => {
    const initialImages = [
      {
        name: "My Resume",
        content: resume 
      },
      {
        name: "My Portfolio",
        content: protfolio
      },
      {
        name: "Portfolio URL QR",
        content: QR
      }
    ];
    const currentDate = new Date().toLocaleDateString();

    setUploadedFiles(initialImages);
    setFileDates([currentDate, currentDate, currentDate]);
  }, []);

  const handleFileUpload = (event) => {
    const files = event.target.files;
    const updatedFiles = [...uploadedFiles];
    const updatedDates = [...fileDates];
    let isValid = false;
    for (let i = 0; i < files.length; i++) {
      const fileNameParts = files[i].name.split('.');
      const fileExtension = fileNameParts[fileNameParts.length - 1];
      const validExtensions = ['jpg', 'jpeg', 'png', 'gif'];
  
      if (validExtensions.includes(fileExtension.toLowerCase())) {
        const reader = new FileReader();
        reader.onload = () => {
          const fileContent = reader.result;
          updatedFiles.push({ name: files[i].name, content: fileContent });
          const currentDate = new Date().toLocaleDateString();
          updatedDates.push(currentDate);
          setUploadedFiles(updatedFiles);
          setFileDates(updatedDates);
        };
        reader.readAsDataURL(files[i]);
        isValid = true; 
      }
    }
  
    if (!isValid) {
      setShowNotification(true); 
      setProgressBarVisible(true); 
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    } else {
      setShowNotification(false); 
      setProgressBarVisible(false); 
      setTimeout(() => {
        setProgressBarVisible(false); 
      }, 3000);
    }
  };
  
  
  const handleFileDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    const updatedFiles = [...uploadedFiles];
    const updatedDates = [...fileDates];
    let isValid = true;

    for (let i = 0; i < files.length; i++) {
      const fileNameParts = files[i].name.split('.');
      const fileExtension = fileNameParts[fileNameParts.length - 1];
      const validExtensions = ['jpg', 'jpeg', 'png', 'gif'];

      if (validExtensions.includes(fileExtension.toLowerCase())) {
        const reader = new FileReader();
        reader.onload = () => {
          const fileContent = reader.result;
          updatedFiles.push({ name: files[i].name, content: fileContent });
          const currentDate = new Date().toLocaleDateString(); 
          updatedDates.push(currentDate);
          setUploadedFiles(updatedFiles);
          setFileDates(updatedDates);
        };
        reader.readAsDataURL(files[i]);
      } else {
        isValid = false;
      }
    }

    if (!isValid) {
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    }
  };
  
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <Router>
      <div className="container">
        <div className="sidenav">
          <div className="navs">
            <h3>FinSight<span className='ai'>AI</span></h3>
            <div className="nav">
              <NavLink to="/dashboard"><MdDashboard className='icon'/>Dashboard</NavLink>
              <NavLink to="/"><LuFiles className='icon'/>My Files</NavLink>
              <NavLink to="/ai"><GiArtificialIntelligence className='icon'/>AI Assistant</NavLink>
              <NavLink to="/myreport"><BiSolidReport className='icon'/>My Report</NavLink>
            </div>
          </div>
          <div className="profile">
            <a href="https://andrewmichealportfolio.netlify.app/" target="_blank" rel="noreferrer"><img src={logo} alt="logo" className='logo' /><p>Andrews Micheal</p></a>
          </div>
        </div>
        <div className="content">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Myfiles handleFileUpload={handleFileUpload} 
                                              handleFileDrop={handleFileDrop} 
                                              handleDragOver={handleDragOver}
                                              uploadedFiles={uploadedFiles}
                                              fileDates={fileDates}/>} />
            <Route path="/ai" element={<Aiassist />} />
            <Route path="/myreport" element={<Myreport uploadedFiles={uploadedFiles} fileDates={fileDates}/>} />
          </Routes>
          <div className='messagebox'>
            <form action="submit">
              <input type="text" placeholder='Message AI assistant'/>
              <button><FiArrowUp className='btn'/></button>
            </form>
            <button className='clock'><PiClockCounterClockwiseLight className='cl'/></button>
          </div>
        </div>
      </div>
      {showNotification && (
        <div className="notification-container">
          <div className="notification">Invalid file format!</div>
          {progressBarVisible && <div className="progress-bar"></div>}
        </div>
      )}
    </Router>
  );
}

export default App;
