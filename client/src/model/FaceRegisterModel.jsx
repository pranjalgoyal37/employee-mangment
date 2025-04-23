import React, { useEffect, useRef, useState } from "react";

const FaceRegistrationModal = ({ onClose }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error("Error accessing webcam:", err));

    return () => {
      stopCamera();
    };
  }, []);

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  const captureImage = async () => {
    if (!name) {
      alert("Please enter your name");
      return;
    }

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext("2d");

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const image = canvas.toDataURL("image/jpeg");
    const updatedImages = [...images, image];
    setImages(updatedImages);

    if (updatedImages.length === 3) {
      try {
        console.log(updatedImages);

        const res = await fetch("http://localhost:5050/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, images: updatedImages }),
        });

        const data = await res.json();
        console.log(data);

        setMessage(data.message || "Registered successfully!");
      } catch (err) {
        console.error(err);
        setMessage("Failed to register.");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Register Yourself
        </h2>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-xl text-sm"
        />

        <video ref={videoRef} autoPlay className="w-full rounded-xl mb-4" />
        <canvas ref={canvasRef} width="320" height="240" className="hidden" />

        <button
          onClick={captureImage}
          disabled={images.length >= 3}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl mb-4"
        >
          Capture Image ({images.length}/3)
        </button>

        <div className="flex gap-2 mb-4">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`face-${i}`}
              className="w-20 h-20 object-cover rounded-xl border"
            />
          ))}
        </div>

        <p className="text-center text-green-600 font-medium mb-4">{message}</p>

        <button
          onClick={() => {
            stopCamera();
            onClose();
          }}
          className="w-full bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded-xl"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default FaceRegistrationModal;
