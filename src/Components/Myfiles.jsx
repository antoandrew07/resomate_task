import React,{useState} from 'react';
import { ImFolderUpload } from "react-icons/im";
import { FaRegEye } from "react-icons/fa";
import { TfiArrowRight } from "react-icons/tfi";
import './Myfiles.css';

function Myfiles({ handleFileDrop, handleDragOver, handleFileUpload, uploadedFiles, fileDates }) {
 
    const [selectedFileIndex, setSelectedFileIndex] = useState(null);
  
    const handleViewClick = (index) => {
      setSelectedFileIndex(index);
    };
  
    const handleCloseModal = () => {
      setSelectedFileIndex(null);
    };

  return (
    <div id='myfiles'>
      <h3 className='myfilehead'>My Files</h3>
      <div className="boxes">
        <div className="bo" onDrop={handleFileDrop} onDragOver={handleDragOver}>
          <div className="drag">
            <ImFolderUpload className='dragimg' />
            <h4 className='draghead'>Drag and Drop</h4>
            <p className='dragp'>Upload Your Image</p>
            <input type="file" className="dragbtn" id="upload" onChange={handleFileUpload} accept="image/*" multiple />
            <label htmlFor="upload" className="custom-file-upload">Browse files</label>
          </div>
        </div>
        {uploadedFiles && uploadedFiles.map((file, index) => (
          <div key={index} className="box">
            <div className="img">
              <img src={file.content} alt={file.name} />
            </div>
            <div className="filename">
              {file.name}
            </div>
            <div className="date">
              {fileDates[index]}
            </div>
            <div className='view'>
              <button className='viewbtn1' onClick={() => handleViewClick(index)}><FaRegEye /> View Dashboard</button>
              <button className='viewbtn2'><TfiArrowRight className='btn2img' /></button>
            </div>
          </div>
        ))}
        <div className="box boxe"></div>
        <div className="box boxe"></div>
        <div className="box boxe"></div>
        {selectedFileIndex !== null && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <img src={uploadedFiles[selectedFileIndex].content} alt="Uploaded file" className="modal-image" />
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default Myfiles;
