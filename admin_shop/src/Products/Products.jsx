/** @format */

import React, { useEffect, useState } from "react";
import queryString from "query-string";
import ProductAPI from "../API/ProductAPI";
import Pagination from "./Component/Pagination";

function Products(props) {
  const [products, setProducts] = useState([]);
  const [temp, setTemp] = useState([]);
  const [pagination, setPagination] = useState({
    page: "1",
    count: "8",
    search: "",
    category: "all",
  });
  const [totalPage, setTotalPage] = useState();
  const [message, setMessage] = useState(""); // State để lưu thông báo

  const onChangeText = (e) => {
    const value = e.target.value;
    if (!value) {
      setProducts(temp);
      return;
    }
    const searchProducts = temp.filter(
      (item) => item.name.toUpperCase().indexOf(value.toUpperCase()) !== -1
    );
    setProducts(searchProducts);
  };

  const handlerChangePage = (value) => {
    setPagination({
      page: value,
      count: pagination.count,
      category: pagination.category,
    });
  };

  useEffect(() => {
    const fetchAllData = async () => {
      const params = {
        page: pagination.page,
        count: pagination.count,
        category: pagination.category,
      };

      const query = queryString.stringify(params);
      const newQuery = "?" + query;

      const { products, total } = await ProductAPI.getPagination(newQuery);
      setProducts(products);
      setTemp(products);

      const totalPage = Math.ceil(parseInt(total) / parseInt(pagination.count));
      setTotalPage(totalPage);
    };

    fetchAllData();
  }, [pagination]);

  const handleDeleteProduct = async (id) => {
    try {
      await ProductAPI.deleteProduct(id); // Gọi API xóa sản phẩm
      setMessage("Product deleted successfully!"); // Hiển thị thông báo thành công
      setPagination({ ...pagination, page: "1" }); // Tải lại trang đầu tiên
    } catch (error) {
      setMessage("Failed to delete the product."); // Hiển thị thông báo lỗi
      console.error("Error deleting product:", error);
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
                <h4 className="card-title">Products</h4>
                <div className="d-flex justify-content-between">
                  <input
                    className="form-control w-25"
                    onChange={onChangeText}
                    type="text"
                    placeholder="Enter Search!"
                  />
                  <a
                    href={"/products/view-edit"}
                    style={{ cursor: "pointer", color: "white" }}
                    className="btn btn-success"
                  >
                    Create Product
                  </a>
                </div>
                <br />
                {message && (
                  <div className="alert alert-info">{message}</div>
                )}{" "}
                {/* Hiển thị thông báo */}
                <div className="table-responsive">
                  <table className="table table-striped table-bordered no-wrap">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Description</th>
                        <th>Stock</th>
                        <th>Category</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products &&
                        products.map((value) => (
                          <tr key={value._id}>
                            <td>{value._id}</td>
                            <td>{value.name}</td>
                            <td>{value.price}</td>
                            <td>
                              <img
                                src={value.img1}
                                style={{ height: "60px", width: "60px" }}
                                alt=""
                              />
                            </td>
                            <td>
                              <div className="line-clamp">
                                {value?.description}
                              </div>
                            </td>
                            <td>{value.stock}</td>
                            <td>{value.category}</td>
                            <td>
                              <a
                                href={`/products/view-edit?id=${value._id}`}
                                style={{ cursor: "pointer", color: "white" }}
                                className="btn btn-success"
                              >
                                Update
                              </a>
                              <a
                                href="#"
                                onClick={() => {
                                  handleDeleteProduct(value._id);
                                }}
                                style={{ cursor: "pointer", color: "white" }}
                                className="btn btn-danger"
                              >
                                {" "}
                                Delete
                              </a>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <Pagination
                    pagination={pagination}
                    handlerChangePage={handlerChangePage}
                    totalPage={totalPage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer text-center text-muted">
        <a href="hhttps://www.facebook.com/vandaicute1/">Văn Đại</a>.
      </footer>
    </div>
  );
}

export default Products;
