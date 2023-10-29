import React,{useEffect} from 'react';
import './App.css';
import ImageUpload from './ImageUpload';
import ImageDisplay from './ImageDisplay';
import axios from "axios";

function App() {
  useEffect(()=>{
    const showdata = async ()=>{
      const response1 = await axios.get('http://localhost:3000/all-users');
        console.log(response1);
    }
    showdata();
  },[]);
  return (
    <div className="App">
      <h1>Google Drive testing</h1>
      <ImageUpload />
      <ImageDisplay />
    </div>
  );
}

export default App;
