import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';

const AddToCart = () => {
    const location = useLocation();
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(location.state?.product || null);
    const [isLoading, setIsLoading] = useState(!location.state?.product);
    const baseUrl = "http://localhost:3000";

    useEffect(() => {
        if (!product) {
            // Fetch product if not available in state (e.g., page reload)
            const fetchProduct = async () => {
                try {
                    const response = await fetch('http://localhost:3000/api/products/' + id);
                    const data = await response.json();
                    if (data && data.product) {
                        setProduct(data.product);
                    }
                } catch (err) {
                    console.log("api error", err);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchProduct();
        } else {
            setIsLoading(false);
        }
    }, [id, product]);

    if (isLoading) {
        return (
            <div className='d-flex justify-content-center align-items-center vh-100'>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container mt-5 text-center">
                <h2>Product not found</h2>
                <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>Go to Home</button>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h2>Your Cart</h2>
            <div className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={product.image} className="img-fluid rounded-start" alt={product.name} />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{product.name}</h5>
                            <p className="card-text">{product.description}</p>
                            <h4 className="card-text">
                                {product.price}
                            </h4>
                            <p className="card-text">
                                <small className="text-muted">Rating: {product.rating}</small>
                            </p>
                            <button className="btn btn-success mt-3">Proceed to Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddToCart;