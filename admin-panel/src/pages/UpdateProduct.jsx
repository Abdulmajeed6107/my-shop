import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { removeBackground } from "@imgly/background-removal";

const CATEGORIES = ["Uncategorized", "Dupattas", "Stoller", "Scarf", "Suit", "Women", "Men", "Children"]; // adjust as needed

const processAutoBackground = async (file, bgColor = '#ffffff') => {
    const blob = await removeBackground(file);
    return new Promise((resolve, reject) => {
        const img = new Image();
        const url = URL.createObjectURL(blob);
        img.src = url;

        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');

            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

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
    const [isProcessingImg, setIsProcessingImg] = useState(false);
    const [bgCleaned, setBgCleaned] = useState(false);
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

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setPreview(URL.createObjectURL(file));
        setImage(file);
        setIsProcessingImg(true);
        setBgCleaned(false);

        try {
            console.log("✨ Auto-cleaning background for update...");
            const { file: cleanFile, previewUrl } = await processAutoBackground(file);
            setImage(cleanFile);
            setPreview(previewUrl);
            setBgCleaned(true);
        } catch (err) {
            console.error("Auto background removal error:", err);
        } finally {
            setIsProcessingImg(false);
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
                            maxHeight: '220px',
                            objectFit: 'contain',
                            borderRadius: '8px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}
                    />
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

            <input
                type="file"
                className="form-control mb-4"
                accept="image/*"
                onChange={handleImageChange}
                disabled={isProcessingImg}
            />


            <button className="btn btn-success" onClick={updateProduct} disabled={isProcessingImg}>
                Update Product
            </button>

        </div>
    )
}


export default UpdateProduct;