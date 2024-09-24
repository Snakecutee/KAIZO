import React, { useEffect, useState } from 'react';
import HistoryAPI from '../API/HistoryAPI';


// import io from "socket.io-client";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
// const socket = io("http://localhost:8000");

function History(props) {

    const [history, setHistory] = useState([])

    const [load, setLoad] = useState(false)

    const [text, setText] = useState('')
    const navigate = useHistory();

    useEffect(() => {

        const fetchData = async () => {

            const response = await HistoryAPI.getAll()
            console.log(response)

            setHistory(response)

        }

        fetchData()

    }, []);

    // const handleViewClick = (historyId) => {
    //     navigate.push(`/history/${historyId}`); 
       
    //   };


    return (
        <div className="page-wrapper">
            <div className="page-breadcrumb">
                <div className="row">
                    <div className="col-7 align-self-center">
                        <h4 className="page-title text-truncate text-dark font-weight-medium mb-1">Basic Initialisation</h4>
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
                                <h3>{text}</h3>
                                <input className="form-control w-25" type="text" placeholder="Enter Search!" />
                                <br />
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
                                                <th>Detail</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                history && history.map(value => (
                                                    <tr key={value._id}>
                                                        <td>{value.idUser}</td>
                                                        <td>{value.fullname}</td>
                                                        <td>{value.phone}</td>
                                                        <td>{value.address}</td>
                                                        <td>{value.total}</td>
                                                        <td>{value.delivery ? 'Đã Vận Chuyển' : 'Chưa Vận Chuyển'}</td>
                                                        <td>{value.status ? 'Đã Thanh Toán' : 'Chưa Thanh Toán'}</td>
                                                        <td>
                                                        {/* <a
                      style={{ cursor: 'pointer', color: 'white' }}
                      className="btn btn-success"
                      onClick={() => handleViewClick(value._id)}
                    >
                      View
                    </a> */}
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="footer text-center text-muted">
                 Designed and Developed by <a
                    href="hhttps://www.facebook.com/vandaicute1/">Văn Đại</a>.
            </footer>
        </div>
    );
}

export default History;