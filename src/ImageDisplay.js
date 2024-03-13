import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ImageDisplay() {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchUserImage = async () => {
      try {
        const response = await axios.get('http://localhost:8000/user-image', {
      responseType: 'blob',
    });
    const blobUrl = URL.createObjectURL(response.data);

    setImageUrl(blobUrl);
      } catch (error) {
        console.error('Error fetching user image:', error);
        console.log('Error response:', error.response);
      }
    };

    fetchUserImage();
  }, []);

  return (
    <div>
      {imageUrl && <img src={imageUrl} alt="User" style={{height: '30px'}} />}
    </div>
  );
}

export default ImageDisplay;
