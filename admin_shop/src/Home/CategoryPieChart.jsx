/** @format */

import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import ProductAPI from "./../API/ProductAPI";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6699"];

const CategoryPieChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Trạng thái loading

  useEffect(() => {
    async function fetchProductData() {
      try {
        const response = await ProductAPI.getAPI();
        console.log("Phản hồi từ API:", response);

        // Kiểm tra nếu response là mảng
        if (!Array.isArray(response)) {
          console.error("Phản hồi API không hợp lệ:", response);
          throw new Error(
            "Dữ liệu sản phẩm không hợp lệ hoặc không phải là mảng"
          );
        }

        const categoryCount = {};

        // Duyệt qua từng sản phẩm trong mảng
        response.forEach((product) => {
          const category = product.category;
          if (category) {
            categoryCount[category] = (categoryCount[category] || 0) + 1;
          }
        });

        // Chuyển đổi thành dữ liệu cho biểu đồ
        const chartData = Object.keys(categoryCount).map((key) => ({
          name: key,
          value: categoryCount[key],
        }));

        setData(chartData); // Cập nhật dữ liệu
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
      } finally {
        setLoading(false); // Cập nhật trạng thái khi hoàn thành tải dữ liệu
      }
    }

    fetchProductData();
  }, []);

  return (
    <div>
      <h3>Số sản phẩm theo từng danh mục</h3>
      {loading ? (
        <p>Đang tải dữ liệu...</p> // Hiển thị nếu dữ liệu đang tải
      ) : data.length > 0 ? (
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx={200}
            cy={200}
            labelLine={false}
            label={(entry) => `${entry.name} (${entry.value})`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      ) : (
        <p>Không có dữ liệu để hiển thị</p> // Hiển thị nếu không có dữ liệu
      )}
    </div>
  );
};

export default CategoryPieChart;
