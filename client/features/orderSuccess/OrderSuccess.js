import React from "react";
import { fetchCart } from "../cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";


function OrderSuccess() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.paidCart);
  const userId = useSelector((state) => state.auth.me.id);

  useEffect(() => {
    dispatch(fetchCart(userId));
  }, [dispatch]);



 
  return (
    <div>
      <h1> THANK YOU FOR YOUR ORDER!</h1>
      <h3>Items In Your Order:</h3>


      {cart.map((item) => (
        <div className="cart-div">
          <li key={item.id}>
            <div className="content">
            <img className="cart-img" src={item.coverImageUrl} alt='Book Image'/>
            <h5 className="cart-title"> {item.title}</h5>
            <h6 className="cart-author">By: {item.author}</h6>
            <h6 className="cart-quantity">Quantity/Price: {`${item?.order_product.quantity} * ${item.price}`}</h6>
            <h5 className="cart-price">Total: {`${(item.price * item?.order_product.quantity).toFixed(2)}` }</h5></div>
            <hr/> 
          </li>
        </div>
        ))}
        <button onClick={() => navigate("/")}> HOME </button>
    </div>
  );
}

export default OrderSuccess;
