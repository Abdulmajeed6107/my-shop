import { useState, useEffect } from "react";

export default function ColorManager({ productId }) {
  const [productColors, setProductColors] = useState([]);
  const [allColors, setAllColors] = useState([]);
  const [form, setForm] = useState({ color_id: "", stock: 0, extra_price: 0 });
  const [loading, setLoading] = useState(false);

  // Fetch all master colors (dropdown)
  const fetchAllColors = async () => {
    const res = await fetch("http://localhost:3000/api/colors");
    const data = await res.json();
    console.log("TYPE:", typeof data);      // 👈 add this
  console.log("IS ARRAY:", Array.isArray(data)); // 👈 add this
  console.log("DATA:", data);   
    setAllColors(data);
  };

  // Fetch this product's assigned colors
  const fetchProductColors = async () => {
    const res = await fetch(`http://localhost:3000/api/products/${productId}/colors`);
    const data = await res.json();
    setProductColors(data);
  };

  useEffect(() => {
    fetchAllColors();
    fetchProductColors();
  }, [productId]);

  // Add color to product
  const addColor = async () => {
    if (!form.color_id) return alert("Please select a color");
    setLoading(true);
    await fetch(`http://localhost:3000/api/products/${productId}/colors`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    setForm({ color_id: "", stock: 0, extra_price: 0 });
    await fetchProductColors();
    setLoading(false);
  };

  // Remove color from product
  const removeColor = async (colorId) => {
    if (!confirm("Remove this color?")) return;
    await fetch(`http://localhost:3000/api/products/${productId}/colors/${colorId}`, {
      method: "DELETE"
    });
    await fetchProductColors();
  };

  return (
    <div className="card mt-4">
      <div className="card-header">
        <h5 className="mb-0">🎨 Manage Colors</h5>
      </div>
      <div className="card-body">

        {/* Existing Colors */}
        <h6>Assigned Colors</h6>
        {productColors.length === 0 ? (
          <p className="text-muted">No colors assigned yet.</p>
        ) : (
          <table className="table table-bordered mb-4">
            <thead className="table-light">
              <tr>
                <th>Swatch</th>
                <th>Name</th>
                <th>Hex</th>
                <th>Stock</th>
                <th>Extra Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {productColors.map(c => (
                <tr key={c.id}>
                  <td>
                    <div style={{
                      width: 30, height: 30,
                      borderRadius: "50%",
                      backgroundColor: c.hex_code,
                      border: "1px solid #ccc"
                    }} />
                  </td>
                  <td>{c.name}</td>
                  <td>{c.hex_code}</td>
                  <td>{c.stock}</td>
                  <td>+{c.extra_price} Rs.</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => removeColor(c.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Add New Color Form */}
        <h6>Add Color</h6>
        <div className="row g-2 align-items-end">
          <div className="col-md-4">
            <label className="form-label">Color</label>
            <select
              className="form-select"
              value={form.color_id}
              onChange={e => setForm({ ...form, color_id: e.target.value })}
            >
              <option value="">-- Select Color --</option>
              {allColors.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.hex_code})
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label">Stock</label>
            <input
              type="number"
              className="form-control"
              value={form.stock}
              onChange={e => setForm({ ...form, stock: e.target.value })}
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">Extra Price (Rs.)</label>
            <input
              type="number"
              className="form-control"
              value={form.extra_price}
              onChange={e => setForm({ ...form, extra_price: e.target.value })}
            />
          </div>

          <div className="col-md-2">
            <button
              className="btn btn-primary w-100"
              onClick={addColor}
              disabled={loading}
            >
              {loading ? "Adding..." : "+ Add"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}