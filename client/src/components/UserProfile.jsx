import React, { useEffect, useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaImage } from "react-icons/fa";
// import axios from "axios";
const userId = JSON.parse(localStorage.getItem("user"))["_id"];

const UserProfile = ({ isOpen, onClose }) => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetch(`http://localhost:5050/api/user/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          setUserData({
            username: data.username,
            email: data.email,
            password: "",
          });
          setPreview(data.profilePic); // assuming backend sends profilePic URL
        })
        .catch((err) => console.error("Error fetching user:", err));
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpdate = () => {
    const formData = new FormData();
    formData.append("username", userData.username);
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    if (image) {
      formData.append("profilePic", image);
    }

    fetch(`http://localhost:5050/api/user/${userId}`, {
      method: "PUT",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message || "Updated");
        onClose();
      })
      .catch((err) => console.error("Update error:", err));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-8 w-full max-w-lg relative shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Profile Settings
        </h2>

        <div className="space-y-5">
          {preview && (
            <div className="flex justify-center">
              <img
                src={preview}
                alt="Profile Preview"
                className="w-24 h-24 rounded-full object-cover"
              />
            </div>
          )}

          <div className="flex items-center border p-3 rounded">
            <FaUser className="text-gray-500 mr-3" />
            <input
              type="text"
              name="username"
              value={userData.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full outline-none"
            />
          </div>

          <div className="flex items-center border p-3 rounded">
            <FaEnvelope className="text-gray-500 mr-3" />
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full outline-none"
            />
          </div>

          <div className="flex items-center border p-3 rounded">
            <FaLock className="text-gray-500 mr-3" />
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              placeholder="Enter new password"
              className="w-full outline-none"
            />
          </div>

          <div className="flex items-center space-x-3">
            <label className="flex items-center gap-2 cursor-pointer bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">
              <FaImage />
              Upload Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            {image && <span className="text-sm text-green-600">Selected</span>}
          </div>

          <div className="mt-4 flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-black text-2xl"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
