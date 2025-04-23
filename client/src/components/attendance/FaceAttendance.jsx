import { useRef, useState, useEffect } from "react";

const FaceAttendance = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error("Failed to access webcam:", err));
  }, []);

  const captureAndMarkAttendance = async () => {
    setLoading(true);
    setMessage("");

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext("2d");

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const image = canvas.toDataURL("image/jpeg");

    try {
      const res = await fetch("http://localhost:5050/api/mark_attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image }),
      });

      const data = await res.json();
      if (data.status === "duplicate") {
        setMessage("❌ User already marked your attendance");
      } else if (data.status === "success") {
        setMessage(`✅ Attendance marked for: ${data.marked.join(", ")}`);
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error("Error marking attendance:", err);
      setMessage("❌ Failed to mark attendance. Server error.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-indigo-600">
        Mark Attendance
      </h2>

      <div className="flex flex-col items-center">
        <video
          ref={videoRef}
          className="rounded-lg border border-gray-300"
          width="320"
          height="240"
          autoPlay
        />
        <canvas
          ref={canvasRef}
          width="320"
          height="240"
          className="hidden"
        ></canvas>

        <button
          onClick={captureAndMarkAttendance}
          className="mt-4 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition"
          disabled={loading}
        >
          {loading ? "Processing..." : "Capture & Mark Attendance"}
        </button>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
};

export default FaceAttendance;
