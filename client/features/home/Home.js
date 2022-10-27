import React from "react";
import { useSelector } from "react-redux";

/**
 * COMPONENT
 */
const Home = (props) => {
  const username = useSelector((state) => state.auth.me.username);

  return (
    <div>
      <h3>Welcome, {username ? username : "to BookWorm"}</h3>
      <h1>THIS IS THE HOMEPAGE!*</h1>
    </div>
  );
};

export default Home;
