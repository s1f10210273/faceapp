"use client";

import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

interface TakePictureProps {
  onCapture: (imageSrc: string) => void;
}

const TakePicture: React.FC<TakePictureProps> = ({ onCapture }) => {
  const webcamRef = useRef<Webcam>(null);
  const [camOn, setCamOn] = useState<boolean>(false);

  const captureImage = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      onCapture(imageSrc);
    }
  };

  return (
    // カメラオン
    <div className="flex flex-col items-center justify-center min-h-screen">
      {camOn ? (
        <div className="rounded-lg flex flex-col items-center">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="rounded-lg"
            width={640}
            height={480}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4"
            onClick={captureImage}
          >
            Capture Image
          </button>
        </div>
      ) : (
        // カメラオンボタン
        <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => setCamOn(!camOn)}
          >start</button>
      )}
    </div>
  );
};

export default TakePicture;
