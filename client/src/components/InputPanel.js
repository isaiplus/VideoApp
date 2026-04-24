import React from 'react';
import { Send, Loader } from 'lucide-react';
import './InputPanel.css';

function InputPanel({ userInputs, setUserInputs, onSubmit, loading }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="input-panel">
      <h3>Ask Follow-up Questions</h3>
      <p className="panel-desc">
        Get more specific insights about the video analysis
      </p>
      <form onSubmit={handleSubmit} className="input-form">
        <div className="input-wrapper">
          <textarea
            value={userInputs}
            onChange={(e) => setUserInputs(e.target.value)}
            placeholder="e.g., What should the wrestler in red improve? What are the key issues with both wrestlers? Summarize the bout..."
            disabled={loading}
            rows={4}
          />
          <button
            type="submit"
            disabled={loading || !userInputs.trim()}
            className="submit-btn"
          >
            {loading ? (
              <>
                <Loader size={18} className="spinner" />
                Processing...
              </>
            ) : (
              <>
                <Send size={18} />
                Ask
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default InputPanel;
