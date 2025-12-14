import React from 'react'
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const MyProfile = () => {
    const { user, logOut } = useAuth();
    const axiosSecure = useAxiosSecure();

     const { data: userData, isLoading } = useQuery({
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

   if (isLoading) return <p className="text-center mt-4">Loading...</p>;

  return (
     <div className="max-w-md mx-auto bg-white shadow-lg p-6 rounded-xl border border-pink-200">
      <h2 className="text-2xl font-semibold mb-6 text-center text-pink-700">
        My Profile
      </h2>

      <div className="flex flex-col items-center gap-4">
        {/* Photo */}
        <img
          src={userData?.photoURL || "https://via.placeholder.com/120"}
          alt="profile"
          className="w-32 h-32 rounded-full object-cover border-2 border-pink-300 shadow-sm"
        />

        {/* Name */}
        <h3 className="text-xl font-bold text-pink-600">
          {userData?.displayName || "No Name"}
        </h3>

        {/* Email */}
        <p className="text-gray-600">{userData?.email}</p>

        {/* Role */}
        {userData?.role && (
          <p className="px-4 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium">
            {userData.role}
          </p>
        )}

        {/* Join Date */}
        {userData?.createdAt && (
          <p className="text-sm text-gray-500">
            Joined: {new Date(userData.createdAt).toLocaleDateString()}
          </p>
        )}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="btn bg-pink-600 hover:bg-pink-700 text-white mt-6 w-full"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default MyProfile