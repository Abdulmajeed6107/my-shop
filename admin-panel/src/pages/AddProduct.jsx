import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { removeBackground } from '@imgly/background-removal';

const CATEGORIES = ["Uncategorized", "Dupattas", "Stoller", "Scarf", "Suit", "Women", "Men", "Children"]; // adjust as needed

const processAutoBackground = async (file, bgColor = '#ffffff') => {
  // 1. Extract subject with AI
  const blob = await removeBackground(file);

  // 2. Composite onto solid plain background canvas
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(blob);
    img.src = url;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');

      // Fill solid plain background
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw clean cutout on top
      ctx.drawImage(img, 0, 0);

      URL.revokeObjectURL(url);

      canvas.toBlob((finalBlob) => {
        if (finalBlob) {
          const cleanFile = new File([finalBlob], `clean-${file.name.replace(/\.[^/.]+$/, "")}.jpeg`, { type: 'image/jpeg' });
          resolve({ file: cleanFile, previewUrl: URL.createObjectURL(finalBlob) });
        } else {
          reject(new Error("Canvas export failed"));
        }
      }, 'image/jpeg', 0.95);
    };

    img.onerror = (err) => {
      URL.revokeObjectURL(url);
      reject(err);
    };
  });
};

function AddProductPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    sku: '',
    category: 'Uncategorized',
    season: 'summer'
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [isProcessingImg, setIsProcessingImg] = useState(false);
  const [bgCleaned, setBgCleaned] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show initial preview immediately
    setPreview(URL.createObjectURL(file));
    setImage(file);
    setIsProcessingImg(true);
    setBgCleaned(false);
    setError(null);

    try {
      console.log("✨ Auto-removing background & adding plain background...");
      const { file: cleanFile, previewUrl } = await processAutoBackground(file, bgColor);
      setImage(cleanFile);
      setPreview(previewUrl);
      setBgCleaned(true);
    } catch (err) {
      console.error("Auto background processing failed:", err);
      setError("Auto-background cleaning couldn't process this image format. Original image will be uploaded.");
    } finally {
      setIsProcessingImg(false);
    }
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
    data.append('season', formData.season);


    try {
      setIsLoading(true);

      console.log("Category:", formData.category, "Season:", formData.season);

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
              disabled={isProcessingImg}
              required
            />
            {preview && (
              <div className="mt-3 text-center bg-light p-3 rounded">
                <div className="mb-2 position-relative" style={{ minHeight: '150px' }}>
                  <img
                    src={preview}
                    alt="Preview"
                    style={{
                      maxHeight: '220px',
                      objectFit: 'contain',
                      borderRadius: '8px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                  />
                </div>
                {isProcessingImg && (
                  <div className="alert alert-info py-2 my-2">
                    <span className="spinner-border spinner-border-sm me-2" role="status" />
                    ✨ AI is automatically removing background & creating plain background...
                  </div>
                )}
                {bgCleaned && (
                  <div className="badge bg-success p-2 mt-2">
                    ✅ Background Automatically Removed & Plain Background Placed!
                  </div>
                )}
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
              placeholder="e.g. Winter Lawn Suit"
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

            <ReactQuill
              value={formData.description}
              onChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  description: value,
                }))
              }
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

          {/* Season */}
          <div className="mb-4">
            <label className="form-label fw-semibold">Collection / Season</label>
            <select
              name="season"
              className="form-select"
              value={formData.season}
              onChange={handleChange}
            >
              <option value="summer">Summer Collection</option>
              <option value="winter">Winter Collection</option>
              <option value="all">All Seasons</option>
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