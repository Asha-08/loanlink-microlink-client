import React from 'react'
import useRole from '../../../hooks/useRole'
import LoadingSpinner from '../../../Component/LoadingSpinner/LoadingSpinner';
import AdminDashBoardHome from './AdminDashBoardHome';
import ManagerDashBoardHome from './ManagerDashBoardHome';
import UserDashBoardHome from './UserDashBoardHome';

const DashBoardHome = () => {
    const {role,roleLoading} = useRole();
    if(roleLoading){
        <LoadingSpinner></LoadingSpinner>
    }

    if(role === 'admin'){
        return <AdminDashBoardHome></AdminDashBoardHome>
    }
    else if (role === 'manager'){
        return <ManagerDashBoardHome></ManagerDashBoardHome>
    }
    else{
        return <UserDashBoardHome></UserDashBoardHome>
    }

}

export default DashBoardHome

