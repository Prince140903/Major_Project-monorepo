import React from "react";
import "./searchBar.css";

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
  
    const getRelatedProducts = (query) => {
      return products.filter((product) => {
        const lowerQuery = query.toLowerCase();
        const lowerProduct = product.toLowerCase();
        return (
          lowerProduct.includes(lowerQuery) ||
          lowerQuery.split(" ").some(word => lowerProduct.includes(word))
        );
      });
    };
  
    const handleSearch = (e) => {
      const query = e.target.value;
      setSearchQuery(query);
  
      if (query.length > 0) {
        const results = getRelatedProducts(query);
        setFilteredProducts(results);
      } else {
        setFilteredProducts([]);
      }
    };
  
    return (
      <div className="search-container">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearch}
          className="search-input"
        />
        {searchQuery && (
          <div className="search-dropdown">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <div
                  key={index}
                  className="search-item"
                  onClick={() => setSearchQuery(product)}
                >
                  {product}
                </div>
              ))
            ) : (
              <div className="no-results">No results found</div>
            )}
          </div>
        )}
      </div>
    );
  };

export default SearchBar;
