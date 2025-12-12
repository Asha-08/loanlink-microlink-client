import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

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
                      user.status === "active" ? "badge-success" : "badge-error"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="flex flex-col sm:flex-row gap-2">
                  <button className="btn btn-success btn-sm">Approve</button>
                  <button className="btn btn-error btn-sm">Suspend</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
