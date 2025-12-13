import React from 'react'
import Forbidden from '../Component/Forbidden/Forbidden';
import useRole from '../hooks/useRole';
import useAuth from '../hooks/useAuth';

const AdminRoute = ({children}) => {

    const {loading} = useAuth();
    const {role,roleLoading} = useRole();

    if (loading || roleLoading) {
        return <div>
            <span className="loading loading-infinity loading-xl"></span>
        </div>
    }

    if(role !== 'admin'){
        return <Forbidden></Forbidden>
    }

  return children;
}

export default AdminRoute