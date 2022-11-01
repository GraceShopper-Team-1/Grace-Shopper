import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { fetchCart, removeFromCart, checkoutCart } from "./cartSlice";
import OrderSuccess from "../orderSuccess/OrderSuccess";
import { Route, Routes } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const userId = useSelector((state) => state.auth.me.id) || null;
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);

  localStorage.getItem("guest");
  const books = JSON.parse(localStorage.getItem("guest"));
  
  const handleCheckout = (userId) => {
    dispatch(checkoutCart(userId));
    navigate("/cart/success");
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleRemoveFromGuestCart = async (id) => {
    let newBooks = books.filter((book) => {
      return book.id !== id;
    });
    localStorage.setItem("guest", JSON.stringify(newBooks));
    await dispatch(fetchCart());
  };

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <div id="shopping-cart">
      <h3>Shopping Cart</h3>
      <div className="column-container">
        {isLoggedIn ? (
          cart.length ? (
            cart.map((cartItem) => (
              <li key={cartItem.id} className="product-entry">
                <Link to={`/products/${cartItem.id}`}>
                  <img
                    src={cartItem.coverImageUrl}
                    alt="Cover Image"
                    className="product-img"
                  />
                  <h3>Order details:</h3>
                  <h3>{cartItem.title}</h3>
                  <h5>By: {cartItem.author}</h5>
                  <p>${cartItem.price}</p>
                  <p>Quantity: {cartItem?.order_product?.quantity}</p>
                </Link>
                <button
                  type="button"
                  onClick={async () => {
                    handleRemoveFromCart(cartItem.id);
                  }}
                >
                  Remove from cart
                </button>
              </li>
            ))
          ) : (
            <h3>Your cart is empty!</h3>
          )
        ) : books.length ? (
          books.map((book) => (
            <li key={book.id} className="product-entry">
              <Link to={`/products/${book.id}`}>
                <img
                  src={book.coverImageUrl}
                  alt="Cover Image"
                  className="product-img"
                />
                <h3>Order details:</h3>
                <h3>{book.title}</h3>
                <h5>By: {book.author}</h5>
                <p>${book.price}</p>
                <p>Quantity: {book?.order_product?.quantity}</p>
              </Link>
              <button
                type="button"
                onClick={() => handleRemoveFromGuestCart(book.id)}
              >
                Remove from cart
              </button>
            </li>
          ))
        ) : (
          <h3>Your cart is empty!</h3>
        )}
      </div>
      <div>
        <button
          type="submit"
          onClick={() => {
            handleCheckout(userId);
            localStorage.setItem("guest", JSON.stringify([]));
          }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
