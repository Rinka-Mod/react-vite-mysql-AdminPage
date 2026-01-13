import { useEffect, useState } from "react";

function Admin() {
  const [products, setProducts] = useState<any[]>([]);
  
  // State quản lý Form
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  
  // State xác định đang sửa sản phẩm nào
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchProducts = () => {
    fetch("http://localhost:3001/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(err => console.error("Lỗi tải dữ liệu:", err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      name,
      price: Number(price),
      quantity: Number(quantity),
      image_url: imageUrl,
    };

    const method = editingId ? "PUT" : "POST";
    const url = editingId 
      ? `http://localhost:3001/api/products/${editingId}` 
      : "http://localhost:3001/api/products";

    try {
      const res = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (res.ok) {
        alert(editingId ? "Cập nhật thành công!" : "Thêm vào kho thành công!");
        // Reset form
        setName(""); setPrice(""); setQuantity(""); setImageUrl("");
        setEditingId(null);
        fetchProducts(); // Tải lại danh sách ngay lập tức
      } else {
        alert("Có lỗi xảy ra, vui lòng kiểm tra lại!");
      }
    } catch (error) {
      alert("Không thể kết nối đến server!");
    }
  };

  const handleEdit = (p: any) => {
    setEditingId(p.id);
    setName(p.name);
    setPrice(p.price.toString());
    setQuantity(p.quantity.toString());
    setImageUrl(p.image_url || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteProduct = async (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      await fetch(`http://localhost:3001/api/products/${id}`, { method: "DELETE" });
      fetchProducts();
    }
  };

  return (
    <div className="admin-container" style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center" }}>🛠 QUẢN LÝ KHO SẢN PHẨM</h2>

      {/* Form Nhập Liệu */}
      <form onSubmit={handleSubmit} style={{ background: "#f9f9f9", padding: "20px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
        <h3 style={{ color: editingId ? "#28a745" : "#333" }}>
          {editingId ? "✏️ Đang chỉnh sửa sản phẩm" : "➕ Thêm sản phẩm mới"}
        </h3>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
          <div>
            <label>Tên sản phẩm:</label>
            <input style={{ width: "100%", padding: "8px" }} value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div>
            <label>Giá bán (VNĐ):</label>
            <input type="number" style={{ width: "100%", padding: "8px" }} value={price} onChange={e => setPrice(e.target.value)} required />
          </div>
          <div>
            <label>Số lượng kho:</label>
            <input type="number" style={{ width: "100%", padding: "8px" }} value={quantity} onChange={e => setQuantity(e.target.value)} required />
          </div>
          <div>
            <label>Link ảnh sản phẩm:</label>
            <input style={{ width: "100%", padding: "8px" }} value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="https://..." />
          </div>
        </div>

        <div style={{ marginTop: "20px" }}>
          <button type="submit" style={{ 
            padding: "10px 25px", 
            backgroundColor: editingId ? "#28a745" : "#007bff", 
            color: "white", border: "none", borderRadius: "5px", cursor: "pointer" 
          }}>
            {editingId ? "LƯU CẬP NHẬT" : "THÊM VÀO KHO"}
          </button>

          {editingId && (
            <button type="button" onClick={() => { setEditingId(null); setName(""); setPrice(""); setQuantity(""); setImageUrl(""); }} 
              style={{ marginLeft: "10px", padding: "10px 20px", backgroundColor: "#6c757d", color: "white", border: "none", borderRadius: "5px" }}>
              HỦY
            </button>
          )}
        </div>
      </form>

      {/* Bảng Danh Sách */}
      <table style={{ width: "100%", marginTop: "30px", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#333", color: "white" }}>
            <th style={{ padding: "12px", border: "1px solid #ddd" }}>Ảnh</th>
            <th style={{ padding: "12px", border: "1px solid #ddd" }}>Tên sản phẩm</th>
            <th style={{ padding: "12px", border: "1px solid #ddd" }}>Giá</th>
            <th style={{ padding: "12px", border: "1px solid #ddd" }}>Kho</th>
            <th style={{ padding: "12px", border: "1px solid #ddd" }}>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} style={{ textAlign: "center" }}>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                <img src={p.image_url || "https://via.placeholder.com/50"} alt="product" width="50" height="50" style={{ objectFit: "cover", borderRadius: "4px" }} />
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{p.name}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{Number(p.price).toLocaleString()}đ</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{p.quantity}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                <button onClick={() => handleEdit(p)} style={{ marginRight: "5px", backgroundColor: "#ffc107", border: "none", padding: "5px 10px", borderRadius: "3px", cursor: "pointer" }}>Sửa</button>
                <button onClick={() => deleteProduct(p.id)} style={{ backgroundColor: "#dc3545", color: "white", border: "none", padding: "5px 10px", borderRadius: "3px", cursor: "pointer" }}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Admin;