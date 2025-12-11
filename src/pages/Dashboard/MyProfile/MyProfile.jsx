import React from 'react'
import useAuth from '../../../hooks/useAuth';

const MyProfile = () => {
    const { user, logOut } = useAuth();

  const handleLogout = () => {
    logOut();
  };
  return (
     <div className="max-w-md mx-auto bg-white shadow-lg p-6 rounded-xl">

      <h2 className="text-2xl font-semibold mb-4 text-center">
        My Profile
      </h2>

      <div className="flex flex-col items-center gap-4">

        {/* Photo */}
        <img
          src={user?.photoURL || "https://via.placeholder.com/120"}
          alt="profile"
          className="w-32 h-32 rounded-full object-cover border"
        />

        {/* Name */}
        <h3 className="text-xl font-bold">{user?.displayName || "No Name"}</h3>

        {/* Email */}
        <p className="text-gray-600">{user?.email}</p>

        {/* Role (if exists in your database) */}
        {user?.role && (
          <p className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
            {user.role}
          </p>
        )}

        {/* Join Date (optional) */}
        {user?.metadata?.creationTime && (
          <p className="text-sm text-gray-500">
            Joined: {new Date(user.metadata.creationTime).toLocaleDateString()}
          </p>
        )}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="btn btn-error text-white mt-4 w-full"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default MyProfile