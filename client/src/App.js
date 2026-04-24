import React, { useState } from 'react';
import { Play, Loader, AlertCircle } from 'lucide-react';
import VideoUpload from './components/VideoUpload';
import AnalysisResults from './components/AnalysisResults';
import InputPanel from './components/InputPanel';
import api from './services/api';
import './App.css';

function App() {
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userInputs, setUserInputs] = useState('');
  const [customAnalysis, setCustomAnalysis] = useState(null);
  const [analyzingCustom, setAnalyzingCustom] = useState(false);

  const handleVideoUpload = (file) => {
    setVideoFile(file);
    setError(null);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setVideoPreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const analyzeVideo = async () => {
    if (!videoFile) {
      setError('Please upload a video first');
      return;
    }

    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const formData = new FormData();
      formData.append('video', videoFile);

      const response = await api.post('/api/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setAnalysis(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to analyze video. Please try again.');
      console.error('Analysis error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCustomAnalysis = async () => {
    if (!userInputs.trim()) {
      setError('Please enter your question or request');
      return;
    }

    if (!analysis) {
      setError('Please analyze the video first');
      return;
    }

    setAnalyzingCustom(true);
    setError(null);

    try {
      const response = await api.post('/api/custom-analysis', {
        videoPath: videoFile.name,
        userInput: userInputs,
        previousAnalysis: analysis
      });

      setCustomAnalysis(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to process your request');
      console.error('Custom analysis error:', err);
    } finally {
      setAnalyzingCustom(false);
    }
  };

  const clearAnalysis = () => {
    setVideoFile(null);
    setVideoPreview(null);
    setAnalysis(null);
    setCustomAnalysis(null);
    setUserInputs('');
    setError(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <Play size={32} />
            <h1>Video Analysis AI</h1>
          </div>
          <p className="tagline">AI-powered insights for your videos</p>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          {error && (
            <div className="error-alert">
              <AlertCircle size={20} />
              <span>{error}</span>
              <button onClick={() => setError(null)}>×</button>
            </div>
          )}

          {!analysis ? (
            <div className="upload-section">
              <VideoUpload onVideoSelect={handleVideoUpload} videoPreview={videoPreview} />
              
              {videoFile && (
                <button
                  onClick={analyzeVideo}
                  disabled={loading}
                  className="analyze-btn"
                >
                  {loading ? (
                    <>
                      <Loader size={20} className="spinner" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Play size={20} />
                      Analyze Video
                    </>
                  )}
                </button>
              )}
            </div>
          ) : (
            <div className="results-section">
              <div className="results-header">
                <h2>Analysis Results</h2>
                <button onClick={clearAnalysis} className="new-analysis-btn">
                  Analyze Another Video
                </button>
              </div>

              <AnalysisResults analysis={analysis} />

              <InputPanel
                userInputs={userInputs}
                setUserInputs={setUserInputs}
                onSubmit={handleCustomAnalysis}
                loading={analyzingCustom}
              />

              {customAnalysis && (
                <div className="custom-results">
                  <h3>Your Analysis</h3>
                  <div className="result-content">
                    {customAnalysis.response}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <footer className="app-footer">
        <p>Video Analysis AI © 2024 | Powered by Google Gemini</p>
      </footer>
    </div>
  );
}

export default App;
