import { useNavigate } from 'react-router-dom';

const CategoryBootom = () => {
  const navigate = useNavigate();
  const categories = [
    "Women's Unstiched Suits",
    "Women's Stiched Suits",
    "Men's Unstiched Suits",
    "Branded Hijabs",
    "Lawn Hijabs",
    "Chiffon Hijabs",
    "Daily Wear Hijabs",
    "Silk Hijabs",
    "Winter Hijabs",
    "Summer Hijabs",
    "Dupatta",
    "Chiffon Dupatta",
    "Cotton Dupatta",
    "Lawn Dupatta",
    "Stoller",
    "Scarf",
    "Suits",
    "Capries",
    "Tights",
  ];

  const handleCategoryClick = (categoryName) => {
    let category = "All";
    let season = "";
    let search = "";

    const nameLower = categoryName.toLowerCase();
    
    if (nameLower.includes("dupatta")) {
      category = "Dupattas";
    } else if (nameLower.includes("stoller")) {
      category = "Stoller";
    } else if (nameLower.includes("scarf")) {
      category = "Scarf";
    } else if (nameLower.includes("suit")) {
      category = "Suit";
    } else if (nameLower.includes("hijab")) {
      category = "All";
      search = "Hijab";
    }

    if (nameLower.includes("summer")) {
      season = "summer";
    } else if (nameLower.includes("winter")) {
      season = "winter";
    }

    let url = "/products?";
    const params = [];
    if (category && category !== "All") params.push(`category=${category}`);
    if (season) params.push(`season=${season}`);
    if (search) params.push(`search=${search}`);
    
    navigate(url + params.join("&"));
  };

  return (
    <div className="bottom-page-content">
      <h3 className="bottom-page-title">Categories</h3>
      <div className="bottom-page-category-grid">
        {categories.map((category) => (
          <p 
            key={category} 
            onClick={() => handleCategoryClick(category)}
            style={{ cursor: 'pointer', transition: 'color 0.2s' }}
            onMouseEnter={(e) => e.target.style.color = '#20b2aa'}
            onMouseLeave={(e) => e.target.style.color = ''}
          >
            {category}
          </p>
        ))}
      </div>
    </div>
  );
};

export default CategoryBootom;
