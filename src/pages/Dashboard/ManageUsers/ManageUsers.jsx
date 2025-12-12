import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [],refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const [selectedUser, setSelectedUser] = useState(null);

  // const handleApprove = (id) => {
  //   axiosSecure.patch(`/users/approve/${id}`).then((res) => {
  //     if (res.data.modifiedCount > 0) {
  //       Swal.fire({
  //         icon: "success",
  //         title: "User Approved Successfully",
  //         timer: 1200,
  //         showConfirmButton: false,
  //       });
  //       setSelectedUser(null);
  //       refetch();
  //     }
  //   });
  // };

    
  
  const handleApprove = id =>{
    const updateInfo = {status:'approved'}
    axiosSecure.patch(`/users/${id}`,updateInfo)
    .then(res=>{
      if(res.data.modifiedCount){
         Swal.fire({
          icon: "success",
          title: "User Approved Successfully",
          timer: 1200,
          showConfirmButton: false,
        });
        refetch();
      }
    })
  }

  // suspend handeler
  const handleSuspend = (e, id) => {
    e.preventDefault();

    const reason = e.target.reason.value;
    const feedback = e.target.feedback.value;

    axiosSecure
      .patch(`/users/suspend/${id}`, { reason, feedback })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            icon: "error",
            title: "User Suspended",
            timer: 1200,
            showConfirmButton: false,
          });
          setSelectedUser(null);
          refetch();
        }
      });
  };

  return (
    <div>
      <h2 className="text-4xl">User Role Pending for Approval:</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full min-w-[600px]">
          {/* Table Head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Requested Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.displayName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.requestedRole || "None"}</td>
                <td>
                  <span
                    className={`badge ${
                      user.status === "approved"
                        ? "badge-success"
                        : user.status === "pending"
                        ? "badge-error"
                        : user.status === "suspend"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="flex flex-col sm:flex-row gap-2">
                  {user.role !== "admin" && (
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="btn btn-primary btn-sm"
                    >
                      Update
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* update Modal */}
      {selectedUser && (
        <dialog className="modal modal-open">
          <div className="modal-box w-96 max-w-lg">
            <h3 className="text-xl font-bold mb-4">
              Update User: {selectedUser.displayName}
            </h3>

            {/* Approve */}
            <button
              className="btn btn-success w-full mb-3"
              onClick={() => handleApprove(selectedUser._id)}
              disabled={!selectedUser.requestedRole}
            >
              Approve Requested Role
            </button>

            {!selectedUser.requestedRole && (
              <p className="text-sm text-gray-500 mb-3">
                This user did not request any role.
              </p>
            )}

            <hr className="my-4" />

            {/* Suspend */}
            <h4 className="font-semibold">Suspend User</h4>

            <form
              onSubmit={(e) => handleSuspend(e, selectedUser._id)}
              className="space-y-3 mt-2"
            >
              <input
                name="reason"
                placeholder="Suspend Reason"
                className="input input-bordered w-full"
                required
              />
              <textarea
                name="feedback"
                placeholder="Explanation / Feedback"
                className="textarea textarea-bordered w-full"
                required
              ></textarea>

              <button className="btn btn-error w-full">Suspend</button>
            </form>

            <div className="modal-action">
              <button className="btn" onClick={() => setSelectedUser(null)}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ManageUsers;
