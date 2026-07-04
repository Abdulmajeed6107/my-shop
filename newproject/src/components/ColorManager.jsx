// ColorManager.jsx
import { useState, useEffect } from "react";


export default function ColorManager({ productId }) {
  const [colors, setColors] = useState([]);           // product's colors
  const [allColors, setAllColors] = useState([]);     // master color list
  const [form, setForm] = useState({
    color_id: "", stock: 0, extra_price: 0
  });

  useEffect(() => {
    // fetch this product's colors
    fetch(`/http://localhost:3000/api/products/${productId}/colors`)
      .then(r => r.json()).then(setColors);

    // fetch master colors list
    fetch(`/http://localhost:3000/api/colors`)
      .then(r => r.json()).then(setAllColors);
  }, [productId]);

  const addColor = async () => {
    await fetch(`/http://localhost:3000/api/products/${productId}/colors`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    // refresh
    fetch(`/http://localhost:3000/api/products/${productId}/colors`)
      .then(r => r.json()).then(setColors);
  };

  const removeColor = async (id) => {
    await fetch(`/http://localhost:3000/api/products/${productId}/colors/${id}`, {
      method: "DELETE"
    });
    setColors(colors.filter(c => c.id !== id));
  };

  return (
    <div className="color-manager">
      <h3>Product Colors</h3>

      {/* Existing colors */}
      <div className="color-list">
        {colors.map(c => (
          <div key={c.id} className="color-row">
            <span
              className="swatch"
              style={{ background: c.hex_code }}
            />
            <span>{c.name}</span>
            <span>Stock: {c.stock}</span>
            <span>+${c.extra_price}</span>
            <button onClick={() => removeColor(c.id)}>Remove</button>
          </div>
        ))}
      </div>

      {/* Add new color */}
      <div className="add-color-form">
        <select
          value={form.color_id}
          onChange={e => setForm({ ...form, color_id: e.target.value })}
        >
          <option value="">Select Color</option>
          {allColors.map(c => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={e => setForm({ ...form, stock: e.target.value })}
        />

        <input
          type="number"
          placeholder="Extra Price"
          value={form.extra_price}
          onChange={e => setForm({ ...form, extra_price: e.target.value })}
        />

        <button onClick={addColor}>+ Add Color</button>
      </div>
    </div>
  );
}