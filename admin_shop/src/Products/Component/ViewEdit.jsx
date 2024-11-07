/** @format */

import React, { useEffect, useState } from "react";
import ProductAPI from "../../API/ProductAPI";
import { useLocation } from "react-router-dom";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const ViewEdit = () => {
  const productId = useQuery().get("id");
  const [product, setProduct] = useState({});
  const [categoires, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await ProductAPI.getCategories();
      if (res?.length > 0) {
        setCategories(res);
      }
    })();
    if (productId) {
      (async () => {
        const res = await ProductAPI.getDetail(productId);
        if (res._id) {
          setProduct({ ...res });
        }
      })();
    }
  }, [productId]);

  const handleCreateProduct = async () => {
    if (!productId) {
      if (!product?.file) return;
    }
    const formData = new FormData();
    Object.keys(product).forEach((item) => {
      // const value = item === "stock" ? Number(product[item]) : product[item];
      formData.append(item, product[item]);
    });
    if (productId) {
      const res = await ProductAPI.updateProduct(productId, formData);
      if (res?._id) {
        window.location.href = "/products";
      }
    } else if (!productId) {
      const res = await ProductAPI.createProduct(formData);
      if (res?._id) {
        setProduct({});
        window.location.href = "/products";
      }
    }
  };

  const onSelectImage = (e) => {
    if (e.target.files[0]) {
      setProduct({ ...product, file: e.target.files[0] });
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-breadcrumb">
        <div className="row">
          <div className="col-7 align-self-center">
            <h4 className="page-title text-truncate text-dark font-weight-medium mb-1">
              Product
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
                  ></li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card" style={{ paddingTop: "1.5rem" }}>
              <div style={{ margin: "0 1.5rem 1.5rem" }}>
                <h5 className="card-title">Name Product</h5>
                <div className="d-flex justify-content-between">
                  <input
                    onChange={(e) =>
                      setProduct({ ...product, name: e.target.value })
                    }
                    value={product?.name || ""}
                    className="form-control w-50"
                    type="text"
                    placeholder="Enter Name Product!"
                  />
                </div>
              </div>
              <div style={{ margin: "0 1.5rem 1.5rem" }}>
                <h5 className="card-title">Description</h5>
                <div className="d-flex justify-content-between">
                  <input
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        description: e.target.value,
                      })
                    }
                    value={product?.description || ""}
                    className="form-control w-50"
                    type="text"
                    placeholder="Enter Description Product!"
                  />
                </div>
              </div>
              <div style={{ margin: "0 1.5rem 1.5rem" }}>
                <h5 className="card-title">Price Product</h5>
                <div className="d-flex justify-content-between">
                  <input
                    onChange={(e) =>
                      setProduct({ ...product, price: e.target.value })
                    }
                    value={product?.price || ""}
                    className="form-control w-50"
                    type="number"
                    min="0"
                    placeholder="Enter Price Product!"
                  />
                </div>
              </div>
              <div style={{ margin: "0 1.5rem 1.5rem" }}>
                <h5 className="card-title">Stock</h5>
                <div className="d-flex justify-content-between">
                  <input
                    onChange={(e) =>
                      setProduct({ ...product, stock: e.target.value })
                    }
                    value={product?.stock || ""}
                    className="form-control w-50"
                    type="number"
                    min="0"
                    placeholder="Enter Stock Quantity!"
                  />
                </div>
              </div>

              <div style={{ margin: "0 1.5rem 1.5rem" }}>
                <input
                  type="file"
                  onChange={onSelectImage}
                  multiple
                  id="file-image"
                  class="product-file__upload-btn"
                  placeholder="Tải hình ảnh"
                />
              </div>
              <div style={{ margin: "0 1.5rem 1.5rem" }}>
                <h5 className="card-title">Category</h5>
                <div className="d-flex justify-content-between">
                  <select
                    value={product?.category || ""}
                    onChange={(e) =>
                      setProduct({ ...product, category: e.target.value })
                    }
                  >
                    <option value="">Choose Category</option>
                    {categoires?.length &&
                      categoires.map((item) => (
                        <option value={item.category}>{item?.category}</option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="d-flex" style={{ margin: "0 1.5rem 1.5rem" }}>
                <button
                  disabled={
                    !product?.name ||
                    !product?.price ||
                    !product?.category ||
                    !product?.description ||
                    !product?.stock
                  }
                  onClick={handleCreateProduct}
                  style={{ cursor: "pointer", color: "white" }}
                  className="btn btn-success"
                >
                  {productId ? "Update Product" : "Create Product"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer text-center text-muted">
        Designed and Developed by{" "}
        <a href="hhttps://www.facebook.com/vandaicute1/">Văn Đại</a>.
      </footer>
    </div>
  );
};

export default ViewEdit;
