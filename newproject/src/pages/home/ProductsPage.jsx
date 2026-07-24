import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MyNavbar from '../../components/Navbarcustom';
import TopHeader from '../../components/TopHeader';
import { useSearchParams } from "react-router-dom";
import BootomPage from '../../components/BootomPage';
import './Products.css';
import Pagination from '../../components/Pagination';
import Footer from '../../components/Footer';


function ProductsPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(12); // 
  const [error, setError] = useState(null);
  const [items, setItems] = useState();
  const [pagination, setPagination] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [favorites, setFavorites] = useState([]);

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const navigate = useNavigate();

  const navigateToDetailPage = (id) => {
    navigate('/product/productDetail/' + id);
  };

  const getItems = async () => {
    setisLoading(true); // so it shows loading again when page changes
    try {
      // fetch needs query params built into the URL, not a `params` option
      const url = `${import.meta.env.VITE_API_URL}/api/products?page=${page}&limit=${limit}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Api fetch error');
      const data = await response.json();
      if (data && data.status === false) throw new Error(data.message || 'API error');
      setItems(data);
      setPagination(data.pagination);
    } catch (e) {
      setError(e.message);
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(favs);

  }, []);

  const toggleFavorite = (e, item) => {
    e.stopPropagation();

    let updated;

    const exists = favorites.some(f => f.id === item.id);

    if (exists) {
      updated = favorites.filter(f => f.id !== item.id);
    } else {
      updated = [...favorites, item];
    }

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));

    // Notify TopHeader to update count
    window.dispatchEvent(new Event("favoritesUpdated"));

  };

  useEffect(() => { getItems(); }, [page, limit]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get unique categories from products
  const allProducts = items?.products || [];
  const categories = ['All', ...new Set(allProducts.map(p => p.category).filter(Boolean))];

  // ⚠️ Note: this only filters within the CURRENT page's products.
  // If you want search/category to work across your whole catalog,
  // you need to pass `search` and `category` to the backend query
  // instead of filtering client-side here.
  const filteredProducts = allProducts.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <TopHeader />
      <MyNavbar />

      {isLoading ? (
        <div className='d-flex justify-content-center align-items-center vh-100'>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <div className="container-fluid px-2 px-md-4 px-lg-5 my-4">

          {/* ── CATEGORY FILTER BAR ── */}
          <div className="d-flex flex-wrap gap-2 mb-4">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`btn btn-sm rounded-pill px-3 py-2 fw-semibold`}
                style={{
                  border: '2px solid #20b2aa',
                  backgroundColor: activeCategory === cat ? '#20b2aa' : 'white',
                  color: activeCategory === cat ? 'white' : '#20b2aa',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* ── HEADING ── */}
          <h1 className="mb-4">
            {activeCategory === 'All' ? 'All Products' : activeCategory}
            <span className="fs-6 fw-normal text-muted ms-2">
              ({filteredProducts.length} items)
            </span>
          </h1>

          {/* ── PRODUCT GRID ── */}
          <div className="row row g-2 g-md-4">
            {filteredProducts.length === 0 ? (
              <p className="text-muted">
                No products found
                {search && <> for "<strong>{search}</strong>"</>}
                {activeCategory !== 'All' && <> in <strong>{activeCategory}</strong></>}
              </p>
            ) : (
              filteredProducts.map((item) => (
                <div className="col-6 col-md-4 col-lg-3 mb-5 position-relative" key={item.id}>
                  <div
                    className="card h-100  shadow-sm border-0"
                    style={{ cursor: 'pointer', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
                    onClick={() => navigateToDetailPage(item.id)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 0.125rem 0.25rem rgba(0,0,0,0.075)';
                    }}
                  >
                    <div className="card-body p-2 p-md-3 d-flex flex-column">
                      <div>
                        {item.category && item.category !== 'Uncategorized' && (
                          <span className="badge mb-2" style={{ backgroundColor: '#20b2aa' }}>
                            {item.category}
                          </span>
                        )}
                        <div className="product-image-container bg-light rounded-">
                          <img
                            src={item.image || '/placeholder.png'}
                            alt={item.name}
                            className="img-fluid"
                            style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                          />
                        </div>
                        <h5 className="card-title product-title">{item.name}</h5>
                      </div>
                      <div>
                        <div className="text-warning rating">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <i key={i} className={`bi ${i < Math.floor(item.rating || 5) ? 'bi-star-fill' : 'bi-star'}`}></i>
                          ))}
                          <span className="text-muted ms-1">({item.rating || 5})</span>
                        </div>

                        <div className="price-row">
                          <p className="product-price">{item.price} Rs.</p>
                          <button
                            className="btn btn-outline-success rounded-circle d-flex align-items-center justify-content-center bag-btn"
                            style={{ width: '32px', height: '32px' }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <i className="bi bi-bag"></i>
                          </button>
                        </div>
                        <button className='btn btn-outline-dark w-100 mt-2'>Add To Cart</button>
                      </div>
                    </div>
                  </div>

                  {/* favorites heart on products  */}

                  <div className="position-absolute top-0 end-0 ms-5 translate-middle-x d-flex">
                    <button
                      className={`btn ${favorites.some(f => f.id === item.id)
                        ? "btn-danger"
                        : "btn-outline-danger"
                        }`} onClick={(e) => toggleFavorite(e, item)}
                    >
                      <i
                        className={`bi ${favorites.some(f => f.id === item.id)
                            ? "bi-heart-fill"
                            : "bi-heart"
                          }`}
                      />
                    {/* {isFavorite ? " Saved" : " Add to Favorites"} */}
                  </button>
                  {/* <i className="bi bi-suit-heart fs-5" style={{ color: "" }}></i> */}
                </div>
                </div>
          ))
            )}
        </div>

          {/* ── PAGINATION ── ✅ now actually rendered */}
      {pagination && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div >
      )
}
      <BootomPage />
      <Footer />
    </>
  );
}

export default ProductsPage;