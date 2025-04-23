import { Menu, UserCircle, UserRoundCog } from "lucide-react";
import { useState, useEffect } from "react";
import FaceRegisterModel from "../model/FaceRegisterModel";
import UserProfile from "../components/UserProfile";
import axios from "axios";
export default function Header({ toggleSidebar }) {
  const [showModal, setShowModal] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const isEmployee = user.role !== "admin" ? true : false;
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [profilePic, setProfilePic] = useState("");
  useEffect(() => {
    const userPic = async () => {
      try {
        console.log(user["_id"]);
        const res = await axios.get(
          `http://localhost:5050/api/user/profile-pic/${user["_id"]} `
        );
        console.log(res);

        const image_url = `http://localhost:5050${res.data.profilePic}`;
        setProfilePic(image_url);
      } catch (err) {
        console.log("there is Error", err);
      }
    };
    userPic();
  }, []);
  //
  return (
    <header className="flex justify-between items-center bg-white px-4 py-5 shadow  mb-6 sticky top-0 z-40">
      {/* Hamburger for mobile view */}
      <div className="flex items-center gap-3">
        <button onClick={toggleSidebar} className="md:hidden text-gray-700">
          <Menu size={24} />
        </button>
        <h1 className="text-xl md:text-2xl font-semibold text-blue-600">
          {user.role === "admin" ? "Admin" : "Employee"} Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-3 text-sm text-gray-700">
        <span className="hidden sm:inline-block">Welcome, {user.username}</span>

        {/* user profile pic */}
        {profilePic ? (
          <img
            src={profilePic}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover border shadow"
          />
        ) : (
          <UserCircle size={30} className="text-blue-500" />
        )}

        {isEmployee && (
          <button onClick={() => setShowModal(true)}>Register Yourself</button>
        )}
        {showModal && <FaceRegisterModel onClose={() => setShowModal(false)} />}

        <UserRoundCog
          onClick={() => setIsProfileOpen(true)}
          className="cursor-pointer"
        />

        {isProfileOpen && (
          <UserProfile
            isOpen={isProfileOpen}
            onClose={() => setIsProfileOpen(false)}
          />
        )}
      </div>
    </header>
  );
}
