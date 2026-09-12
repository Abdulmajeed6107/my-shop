import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CATEGORIES = ["Uncategorized", "Dupattas", "Stoller", "Scarf", "Suit", "Women", "Men", "Children"]; // adjust as needed

const UpdateProduct = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [sku, setSku] = useState("");
    const [category, setCategory] = useState("Uncategorized");
    const [season, setSeason] = useState("summer");
    const [bgColor, setBgColor] = useState("f5f5f7");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [oldImage, setOldImage] = useState("");
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
        formData.append("bg_color", bgColor);
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

            <label className="fw-semibold mt-2">Photo Background Color</label>
            <select
                className="form-select mb-3"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
            >
                <option value="f5f5f7">🎨 Studio Soft Grey (#f5f5f7 - Default)</option>
                <option value="faf9f6">🍨 Luxury Warm Cream (#faf9f6)</option>
                <option value="e8f4f8">❄️ Light Ice Blue (#e8f4f8)</option>
                <option value="fce4ec">🌸 Soft Blush Pink (#fce4ec)</option>
                <option value="2c3e50">🖤 Dark Charcoal (#2c3e50)</option>
                <option value="ffffff">⚪ Pure White (#ffffff)</option>
            </select>

            <label className="fw-semibold mt-2">Current / New Image</label>
            {(preview || oldImage) && (
                <div className="my-2 p-3 bg-light rounded text-center">
                    <img
                        src={preview || oldImage || "/placeholder.png"}
                        alt="Product"
                        style={{
                            maxHeight: '220px',
                            objectFit: 'contain',
                            borderRadius: '8px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}
                    />
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