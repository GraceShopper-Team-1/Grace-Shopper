import React from "react";
import { fetchCart } from "../cart/cartSlice";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

function OrderSuccess() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.paidCart);
  const userId = useSelector((state) => state.auth.me.id);

  useEffect(() => {
    dispatch(fetchCart(userId));
  }, [dispatch]);

  console.log(cart, "****CART78878 ORDER****");
  return (
    <div>
      <h1> THANK YOU FOR YOUR ORDER!</h1>
      <h3>Items In Your Order:</h3>

      {cart.map((item) => (
        <div className="cart-div">
          <li key={item.id}>
            <img style={{display:'flex'}} className="cart-img" src={item.coverImageUrl} alt='Book Image'/>
            <div className="content">
            <h5 className="cart-title"> {item.title}</h5>
            <h6 className="cart-author">By: {item.author}</h6>
            <h6 className="cart-quantity">Quantity Placeholder</h6>
            <h5 className="cart-price">{item.price}</h5></div>
            <hr/> 
          </li>
        </div>
        ))}
    </div>
  );
}

export default OrderSuccess;
