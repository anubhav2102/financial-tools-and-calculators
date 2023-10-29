import React from 'react';
import './App.css';
import ImageUpload from './ImageUpload';
import ImageDisplay from './ImageDisplay';

function App() {
  return (
    <div className="App">
      <h1>Google Drive testing</h1>
      <ImageUpload />
      <ImageDisplay />
    </div>
  );
}

export default App;
