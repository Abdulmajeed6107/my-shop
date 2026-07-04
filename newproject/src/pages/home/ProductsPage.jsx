import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MyNavbar from '../../components/Navbarcustom';
import TopHeader from '../../components/TopHeader';
import { useSearchParams } from "react-router-dom";
import './Products.css';

function ProductsPage() {
  const [error, setError] = useState(null);
  const [items, setItems] = useState();
  const [isLoading, setisLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const navigate = useNavigate();

  const navigateToDetailPage = (id) => {
    navigate('/product/productDetail/' + id);
  };

  const getItems = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/products");
      if (!response.ok) throw new Error('Api fetch error');
      const data = await response.json();
      if (data && data.status === false) throw new Error(data.message || 'API error');
      setItems(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => { getItems(); }, []);

  // Get unique categories from products
  const allProducts = items?.products || [];
  const categories = ['All', ...new Set(allProducts.map(p => p.category).filter(Boolean))];

  // Filter by search AND category
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
                <div className="col-6 col-md-4 col-lg-3" key={item.id}>
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
                        {/* Category badge on the card */}
                        {item.category && item.category !== 'Uncategorized' && (
                          <span className="badge mb-2" style={{ backgroundColor: '#20b2aa' }}>
                            {item.category}
                          </span>
                        )}
                        <div
                          className="product-image-container bg-light rounded-"
                        // style={{ height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
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
                        {/* rating starts here  */}
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
                            onClick={(e) => e.stopPropagation()} // prevent card click
                          >
                            <i className="bi bi-bag"></i>
                          </button>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ProductsPage;