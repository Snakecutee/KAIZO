/** @format */

import React, { useEffect, useState } from "react";
import UserAPI from "../API/UserAPI";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UserAPI.getAllData();
        setUsers(
          response.map((user) => ({
            ...user,
            isActive: user.isActive || false,
          }))
        );
      } catch (error) {
        console.error("Failed to fetch users:", error);
        alert("Failed to fetch user data. Please try again later.");
      }
    };

    fetchData();
  }, []);

  const handleUpdateUser = async (userId, currentStatus) => {
    try {
      const newStatus = !currentStatus;
      await UserAPI.updateUserStatus(userId, newStatus);
      console.log("thanh cong");
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, isActive: newStatus } : user
        )
      );
    } catch (error) {
      console.error("Failed to update user status:", error);
    }
  };
  return (
    <div className="page-wrapper">
      <div className="page-breadcrumb">
        <div className="row">
          <div className="col-7 align-self-center">
            <h4 className="page-title text-truncate text-dark font-weight-medium mb-1">
              Basic Initialisation
            </h4>
            <div className="d-flex align-items-center">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb m-0 p-0">
                  <li className="breadcrumb-item">
                    <a href="/" className="text-muted">
                      Home
                    </a>
                  </li>
                  <li
                    className="breadcrumb-item text-muted active"
                    aria-current="page"
                  >
                    Table
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Users</h4>
                <input
                  className="form-control w-25"
                  type="text"
                  placeholder="Enter Search!"
                />
                <br />
                <div className="table-responsive">
                  <table className="table table-striped table-bordered no-wrap">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Fullname</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users &&
                        users.map((user) => (
                          <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.fullname}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>
                              <button
                                style={{ cursor: "pointer" }}
                                className={`btn ${
                                  user.isActive ? "btn-danger" : "btn-success"
                                }`}
                                onClick={() =>
                                  handleUpdateUser(user._id, user.isActive)
                                }
                              >
                                {user.isActive ? "Deactivate" : "Activate"}
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer text-center text-muted">
        Designed and Developed by{" "}
        <a href="https://www.facebook.com/vandaicute1/">Văn Đại</a>.
      </footer>
    </div>
  );
}

export default Users;
