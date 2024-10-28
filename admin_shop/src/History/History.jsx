import React, { useEffect, useState } from 'react';
import HistoryAPI from '../API/HistoryAPI';

function History(props) {
    const [history, setHistory] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null); 
    const [newStatus, setNewStatus] = useState(false); 
    const [newDelivery, setNewDelivery] = useState(false); 
    const [temp, setTemp] = useState([]);  

    // Search function to filter by 'fullname'
    const onChangeText = (e) => {
        const value = e.target.value; 
        if (!value) {
            setHistory(temp); 
            return;
        }
        
        const searchHistory = temp.filter(item => 
            item.fullname.toUpperCase().indexOf(value.toUpperCase()) !== -1
        );
        setHistory(searchHistory); 
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await HistoryAPI.getAll(); 
            setHistory(response); 
            setTemp(response); 
        };
        fetchData();
    }, []);

    const handleEditClick = (item) => {
        setSelectedItem(item);
        setNewStatus(item.status); 
        setNewDelivery(item.delivery); 
    };

    const handleUpdateStatus = async () => {
        if (!selectedItem) return;

        try {
            await HistoryAPI.updateStatus(selectedItem._id, { status: newStatus, delivery: newDelivery });
            setHistory(prevHistory =>
                prevHistory.map(item =>
                    item._id === selectedItem._id ? { ...item, status: newStatus, delivery: newDelivery } : item
                )
            );
            setSelectedItem(null);
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Error updating status. Please try again later.');
        }
    };

    return (
        <div className="page-wrapper">
            <div className="page-breadcrumb">
                <div className="row">
                    <div className="col-7 align-self-center">
                        <h4 className="page-title text-truncate text-dark font-weight-medium mb-1">History Table</h4>
                        <div className="d-flex align-items-center">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb m-0 p-0">
                                    <li className="breadcrumb-item"><a href="/" className="text-muted">History</a></li>
                                    <li className="breadcrumb-item text-muted active" aria-current="page">Table</li>
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
                                <h4 className="card-title">History</h4>
                               
                                    <input className="form-control w-25" onChange={onChangeText} type="text" placeholder="Enter name " />
                                    <br/>
                               
                                <div className="table-responsive">
                                    <table className="table table-striped table-bordered no-wrap">
                                        <thead>
                                            <tr>
                                                <th>ID User</th>
                                                <th>Name</th>
                                                <th>Phone</th>
                                                <th>Address</th>
                                                <th>Total</th>
                                                <th>Delivery</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {history && history.map(value => (
                                                <tr key={value._id}>
                                                    <td>{value.idUser}</td>
                                                    <td>{value.fullname}</td>
                                                    <td>{value.phone}</td>
                                                    <td>{value.address}</td>
                                                    <td>{value.total}</td>
                                                    <td>{value.delivery ? 'Đã Vận Chuyển' : 'Chưa Vận Chuyển'}</td>
                                                    <td>{value.status ? 'Đã Thanh Toán' : 'Chưa Thanh Toán'}</td>
                                                    <td>
                                                        <button 
                                                            className="btn btn-primary" 
                                                            onClick={() => handleEditClick(value)}
                                                        >
                                                            Edit
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Form to edit status */}
                        {selectedItem && (
                            <div className="edit-form">
                                <h4>Edit Status for {selectedItem.fullname}</h4>
                                <div className="form-group">
                                    <label>Status:</label>
                                    <select 
                                        className="form-control"
                                        value={newStatus}
                                        onChange={(e) => setNewStatus(e.target.value === 'true')}
                                    >
                                        <option value="true">Đã Thanh Toán</option>
                                        <option value="false">Chưa Thanh Toán</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Delivery:</label>
                                    <select 
                                        className="form-control"
                                        value={newDelivery}
                                        onChange={(e) => setNewDelivery(e.target.value === 'true')}
                                    >
                                        <option value="true">Đã Vận Chuyển</option>
                                        <option value="false">Chưa Vận Chuyển</option>
                                    </select>
                                </div>
                                <button className="btn btn-success" onClick={handleUpdateStatus}>
                                    Update Status
                                </button>
                                <button className="btn btn-secondary" onClick={() => setSelectedItem(null)}>
                                    Cancel
                                </button>
                            </div>
                        )}

                    </div>
                </div>
            </div>

            <footer className="footer text-center text-muted">
                Designed and Developed by <a href="https://www.facebook.com/vandaicute1/">Văn Đại</a>.
            </footer>
        </div>
    );
}

export default History;
