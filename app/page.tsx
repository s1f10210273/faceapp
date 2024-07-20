"use client"

import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import TakePicture from './components/TakePicture';

export default function Home() {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [responseData, setResponseData] = useState<{ image: string, message: string, predicted_age: string} | null>(null);

  const handleCaptureImage = (capturedImageSrc: string) => {
    setImageSrc(capturedImageSrc);
  };

  const sendImage = async () => {
    if (imageSrc) {
      const response = await fetch('http://127.0.0.1:5328/faceage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image: imageSrc })
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setResponseData(data);
      } else {
        console.error('Error uploading image');
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Webcam Capture</h1>
      <div className="flex space-x-4 mb-4">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" onClick={sendImage}>Send Image</button>
      </div>
      <div>
      <TakePicture onCapture={handleCaptureImage} />
    </div>
      {imageSrc && (
        <div className="flex flex-col items-center mt-4">
          <h2 className="text-xl font-bold mb-2">Captured Image</h2>
          <img src={imageSrc} alt="Captured" className="max-w-md rounded-lg" />
        </div>
      )}
      {responseData && (
        <div className="flex flex-col items-center mt-4">
          <h2 className="text-xl font-bold mb-2">Processed Image</h2>
          <img src={responseData.image} alt="Processed" className="max-w-md rounded-lg" />
          <p className="mt-2">{responseData.message}</p>
          <p className="mt-2">あなたは{responseData.predicted_age}代です</p>
        </div>
      )}
    </div>
  );
};
