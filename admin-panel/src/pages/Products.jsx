import { useNavigate } from "react-router-dom";
import API from "../api";
import { useState, useEffect } from "react";
import ColorManager from "../components/ColorManager";

function Products() {

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showColorModal, setShowColorModal] = useState(false);
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();


    const DeleteProduct = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/products/${id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (data.status) {
                // Remove product from state so UI updates instantly
                setItems(prev => prev.filter(product => product.id !== id));
                alert('Product deleted successfully!');
                console.log('product deleted successfully')
            } else {
                alert(data.message);

            }
        } catch (e) {
            console.log('Delete error', e)
        }
    }

    const getItems = async () => {

        try {


            const response = await API.get("/products");


            console.log(response.data);


            setItems(response.data.products);


        }
        catch (error) {

            console.log(error);

            setError(error.message);

        }
        finally {

            setIsLoading(false);

        }

    }



    useEffect(() => {

        getItems();

    }, []);



    if (isLoading) {

        return <h2>Loading...</h2>

    }


    if (error) {

        return <h2>{error}</h2>

    }



    return (

        <div className="text-center mt-5 ms-5">
            <div className="d-flex justify-content-end pe-5 gap-4">
                <button onClick={() => navigate('/add-product')}>Add Product</button>
                <button onClick={() => navigate('/dashboard')}>Dashboard</button>
            </div>

            <h1>
                Products List
            </h1>
            {/* <h3>Total Products </h3> */}

            {
                items.map((product) => (

                    <div key={product.id} className="card mt-3" style={{ width: "18rem" }}>
                        <img src={product.image} alt="" />

                        <h3>
                            {product.name}
                        </h3>


                        <p>
                            {product.price} Rs.
                        </p>

                        <div className=" d-flex justify-content-center align-items-center gap-3">
                            <button onClick={() => navigate(`/update-product/${product.id}`)}>Update Product</button>
                            <button onClick={() => DeleteProduct(product.id)}>Delete Product</button>
                            <button
                                className="btn btn-info"
                                onClick={() => {
                                    setSelectedProduct(product);
                                    setShowColorModal(true);
                                }}
                            >
                                🎨 Colors
                            </button>
                        </div>
                    </div>


                ))
            }

            {showColorModal && selectedProduct && (
                <div
                    className="modal show d-block"
                    style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
                    onClick={() => setShowColorModal(false)} // close on backdrop click
                >
                    <div
                        className="modal-dialog modal-lg"
                        onClick={e => e.stopPropagation()} // prevent closing when clicking inside
                    >
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    🎨 Colors — {selectedProduct.name}
                                </h5>
                                <button
                                    className="btn-close"
                                    onClick={() => setShowColorModal(false)}
                                />
                            </div>
                            <div className="modal-body">
                                <ColorManager productId={selectedProduct.id} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    )

}


export default Products;