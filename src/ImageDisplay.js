import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ImageDisplay() {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    // Fetch the user's image from your server
    const fetchUserImage = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user-image');
        setImageUrl(URL.createObjectURL(new Blob([response.data])));
      } catch (error) {
        console.error('Error fetching user image:', error);
        console.log('Error response:', error.response); // Log the response details
      }
    };

    fetchUserImage();
  }, []);

  return (
    <div>
      {imageUrl && <img src={imageUrl} alt="User" />}
    </div>
  );
}

export default ImageDisplay;
