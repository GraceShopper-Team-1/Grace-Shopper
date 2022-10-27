import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchCart, removeFromCart } from "./cartSlice";

function cart() {
  const dispatch = useDispatch();

  const shoppingCart = useSelector((state) => state.cart.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  return (
    <div id="shopping-cart">
      <h3>Shopping Cart</h3>
      <div className="column-container">
        {shoppingCart.map((cartItem) => (
          <div className="product-entry" key={cartItem.id}>
            <Link to={`/products/${cartItem.productId}`}>
              <img
                src={cartItem.coverImage}
                alt="Cover Image"
                className="product-img"
              />
              <h3>{cartItem.title}</h3>
              <h5>{cartItem.author}</h5>
              <p>${cartItem.price}</p>
              <p>Quantity: {cartItem.purchaseQuantity}</p>
            </Link>
            <button
              type="delete"
              onClick={async () => {
                await dispatch(removeFromCart(cartItem.productId));
                await dispatch(fetchCart());
              }}
            >
              Remove from cart
            </button>
          </div>
        ))}
      </div>
      <div>
        <h3>Order details:</h3>
        <button type="submit">Checkout</button>
      </div>
    </div>
  );
}

export default cart;
