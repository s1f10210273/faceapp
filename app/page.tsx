"use client"

import React, { useRef, useState } from 'react';

const Home = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [responseData, setResponseData] = useState<{ image: string, message: string } | null>(null);

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      })
      .catch(err => {
        console.error("Error accessing webcam: ", err);
      });
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        const dataUrl = canvasRef.current.toDataURL('image/jpeg');
        setImageSrc(dataUrl);
      }
    }
  };

  const sendImage = async () => {
    if (imageSrc) {
      const response = await fetch('http://127.0.0.1:5328/upload', {
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
    <div>
      <h1>Webcam Capture</h1>
      <button onClick={startVideo}>Start Webcam</button>
      <video ref={videoRef} style={{ display: 'block', margin: '20px 0' }}></video>
      <button onClick={captureImage}>Capture Image</button>
      <button onClick={sendImage}>Send Image</button>
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      {imageSrc && (
        <div>
          <h2>Captured Image</h2>
          <img src={imageSrc} alt="Captured" style={{ display: 'block', margin: '20px 0' }} />
        </div>
      )}
      {responseData && (
        <div>
          <h2>Processed Image</h2>
          <img src={responseData.image} alt="Processed" style={{ display: 'block', margin: '20px 0' }} />
          <p>{responseData.message}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
