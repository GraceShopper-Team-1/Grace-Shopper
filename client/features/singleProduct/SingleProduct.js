import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "./singleProductSlice";
import { useParams } from "react-router-dom";
import { addToCart } from "../cart/cartSlice";

function SingleProduct(props) {
  const dispatch = useDispatch();
  let { productId } = useParams();
  if (!productId) productId = props.productId;
  const product = useSelector((state) => state.singleProduct);
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);

  const handleAddToCart = (productId) => {
    dispatch(addToCart({ productId }));
  };

  let productArr = [];
  const handleGuestCart = (product) => {
    productArr.push(product);

    localStorage.setItem("guest", JSON.stringify(productArr));
  };

  useEffect(() => {
    
    dispatch(fetchSingleProduct(productId));
  }, []);

  return (
    <div>
      <header>
        <img src={product.coverImageUrl} className="single-img" />
      </header>
      <div>
        <h2>{product.title}</h2> by {product.author}
      </div>
      <div>
        <p className="product-description">{product.description}</p>
        <h2>${product.price}</h2>
        <p>ISBN: {product.isbn}</p>
      </div>
      <div>
        <button
          type="button"
          onClick={() => {
            isLoggedIn ? handleAddToCart(product.id) : handleGuestCart(product);
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default SingleProduct;
