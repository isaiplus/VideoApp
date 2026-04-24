import React, { useRef } from 'react';
import { Upload } from 'lucide-react';
import './VideoUpload.css';

function VideoUpload({ onVideoSelect, videoPreview }) {
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('video/')) {
      onVideoSelect(file);
    } else {
      alert('Please select a valid video file');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('video/')) {
      onVideoSelect(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="video-upload">
      {videoPreview ? (
        <div className="video-preview">
          <video controls style={{ maxWidth: '100%', borderRadius: '8px' }}>
            <source src={videoPreview} />
          </video>
        </div>
      ) : (
        <div
          className="upload-area"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
          <Upload size={48} color="#3b82f6" />
          <h2>Upload Your Video</h2>
          <p>Drag and drop your video here or click to browse</p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="upload-btn"
          >
            Choose Video
          </button>
          <p className="supported-formats">
            Supported: MP4, WebM, Ogg, MOV (Max 100MB)
          </p>
        </div>
      )}
    </div>
  );
}

export default VideoUpload;
