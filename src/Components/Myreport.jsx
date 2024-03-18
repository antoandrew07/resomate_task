import React, { useState } from 'react';
import './Myreport.css';

function Myreport({ uploadedFiles, fileDates }) {
  const [selectedFileIndex, setSelectedFileIndex] = useState(null);

  const handleViewClick = (index) => {
    setSelectedFileIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedFileIndex(null);
  };

  return (
    <div id="myreport">
      <h3 className="myreporthead">My Report</h3>
      <hr />
      <div id="table">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>File Name</th>
              <th>Upload Date</th>
              <th>View Doc</th>
            </tr>
          </thead>
          <tbody>
            {uploadedFiles &&
              uploadedFiles.map((file, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{file.name}</td>
                  <td>{fileDates[index]}</td>
                  <td>
                    <button className="reportbtn" onClick={() => handleViewClick(index)}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
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
  );
}

export default Myreport;
