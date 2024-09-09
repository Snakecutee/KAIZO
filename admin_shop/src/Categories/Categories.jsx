import React, { useEffect, useState } from 'react';
import UserAPI from '../API/UserAPI';
import ProductAPI from '../API/ProductAPI';

function Categories(props) {

    const [categories, setCategories] = useState([])

    useEffect(() => {

        const fetchData = async () => {
            const response = await ProductAPI.getCategories();
            setCategories(response);
        }

        fetchData()

    }, [])

    return (
        <div className="page-wrapper">
            <div className="page-breadcrumb">
                <div className="row">
                    <div className="col-7 align-self-center">
                        <h4 className="page-title text-truncate text-dark font-weight-medium mb-1">Categories Manage</h4>
                        <div className="d-flex align-items-center">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb m-0 p-0">
                                    <li className="breadcrumb-item"><a href="/" className="text-muted">Home</a></li>
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
                                <h4 className="card-title">Categories</h4>
                                <div className='d-flex justify-content-between'>
                                    <input className="form-control w-25" type="text" placeholder="Enter Search!" />
                                    <a
                                        href={'/categories/view-edit'}
                                        style={{ cursor: 'pointer', color: 'white' }}
                                        className='btn btn-success'>
                                        Create Category
                                    </a>
                                </div>
                                <br/>
                                <div className="table-responsive">
                                    <table className="table table-striped table-bordered no-wrap">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Category</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                categories && categories.map(value => (
                                                    <tr key={value._id}>
                                                        <td>{value.category}</td>
                                                        <td>
                                                            <a href={`/categories/view-edit?id=${value._id}`} style={{cursor: 'pointer', color: 'white'}} className="btn btn-success">Update</a>
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

export default Categories;