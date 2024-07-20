"use client";

import React, { useRef } from 'react';
import Webcam from 'react-webcam';

interface TakePictureProps {
  onCapture: (imageSrc: string) => void;
}

const TakePicture: React.FC<TakePictureProps> = ({ onCapture }) => {
  const webcamRef = useRef<Webcam>(null);

  const captureImage = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      onCapture(imageSrc);
    }
  };

  return (
    <div className="rounded-lg">
      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" onClick={captureImage}>Capture Image</button>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={640}
        height={480}
      />
    </div>
  );
};

export default TakePicture;
