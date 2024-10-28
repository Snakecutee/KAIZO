import React, { useEffect, useState } from 'react';
import UserAPI from '../API/UserAPI';

function Profile() {
    const [user, setUser] = useState({
        fullname: '',
        email: '',
        phone: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Thêm state để lưu thông báo lỗi
    const userId = sessionStorage.getItem('id_user'); // Lấy ID người dùng từ sessionStorage

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await UserAPI.getDetailData(userId);
                setUser(response);
                setLoading(false);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu người dùng:", error);
                setError("Có lỗi xảy ra khi lấy dữ liệu."); // Ghi lỗi vào state
            }
        };

        fetchData();
    }, [userId]);

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleEditToggle = () => {
        setIsEditing(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Gọi hàm cập nhật người dùng với ID và dữ liệu người dùng
            const response = await UserAPI.updateUserData(userId, user);
            alert('Cập nhật hồ sơ thành công!');
            setIsEditing(false);
        } catch (error) {
            console.error("Lỗi khi cập nhật hồ sơ:", error);
            setError("Cập nhật hồ sơ không thành công. Vui lòng thử lại."); 
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
            {error && <div className="alert alert-danger">{error}</div>} {/* Hiển thị thông báo lỗi */}
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
                                <div className="d-flex justify-content-between">
                                    {isEditing ? (
                                        <button type="submit" className="btn btn-success">Save</button>
                                    ) : (
                                        <button type="button" className="btn btn-secondary" onClick={handleEditToggle}>Edit</button>
                                    )}
                                    {isEditing && (
                                        <button type="button" className="btn btn-danger" onClick={handleCancel}>Cancel</button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
