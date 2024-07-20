"use client"

import React, { useState } from 'react';
import TakePicture from './components/TakePicture';

export default function Home() {
  const [camOn, setCamOn] = useState<boolean>(true);
  const [responseData, setResponseData] = useState<{ image: string, message: string, predicted_age: number} | null>(null);

  const handleCaptureImage = (capturedImageSrc: string) => {
    setCamOn(false);
    sendImage(capturedImageSrc);
  };

  const sendImage = async (imageSrc: string) => {
    try {
      const response = await fetch('http://127.0.0.1:5328/api/faceage', {
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
    } catch (error) {
      console.error('Error uploading image', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
    {camOn ? (
      <TakePicture onCapture={handleCaptureImage} />
    ): null}
      {responseData && (
        <div className="flex flex-col items-center mt-4">
          <img src={responseData.image} alt="Processed" className="max-w-md rounded-lg" />
          <p className="mt-2">あなたは{responseData.predicted_age}代です</p>
        </div>
      )}
    </div>
  );
};
