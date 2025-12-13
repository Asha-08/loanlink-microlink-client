import { ShieldAlert } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router';

const Forbidden = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-red-50 to-red-100 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full text-center border border-red-200">
        
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 p-4 rounded-full">
            <ShieldAlert size={48} className="text-red-600" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-red-600 mb-2">
          403
        </h1>

        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Access Forbidden
        </h2>

        {/* Message */}
        <p className="text-gray-600 mb-6">
          You dont have permission to access this page.  
          Please contact the administrator if you think this is a mistake.
        </p>

        {/* Buttons */}
        <div className="flex gap-3 justify-center">
          <Link to="/" className="btn btn-outline btn-error">
            Go Home
          </Link>
          <Link to="/dashboard" className="btn btn-error text-white">
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Forbidden