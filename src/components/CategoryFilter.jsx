import {
  FaMusic,
  FaTree,
  FaCloudRain,
  FaWater
} from "react-icons/fa";

function CategoryFilter({ selectedCategory, setSelectedCategory }) {

  const categories = [
    { name: "All", icon: <FaMusic /> },
    { name: "Forest Sounds", icon: <FaTree /> },
    { name: "Rain", icon: <FaCloudRain /> },
    { name: "Rain + Nature", icon: <FaCloudRain /> },
    { name: "Water", icon: <FaWater /> },
    { name: "Ocean", icon: <FaWater /> }
  ];

  return (
    <section className="categories-section">

      <h2>Explore Nature Sounds</h2>

      <div className="category-list">

        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => setSelectedCategory(category.name)}
            className={
              selectedCategory === category.name
                ? "category active"
                : "category"
            }
          >
            {category.icon}
            <span>{category.name}</span>
          </button>
        ))}

      </div>

    </section>
  );
}

export default CategoryFilter;