// utils/filterProducts.js
export const filterProducts = (products, searchQuery) => {
    
    if (!searchQuery) return products;
    return products.filter(product =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
  