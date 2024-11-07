/** @format */

import React, { useEffect, useState } from "react";
import ProductAPI from "../API/ProductAPI";
function Categories() {
  const [temp, setTemp] = useState([]);
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");
  const onChangeText = (e) => {
    const value = e.target.value;
    if (!value) {
      setCategories(temp);
      return;
    }

    const searchCategories = temp.filter(
      (item) => item.category.toUpperCase().indexOf(value.toUpperCase()) !== -1
    );
    setCategories(searchCategories);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await ProductAPI.getCategories(); //  API
      setCategories(response);
      setTemp(response);
    };

    fetchData();
  }, []);
  const handleDeleteCategory = async (id) => {
    try {
      await ProductAPI.deleteCategory(id); // Gọi API xóa category với id
      setMessage("Category deleted successfully!");
      // Cập nhật lại danh sách categories sau khi xóa
      setCategories(categories.filter((category) => category._id !== id));
    } catch (error) {
      setMessage("Failed to delete the category.");
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-breadcrumb">
        <div className="row">
          <div className="col-7 align-self-center">
            <h4 className="page-title text-truncate text-dark font-weight-medium mb-1">
              Categories Manage
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
                <h4 className="card-title">Categories</h4>
                <div className="d-flex justify-content-between">
                  <input
                    className="form-control w-25"
                    onChange={onChangeText}
                    type="text"
                    placeholder="Enter Search!"
                  />
                  <a
                    href={"/categories/view-edit"}
                    style={{ cursor: "pointer", color: "white" }}
                    className="btn btn-success"
                  >
                    Create Category
                  </a>
                </div>
                <br />
                <div className="table-responsive">
                  <table className="table table-striped table-bordered no-wrap">
                    <thead>
                      <tr>
                        <th>Category</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories &&
                        categories.map((value) => (
                          <tr key={value._id}>
                            <td>{value.category}</td>
                            <td>
                              <a
                                href={`/categories/view-edit?id=${value._id}`}
                                style={{ cursor: "pointer", color: "white" }}
                                className="btn btn-success"
                              >
                                Update
                              </a>
                              <button
                                onClick={() => handleDeleteCategory(value._id)}
                                className="btn btn-danger"
                              >
                                Delete
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
export default Categories;
