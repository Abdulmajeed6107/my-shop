import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { removeBackground } from "@imgly/background-removal";

const CATEGORIES = ["Uncategorized", "Dupattas", "Stoller", "Scarf", "Suit", "Women", "Men", "Children"]; // adjust as needed

const UpdateProduct = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [sku, setSku] = useState("");
    const [category, setCategory] = useState("Uncategorized");
    const [season, setSeason] = useState("summer");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [oldImage, setOldImage] = useState("");
    const [isRemovingBg, setIsRemovingBg] = useState(false);
    const [bgRemoved, setBgRemoved] = useState(false);
    const { id } = useParams();
    console.log("PARAM ID:", id);

    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`);

                console.log("STATUS:", response.status);
                console.log("CONTENT TYPE:", response.headers.get("content-type"));

                const data = await response.json();
                console.log("API DATA:", data);

                if (data.status === false) {
                    console.log(data.message);
                    return;
                }

                setName(data.product.name || "");
                setPrice(data.product.price || "");
                setDescription(data.product.description || "");
                setSku(data.product.sku || "");
                setCategory(data.product.category || "Uncategorized");
                setSeason(data.product.season || "summer");
                setOldImage(data.product.image || "");
            } catch (e) {
                console.log("error fetching product", e)
            }
        }
        getData();

    }, [id]
    );

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
            setBgRemoved(false);
        }
    };

    const handleRemoveBackground = async () => {
        if (!image) return;
        try {
            setIsRemovingBg(true);
            const blob = await removeBackground(image);
            const cleanedFile = new File([blob], `cleaned-${image.name.replace(/\.[^/.]+$/, "")}.png`, { type: 'image/png' });
            setImage(cleanedFile);
            setPreview(URL.createObjectURL(cleanedFile));
            setBgRemoved(true);
        } catch (err) {
            console.error("Client BG removal error:", err);
            alert("Failed to remove background automatically.");
        } finally {
            setIsRemovingBg(false);
        }
    };

    const updateProduct = async () => {

        const formData = new FormData();

        formData.append("name", name);
        formData.append("price", price);
        formData.append("description", description);
        formData.append("sku", sku);
        formData.append("category", category);
        formData.append("season", season);
        // only send image if user selected new one
        if (image) {
            formData.append("image", image);
        }

        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/products/${id}`,
            {
                method: "PUT",
                body: formData,

            }
        );


        const data = await response.json();

        console.log(data);
        navigate('/products');
    }



    return (
        <div className="d-flex flex-column p-5" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h1 className="mb-3">Update product</h1>
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
            />


            <input
                type="number"
                className="form-control mb-3"
                placeholder="Price"
                onChange={(e) => setPrice(e.target.value)}
                value={price}

            />


            <textarea
                className="form-control mb-3"
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}

            />


            <input
                type="text"
                className="form-control mb-3"
                placeholder="SKU"
                onChange={(e) => setSku(e.target.value)}
                value={sku}

            />

            <label className="fw-semibold mt-2">Category</label>
            <select
                className="form-select mb-3"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                        {cat}
                    </option>
                ))}
            </select>

            <label className="fw-semibold mt-2">Collection / Season</label>
            <select
                className="form-select mb-3"
                value={season}
                onChange={(e) => setSeason(e.target.value)}
            >
                <option value="summer">Summer Collection</option>
                <option value="winter">Winter Collection</option>
                <option value="all">All Seasons</option>
            </select>

            <label className="fw-semibold mt-2">Current / New Image</label>
            {(preview || oldImage) && (
                <div className="my-2 p-3 bg-light rounded text-center">
                    <img
                        src={preview || oldImage || "/placeholder.png"}
                        alt="Product"
                        style={{
                            maxHeight: '180px',
                            objectFit: 'contain',
                            background: bgRemoved ? 'repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%) 50% / 16px 16px' : 'transparent'
                        }}
                    />
                    {image && !bgRemoved && (
                        <div className="mt-2">
                            <button
                                type="button"
                                className="btn btn-outline-primary btn-sm"
                                onClick={handleRemoveBackground}
                                disabled={isRemovingBg}
                            >
                                {isRemovingBg ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" />
                                        Removing Background (AI)...
                                    </>
                                ) : (
                                    '✨ Remove Background (AI Clean)'
                                )}
                            </button>
                        </div>
                    )}
                    {bgRemoved && (
                        <div className="mt-2">
                            <span className="badge bg-success p-2">
                                ✅ Background Cleaned (Transparent PNG)
                            </span>
                        </div>
                    )}
                </div>
            )}

            <input
                type="file"
                className="form-control mb-4"
                accept="image/*"
                onChange={handleImageChange}
            />


            <button className="btn btn-success" onClick={updateProduct}>
                Update Product
            </button>

        </div>
    )
}


export default UpdateProduct;