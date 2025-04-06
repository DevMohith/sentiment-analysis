import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App(){
  const [text, setText] = useState('');
  const [sentiment, setSentiment] = useState(null);
  const [loading, setLoding] = useState(null);

  const analyzeSentiment = async () => {
    setLoding(true);
    try {
      const response = await axios.post('http://localhost:5000/analyze', { text });
      setSentiment(response.data.sentiment);
    } catch (error) {
      setSentiment("Error: Could not get sentiment", error);
    }
    setLoding(false);
  };

  
  return (
    <div className="App">
      <h1>DevMT Sentiment Analyzer</h1>
      <textarea
        placeholder="Type a sentence..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        cols={50}
      />
      <br />
      <button onClick={analyzeSentiment} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze Sentiment"}
      </button>
      {sentiment && (
        <div className="result">
          <h3>Sentiment:</h3>
          <p>{sentiment}</p>
        </div>
      )}
    </div>
  );
}

export default App;
