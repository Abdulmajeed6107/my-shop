import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = ["Uncategorized", "Dupattas", "Stoller", "Stollers & Scarves", "Suit"]; // adjust as needed


function AddProductPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    sku: '',
    category: ''
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file)); // show preview
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!image) {
      setError('Please select an image');
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('description', formData.description);
    data.append('sku', formData.sku);
    data.append('image', image); // must match multer field name
    data.append('category', formData.category);


    try {
      setIsLoading(true);

      console.log("Category:", formData.category);

      for (let pair of data.entries()) {
        console.log(pair[0], pair[1]);
      }
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/add-product`, {
        method: 'POST',
        body: data, // don't set Content-Type header, browser sets it with boundary
      });

      const result = await response.json();

      if (!result.status) {
        throw new Error(result.message);
      }

      setSuccess('Product added successfully!');
      setTimeout(() => navigate('/products'), 1500); // redirect after success

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>


      <div className="container my-5" style={{ maxWidth: '600px' }}>
        <h2 className="mb-4 fw-bold">Add New Product</h2>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>

          {/* Image Upload */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Product Image <span className="text-danger">*</span></label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={handleImageChange}
              required
            />
            {preview && (
              <div className="mt-3 text-center bg-light p-3 rounded">
                <img
                  src={preview}
                  alt="Preview"
                  style={{ maxHeight: '200px', objectFit: 'contain' }}
                />
              </div>
            )}
          </div>

          {/* Name */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Product Name <span className="text-danger">*</span></label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="e.g. Tomatoes"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Price */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Price <span className="text-danger">*</span></label>
            <input
              type="number"
              name="price"
              className="form-control"
              placeholder="e.g. 150"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Description</label>
            <textarea
              name="description"
              className="form-control"
              rows={3}
              placeholder="Product description..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          {/* SKU */}
          <div className="mb-4">
            <label className="form-label fw-semibold">SKU</label>
            <input
              type="text"
              name="sku"
              className="form-control"
              placeholder="e.g. 00001"
              value={formData.sku}
              onChange={handleChange}
            />
          </div>
          {/* Category */}
          <div className="mb-4">
            <label className="form-label fw-semibold">Category</label>
            <select
              name="category"
              className="form-select"
              value={formData.category}
              onChange={handleChange}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-success w-100"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" />
                Adding Product...
              </>
            ) : 'Add Product'}
          </button>

        </form>
      </div>
    </>
  );
}

export default AddProductPage;