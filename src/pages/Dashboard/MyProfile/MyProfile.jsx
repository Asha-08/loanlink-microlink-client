import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Camera, Edit2, Save, X, User, Mail, Shield, Calendar } from 'lucide-react';
import Swal from 'sweetalert2';
import axios from 'axios';

const MyProfile = () => {
  const { user, logOut, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const { data: userData, isLoading, refetch } = useQuery({
    queryKey: ["userProfile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/profile/${user.email}`);
      return res.data;
    },
  });

  const handleLogout = () => {
    logOut();
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedName(userData?.displayName || '');
    setPreviewImage(userData?.photoURL || '');
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedName('');
    setSelectedFile(null);
    setPreviewImage('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setIsUploading(true);
      
      let photoURL = userData?.photoURL;

      // Upload new image if selected
      if (selectedFile) {
        const formData = new FormData();
        formData.append('image', selectedFile);
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;
        
        const imgResponse = await axios.post(image_API_URL, formData);
        photoURL = imgResponse.data.data.url;
      }

      // Update Firebase profile
      await updateUserProfile({
        displayName: editedName,
        photoURL: photoURL,
      });

      // Update MongoDB
      const updateData = {
        displayName: editedName,
        photoURL: photoURL,
      };

      await axiosSecure.patch(`/users/profile/${user.email}`, updateData);

      // Refetch user data
      await refetch();

      Swal.fire({
        icon: 'success',
        title: 'Profile Updated!',
        text: 'Your profile has been updated successfully',
        timer: 2000,
        showConfirmButton: false,
      });

      setIsEditing(false);
      setSelectedFile(null);
      setIsUploading(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setIsUploading(false);
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: error.message || 'Failed to update profile',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#0050b2] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 py-12 px-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="profile-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="30" fill="none" stroke="#0050b2" strokeWidth="1" />
              <circle cx="50" cy="50" r="20" fill="none" stroke="#0050b2" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#profile-pattern)" />
        </svg>
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-700"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0050b2] to-blue-600 p-8 text-white relative">
            <div className="absolute top-4 right-4">
              {!isEditing ? (
                <button
                  onClick={handleEditClick}
                  className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg transition-all duration-300"
                >
                  <Edit2 className="w-4 h-4" />
                  <span className="text-sm font-semibold">Edit Profile</span>
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveProfile}
                    disabled={isUploading}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save className="w-4 h-4" />
                    <span className="text-sm font-semibold">
                      {isUploading ? 'Saving...' : 'Save'}
                    </span>
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    disabled={isUploading}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-all duration-300 disabled:opacity-50"
                  >
                    <X className="w-4 h-4" />
                    <span className="text-sm font-semibold">Cancel</span>
                  </button>
                </div>
              )}
            </div>

            <h2 className="text-3xl font-extrabold mb-2">My Profile</h2>
            <p className="text-blue-100">Manage your account information</p>
          </div>

          {/* Profile Content */}
          <div className="p-8">
            <div className="flex flex-col items-center gap-6">
              {/* Profile Photo */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#0050b2] shadow-xl">
                  <img
                    src={isEditing && previewImage ? previewImage : (userData?.photoURL || "https://via.placeholder.com/120")}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {isEditing && (
                  <label
                    htmlFor="profile-photo-upload"
                    className="absolute bottom-0 right-0 w-10 h-10 bg-[#0050b2] hover:bg-[#003d8a] rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-all duration-300 transform hover:scale-110"
                  >
                    <Camera className="w-5 h-5 text-white" />
                    <input
                      id="profile-photo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Name */}
              <div className="w-full max-w-md">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <User className="inline w-4 h-4 mr-1" />
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#0050b2] dark:focus:ring-blue-400 focus:border-transparent transition-all text-gray-900 dark:text-white"
                    placeholder="Enter your name"
                  />
                ) : (
                  <div className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white font-semibold">
                    {userData?.displayName || "No Name"}
                  </div>
                )}
              </div>

              {/* Email (Read-only) */}
              <div className="w-full max-w-md">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <Mail className="inline w-4 h-4 mr-1" />
                  Email Address
                </label>
                <div className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-600 dark:text-gray-400">
                  {userData?.email}
                </div>
              </div>

              {/* Role */}
              {userData?.role && (
                <div className="w-full max-w-md">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    <Shield className="inline w-4 h-4 mr-1" />
                    Role
                  </label>
                  <div className="inline-flex px-6 py-2 bg-[#0050b2]/10 dark:bg-[#0050b2]/20 text-[#0050b2] dark:text-blue-400 rounded-full font-bold text-sm">
                    {userData.role.charAt(0).toUpperCase() + userData.role.slice(1)}
                  </div>
                </div>
              )}

              {/* Join Date */}
              {userData?.createdAt && (
                <div className="w-full max-w-md">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    <Calendar className="inline w-4 h-4 mr-1" />
                    Member Since
                  </label>
                  <div className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white">
                    {new Date(userData.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              )}

              {/* Logout Button */}
              {!isEditing && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLogout}
                  className="w-full max-w-md mt-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Logout
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MyProfile;