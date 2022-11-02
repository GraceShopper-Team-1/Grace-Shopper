import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllProducts } from "./allProductsSlice";
import { addToCart } from "../cart/cartSlice";

function AllProducts() {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.allProducts.products);

  const userId = useSelector((state) => state.auth.me.id);
  
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const handleAddToCart = (productId) => {
    dispatch(addToCart({ productId }));
  };
  let productArr = [];
  const handleGuestCart = (product) => {
    productArr.push(product);

    localStorage.setItem("guest", JSON.stringify(productArr));
  };

  return (
    <div id="all-products">
      <h3>Bestsellers</h3>

      <div className="column-container">
        {products.map((product) => (
          <li key={product.id} className="product-entry">
            <Link to={`/products/${product.id}`}>
              <img
                src={product.coverImageUrl}
                alt="Cover Image"
                className="product-img"
              />

              <h3>{product.title}</h3>

              <h5>{product.author}</h5>

              <p>${product.price}</p>
            </Link>
            <button
              type="button"
              onClick={() => {
                isLoggedIn
                  ? handleAddToCart(product.id)
                  : handleGuestCart(product);
              }}
            >
              Add to cart
            </button>
          </li>
        ))}
      </div>
    </div>
  );
}

export default AllProducts;
