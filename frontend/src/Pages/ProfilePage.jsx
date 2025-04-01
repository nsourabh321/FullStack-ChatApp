import React from "react";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [error, setError] = useState("");

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setError("File size exceeds 2MB. Please choose a smaller image.");
      return;
    }

    setError("");
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    
    <div className="h-screen  pt-20 bg-[#191970] text-white " style={{ height: "100vh", overflowY: "auto", scrollbarWidth: "none" }}>
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-[#1c1f4a] rounded-xl p-6 space-y-8 shadow-lg">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-[#B0C4DE]">Profile</h1>
            <p className="mt-2 text-[#A9A9A9]">Your profile information</p>
          </div>

          {/* Avatar upload section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 border-[#B0C4DE]"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 bg-[#4682B4] hover:bg-[#5A9FCF]
                  p-2 rounded-full cursor-pointer transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
                aria-label="Upload Profile Picture"
              >
                <Camera className="w-5 h-5 text-white" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <p className="text-sm text-[#A9A9A9]">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* User details */}
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-[#A9A9A9] flex items-center gap-2">
                <User className="w-4 h-4" /> Full Name
              </div>
              <p className="px-4 py-2.5 bg-[#283593] rounded-lg border border-[#5A9FCF]">
                {authUser?.fullName}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-[#A9A9A9] flex items-center gap-2">
                <Mail className="w-4 h-4" /> Email Address
              </div>
              <p className="px-4 py-2.5 bg-[#283593] rounded-lg border border-[#5A9FCF]">
                {authUser?.email}
              </p>
            </div>
          </div>

          {/* Account Information */}
          <div className="mt-6 bg-[#1c1f4a] rounded-xl p-6 shadow-md">
            <h2 className="text-lg font-medium text-[#B0C4DE] mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-[#5A9FCF]">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-400">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
