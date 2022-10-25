import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "./AllProductsSlice";

function AllProducts() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.allProducts.allProducts);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <div id="all-products">
      <div className="column-container">
        {products.map((product) => (
          <div className="product-entry">
            <img src={product.coverImage} alt="Cover Image" />
            <h3>{product.title}</h3>
            <h5>{product.author}</h5>
            <p>${product.price}</p>
            <br />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllProducts;
