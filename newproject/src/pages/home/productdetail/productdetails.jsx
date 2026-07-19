import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ColorManager from "../../../components/ColorManager";
// import { addToCart } from "../../../../../express/controller/cartController";
import { useCart } from "../../../hooks/useCart";

export default function ProductDetail({ productId }) {

  const [selectedColor, setSelectedColor] = useState(null);
  const [productColors, setProductColors] = useState([]);

  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  const [productDetail, setProductDetail] = useState();

  const [isLoading, setisLoading] = useState(true);

  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("info"); // "info" | "colors"
  const { id } = useParams();
  const { cartItems, loading, fetchCartItems } = useCart();


  useEffect(() => {
    if (id) {
      console.log("API URL:", import.meta.env.VITE_API_URL);
      fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}/colors`)
        .then(r => r.json())
        .then(setProductColors)
        .catch(err => console.log("colors error", err));
    }
  }, [id]);

  const user = JSON.parse(localStorage.getItem("user"));
  const user_id = user?.id;

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favs.some(f => f.id === productDetail?.product?.id))

  }, [productDetail]);

  const toggleFavorite = () => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    const product = productDetail.product;
    const exists = favs.some(f => f.id === product.id);

    const updated = exists
      ? favs.filter(f => f.id !== product.id)  // remove
      : [...favs, product];                      // add

    localStorage.setItem("favorites", JSON.stringify(updated));
    setIsFavorite(!exists);

    // Notify TopHeader to update count
    window.dispatchEvent(new Event("favoritesUpdated"));
  };

  const addToCart = async (user_id, product_id, quantity, color_id = null) => {

    console.log("Adding to cart:", { user_id, product_id, quantity, color_id }); // Debug log

    if (!user_id) {
      alert("Please login first!");
      navigate('/login');
      return;
    }

    try {

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id, product_id, quantity,
          color_id: selectedColor?.id || null

        })
      });

      const data = await response.json();

      console.log("Response from server:", data); // See exact server response

      if (response.ok) {

        fetchCartItems(user_id); // Refresh cart items after adding

        alert(data.message);
        navigate('/products/');

      } else {
        alert(data.message);
      }

    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  }



  const baseUrl = "https://my-shop-q1uu.onrender.com";

  const getProductDetail = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`);
      const data = await response.json();
      setProductDetail(data);
    } catch (err) {
      console.log("api eror", err);
      "api product detail error";
    }
    finally {
      setisLoading(false);
    }

  }


  useEffect(() => {
    getProductDetail();
  }, []
  );



  if (isLoading) {
    return (<div className='d-flex justify-content-center align-items-center vh-100'>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>);

  }

  return (

    <>

      <div>

        <div className="container mt-5">
          <div className="row g-4">
            <div className="col-md-5" >
              <div className="card border-0 shadow-sm">
                <img src={productDetail.product.image}
                  alt={productDetail.product.name}

                  className="w-100 rounded"
                  style={{ objectFit: "contain", maxHeight: "500px" }}

                />

              </div>

            </div>
            <div className="col-md-7">
              <h2 className="card-title fw-bold">{productDetail.product.name}</h2>

              <div className="d-flex justify-content-start gap-3 align-items-center mb-2">
                <p className="mb-0">
                  ⭐ {productDetail.product.rating}
                  {productDetail.product.reviewCount
                    ? ` (${productDetail.product.reviewCount} reviews)`
                    : ""}
                </p>
                <span className="text-muted">|</span>
                <p className="mb-0 text-muted">SKU: {productDetail.product.sku}</p>
              </div>

              <h4 className="mb-3">{productDetail.product.price} Rs.</h4>
              <hr />


              {/* Colors Section */}
              {productColors.length > 0 && (
                <div className="mb-3">
                  <p className="mb-1 fw-semibold">
                    Color: <span className="text-muted">{selectedColor?.name || "Select a color"}</span>
                  </p>
                  <div className="d-flex gap-2 flex-wrap">
                    {productColors.map(c => (
                      <div
                        key={c.id}
                        title={c.name}
                        onClick={() =>
                          setSelectedColor({
                            id: c.color_id,
                            name: c.name,
                            hex_code: c.hex_code
                          })
                        }
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          backgroundColor: c.hex_code,
                          cursor: "pointer",
                          border:
                            selectedColor?.id === c.color_id
                              ? "3px solid #000"
                              : "2px solid #ccc",
                          transition: "border 0.2s"
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <p className="card-text">{productDetail.product.description}</p>

              <div className="input-group mb-3" style={{ maxWidth: "160px" }}>
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <input
                  type="text"
                  className="form-control text-center"
                  value={quantity}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setQuantity(isNaN(val) || val < 1 ? 1 : val);
                  }}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
              <div className="d-flex justify-content-start gap-3 flex-wrap">
                <button
                  className="btn btn-primary"
                  onClick={() => addToCart(user_id, productDetail.product.id, quantity, selectedColor?.id)}
                  disabled={productColors.length > 0 && !selectedColor}
                >
                  {productColors.length > 0 && !selectedColor ? "Select a Color" : "Add to cart"}
                </button>

                <button
                  className={`btn ${isFavorite ? "btn-danger" : "btn-outline-danger"}`}
                  onClick={toggleFavorite}
                >
                  <i className={`bi ${isFavorite ? "bi-heart-fill" : "bi-heart"}`}></i>
                  {isFavorite ? " Saved" : " Add to Favorites"}
                </button>
              </div>

            </div>
          </div>
        </div>

      </div >



    </>

  );
}