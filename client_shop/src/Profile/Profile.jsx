/** @format */

import React, { useEffect, useState } from "react";
import UserAPI from "../API/UserAPI";

function Profile() {
  const [user, setUser] = useState({
    fullname: "",
    email: "",
    phone: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // State cho đổi mật khẩu
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userId = sessionStorage.getItem("id_user");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UserAPI.getDetailData(userId);
        setUser(response);
        setLoading(false);
      } catch (error) {
        console.error("Err:", error);
        setError("Err");
      }
    };

    fetchData();
  }, [userId]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditToggle = () => {
    setIsEditing((prevState) => !prevState);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("New password and authentication password do not match.");
      return;
    }

    try {
      const response = await UserAPI.changePassword(userId, {
        password: newPassword, // Đảm bảo bạn đang gửi đúng dữ liệu
      });
      setSuccess("Password changed successfully!");
      setError(null);
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error(
        "Err:",
        error.response ? error.response.data : error.message
      );
      setError("Password change failed. Please try again..");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await UserAPI.updateUserData(userId, {
        fullname: user.fullname,
        email: user.email,
        phone: user.phone,
      });
      alert("Profile update successful!");
      setIsEditing(false);
    } catch (error) {
      console.error("Err:", error.response ? error.response.data : error);
      setError("Profile update failed. Please try again.");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-primary text-white text-center">
              <h3>Profile</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Name of user</label>
                  <input
                    type="text"
                    name="fullname"
                    className="form-control"
                    value={user.fullname}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={user.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    value={user.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                {isEditing ? (
                  <>
                    <button type="submit" className="btn btn-success">
                      Save
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleEditToggle}
                  >
                    Edit
                  </button>
                )}
              </form>

              {/* Phần đổi mật khẩu */}
              <h5 className="mt-4">Change Password</h5>
              <form onSubmit={handlePasswordSubmit}>
                <div className="form-group">
                  <label>New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    className="form-control"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Confirm New Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Change Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
