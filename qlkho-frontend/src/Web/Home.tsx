import { useState, useEffect } from "react";
import type { CartItemType } from "../types";
import { getProducts } from "../api";

function Home() {
  const [products, setProducts] = useState<CartItemType[]>([]);

  useEffect(() => {
    getProducts().then(setProducts).catch(console.error);
  }, []);

  return (
    <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
      {products.map(p => (
        <div key={p.id} style={{ background: 'white', padding: '15px', borderRadius: '10px', textAlign: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
          <img src={p.image_url} alt={p.name} style={{ width: '100%', height: '150px', objectFit: 'contain' }} />
          <h3>{p.name}</h3>
          <p style={{ color: 'red', fontWeight: 'bold' }}>{Number(p.price).toLocaleString()} VNĐ</p>
          <p>Số lượng: {p.quantity}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;