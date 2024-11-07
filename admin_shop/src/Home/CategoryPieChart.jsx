/** @format */

import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import ProductAPI from "./../API/ProductAPI";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6699"];

const CategoryPieChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchProductData() {
      try {
        const response = await ProductAPI.getAPI(); // Gọi API để lấy tất cả sản phẩm
        console.log(response); // Kiểm tra toàn bộ phản hồi

        // Kiểm tra xem response.data có phải là một mảng không
        if (!response || !Array.isArray(response.data)) {
          throw new Error("Dữ liệu sản phẩm không hợp lệ");
        }

        const categoryCount = {};

        // Tính số lượng sản phẩm theo category
        response.data.forEach((product) => {
          const category = product.category; // Truy cập thuộc tính category trong sản phẩm
          if (category) {
            // Kiểm tra sự tồn tại của category
            if (categoryCount[category]) {
              categoryCount[category] += 1;
            } else {
              categoryCount[category] = 1;
            }
          }
        });

        // Chuyển đổi categoryCount thành mảng dữ liệu cho biểu đồ
        const chartData = Object.keys(categoryCount).map((key) => ({
          name: key,
          value: categoryCount[key],
        }));

        setData(chartData);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
      }
    }

    fetchProductData();
  }, []);

  return (
    <div>
      <h3>Số sản phẩm theo từng danh mục</h3>
      {data.length > 0 ? ( // Kiểm tra xem dữ liệu có tồn tại
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
        <p>Đang tải dữ liệu...</p> // Thông báo đang tải dữ liệu
      )}
    </div>
  );
};

export default CategoryPieChart;
