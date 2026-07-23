
import db from "../config/db.js";

// get all products api 
export const GetAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const all = req.query.all === "true";
    const limit = parseInt(req.query.limit) || 12;
    const offset = (page - 1) * limit;

    // 1. Get total count for pagination
    const [countResult] = await db.query(
      "SELECT COUNT(*) AS total FROM products WHERE is_active = 1"
    );
    const totalProducts = countResult[0].total;
    const totalPages = all ? 1 : Math.ceil(totalProducts / limit);

    // 2. Get products — full list if `all=true`, otherwise paginated
    const [result] = all
      ? await db.query(
        "SELECT * FROM products WHERE is_active = 1 ORDER BY created_at DESC"
      )
      : await db.query(
        "SELECT * FROM products WHERE is_active = 1 ORDER BY created_at DESC LIMIT ? OFFSET ?",
        [limit, offset]
      );

    // 3. Transform image URLs
    const products = result.map(product => {
      let imageUrl = null;

      if (product.image) {
        if (product.image.startsWith('http')) {
          imageUrl = product.image;
        } else if (product.image.startsWith('/')) {
          imageUrl = `${process.env.BASE_URL}${product.image}`;
        } else {
          const filename = product.image
            .replace(/^uploads\//, "")
            .replace(/^\//, "");
          imageUrl = `${process.env.BASE_URL}/uploads/${filename}`;
        }
      }

      return {
        ...product,
        image: imageUrl
      };
    });

    res.json({
      status: true,
      products,
      pagination: {
        currentPage: all ? 1 : page,
        totalPages,
        totalProducts,
        limit: all ? totalProducts : limit,
      },
    });

  } catch (err) {
    console.error("GetAllProducts error:", err);
    res.status(500).json({
      status: false,
      message: "unable to fetch the products !"
    });
  }
};
// product detailed api 
export const GetProductDetail = async (req, res) => {

  const productId = req.params.id;

  console.log("REQUEST ID:", productId);
  console.log("TYPE:", typeof productId);

  const sql = "SELECT * FROM products WHERE id = ?";


  try {

    const [result] = await db.query(sql, [productId]);


    console.log("RESULT LENGTH:", result.length);
    console.log("RESULT:", result);

    if (result.length === 0) {

      return res.json({
        status: false,
        message: "Product not found"
      });

    }


    const product = result[0] || null;


    let imageUrl = null;
    if (product.image) {
      if (product.image.startsWith("http")) {
        imageUrl = product.image;
      } else {
        const filename = product.image
          .replace(/^uploads\//, "")
          .replace(/^\//, "");
        imageUrl = `${process.env.BASE_URL}/uploads/${filename}`;
      }
    }


    res.json({

      status: true,

      product: {
        ...product,
        image: imageUrl
      }

    });
    res.json({ status: true, products: products });


  } catch (error) {

    console.log("GetProductDetail error:", error);


    res.json({

      status: false,

      message: "unable to fetch the product Detail !"

    });

  }

}

export const DeleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {

    const [result] = await db.query(
      "UPDATE products SET is_active = 0 WHERE id = ?",
      [productId]
    );
    if (result.affectedRows === 0) {
      return res.json({ status: false, message: "Product not found!" });
    }

    res.json({ status: true, message: "Product deleted successfully!" });

  } catch (err) {
    console.error("DeleteProduct error:", err.message);
    res.status(500).json({ status: false, message: err.message });
  }
};

export const UpdateProduct = async (req, res) => {
  const productId = req.params.id;

  console.log("BODY:", req.body);
  console.log("FILE:", req.file);

  const { name, price, description, sku, is_active, category } = req.body;

  const image = req.file
    ? req.file.path
    : null;

  try {

    const result = await db.query(
      "UPDATE products SET name=?, price=?, description=?, sku=?, image=COALESCE(?,image), is_active=COALESCE(?, is_active),  category=COALESCE(?, category) WHERE id=?",
      [name, price, description, sku, image, is_active ?? 1, category ?? 'Uncategorized', productId,]
    );

    return res.json({
      status: true,
      message: "Product updated successfully!",
      productId: productId,
      image_url: image

      //   image_url: image
      // ? `${process.env.VITE_API_URL}/uploads/${image}`
      // : null

    });

  } catch (error) {

    console.log("Update Product Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something went wrong"
    });
  }
};