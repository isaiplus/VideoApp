import React from 'react';
import { Lightbulb, AlertCircle, TrendingUp } from 'lucide-react';
import './AnalysisResults.css';

function AnalysisResults({ analysis }) {
  const parseContent = (content) => {
    if (typeof content === 'string') {
      return content.split('\n').filter(line => line.trim());
    }
    return [];
  };

  return (
    <div className="analysis-results">
      <div className="results-grid">
        {analysis.summary && (
          <div className="result-card">
            <div className="result-header">
              <TrendingUp size={24} color="#3b82f6" />
              <h3>Summary</h3>
            </div>
            <div className="result-body">
              {parseContent(analysis.summary).map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
          </div>
        )}

        {analysis.suggestions && (
          <div className="result-card">
            <div className="result-header">
              <Lightbulb size={24} color="#10b981" />
              <h3>Improvement Suggestions</h3>
            </div>
            <div className="result-body">
              <ul className="suggestions-list">
                {parseContent(analysis.suggestions).map((suggestion, idx) => (
                  <li key={idx}>{suggestion}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {analysis.keyPoints && (
          <div className="result-card">
            <div className="result-header">
              <AlertCircle size={24} color="#f59e0b" />
              <h3>Key Points</h3>
            </div>
            <div className="result-body">
              {parseContent(analysis.keyPoints).map((point, idx) => (
                <p key={idx}>• {point}</p>
              ))}
            </div>
          </div>
        )}
      </div>

      {analysis.detailedAnalysis && (
        <div className="detailed-analysis">
          <h3>Detailed Analysis</h3>
          <div className="analysis-content">
            {parseContent(analysis.detailedAnalysis).map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AnalysisResults;
