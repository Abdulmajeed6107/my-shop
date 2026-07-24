const CategoryBootom = () => {
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

  return (
    <div className="bottom-page-content">
      <h3 className="bottom-page-title">Categories</h3>
      <div className="bottom-page-category-grid">
        {categories.map((category) => (
          <p key={category}>{category}</p>
        ))}
      </div>
    </div>
  );
};

export default CategoryBootom;
