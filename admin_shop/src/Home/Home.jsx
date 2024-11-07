/** @format */

import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import UserAPI from "../API/UserAPI"; // Cập nhật đường dẫn nếu cần
import HistoryAPI from "../API/HistoryAPI";
import CategoryPieChart from "./CategoryPieChart";

Home.propTypes = {};

function Home(props) {
  const [userCount, setUserCount] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [totalItemsSold, setTotalItemsSold] = useState(0);

  // Hàm gọi API để lấy số lượng người dùng
  useEffect(() => {
    async function fetchUserCount() {
      try {
        const response = await UserAPI.getAllData();
        setUserCount(response.length); // Giả sử response là danh sách người dùng
      } catch (error) {
        console.error("Lỗi khi lấy số lượng người dùng:", error);
      }
    }

    fetchUserCount();
  }, []);

  // Hàm gọi API để tính tổng doanh số và số hàng đã bán
  useEffect(() => {
    async function fetchSalesData() {
      try {
        const response = await HistoryAPI.getAll(); // Gọi API để lấy tất cả lịch sử

        // Tính tổng doanh số và số lượng hàng đã bán
        let totalSales = 0;
        // let itemsSold = 0;

        response.forEach((item) => {
          // Chuyển đổi total thành số và cộng vào tổng doanh số
          totalSales += parseFloat(item.total || 0);
        });

        setTotalSales(totalSales); // Cập nhật tổng doanh số
        setTotalItemsSold(response.length); // Cập nhật số hàng đã bán
      } catch (error) {
        console.error("Lỗi khi lấy doanh số:", error);
      }
    }

    fetchSalesData();
  }, []);

  return (
    <div className="page-wrapper">
      <div className="page-breadcrumb">
        <div className="row">
          <div className="col-7 align-self-center">
            <h3 className="page-title text-truncate text-dark font-weight-medium mb-1">
              Hello Admin!
            </h3>
            <div className="d-flex align-items-center">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb m-0 p-0">
                  <li className="breadcrumb-item">
                    <a href="index.html">Dashboard</a>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="card-group">
          {/* Card hiển thị số lượng người dùng */}
          <div className="card border-right">
            <div className="card-body">
              <div className="d-flex d-lg-flex d-md-block align-items-center">
                <div>
                  <div className="d-inline-flex align-items-center">
                    <h2 className="text-dark mb-1 font-weight-medium">
                      {userCount}
                    </h2>
                  </div>
                  <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">
                    Người dùng mới đăng ký
                  </h6>
                </div>
                <div className="ml-auto mt-md-3 mt-lg-0">
                  <span className="opacity-7 text-muted">
                    <i data-feather="user-plus"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card hiển thị số hàng đã bán */}
          <div className="card border-right">
            <div className="card-body">
              <div className="d-flex d-lg-flex d-md-block align-items-center">
                <div>
                  <div className="d-inline-flex align-items-center">
                    <h2 className="text-dark mb-1 font-weight-medium">
                      {totalItemsSold}
                    </h2>
                  </div>
                  <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">
                    Số hàng đã bán
                  </h6>
                </div>
                <div className="ml-auto mt-md-3 mt-lg-0">
                  <span className="opacity-7 text-muted">
                    <i data-feather="shopping-cart"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card hiển thị tổng doanh số */}
          <div className="card border-right">
            <div className="card-body">
              <div className="d-flex d-lg-flex d-md-block align-items-center">
                <div>
                  <div className="d-inline-flex align-items-center">
                    <h2 className="text-dark mb-1 font-weight-medium">
                      ${totalSales.toFixed(2)}
                    </h2>
                  </div>
                  <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">
                    Tổng Doanh Số
                  </h6>
                </div>
                <div className="ml-auto mt-md-3 mt-lg-0">
                  <span className="opacity-7 text-muted">
                    <i data-feather="dollar-sign"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bảng hiển thị các thông tin khác có thể thêm vào đây */}
        <div className="page-wrapper">
          <CategoryPieChart />
        </div>
        {/* <footer className="footer text-center text-muted">
          by <a href="https://www.facebook.com/vandaicute1/">Văn Đại</a>.
        </footer> */}
      </div>
    </div>
  );
}

export default Home;
