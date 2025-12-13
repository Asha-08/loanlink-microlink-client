import React from 'react'
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import Forbidden from '../Component/Forbidden/Forbidden';

const ManagerRoute = ({children}) => {
    const {loading,user} = useAuth();
     const {role,roleLoading} = useRole();
 
     if (loading ||!user || roleLoading ) {
         return <div>
             <span className="loading loading-infinity loading-xl"></span>
         </div>
     }
 
     if(role !== 'manager'){
         return <Forbidden></Forbidden>
     }

  return children;
}

export default ManagerRoute