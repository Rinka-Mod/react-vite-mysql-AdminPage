import express from "express";
import cors from "cors";
import { db } from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

// 1. Lấy danh sách sản phẩm
app.get("/api/products", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM products ORDER BY id DESC");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Thêm sản phẩm mới
app.post("/api/products", async (req, res) => {
  const { name, price, quantity, image_url } = req.body;
  try {
    // Lưu ý: Thứ tự các biến phải khớp với câu lệnh SQL
    await db.execute(
      "INSERT INTO products (name, price, quantity, image_url) VALUES (?, ?, ?, ?)",
      [name, price, quantity || 0, image_url || ""]
    );
    res.json({ message: "Thêm thành công" });
  } catch (error) {
    console.error("Lỗi MySQL:", error);
    res.status(500).json({ error: error.message });
  }
});

// 3. Cập nhật sản phẩm (Sửa)
app.put("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const { name, price, quantity, image_url } = req.body;
  try {
    const [result] = await db.execute(
      "UPDATE products SET name = ?, price = ?, quantity = ?, image_url = ? WHERE id = ?",
      [name, price, quantity, image_url, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }
    res.json({ message: "Cập nhật thành công" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. Xóa sản phẩm
app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute("DELETE FROM products WHERE id = ?", [id]);
    res.json({ message: "Xóa thành công" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => console.log("🚀 Server đang chạy tại http://localhost:3001"));