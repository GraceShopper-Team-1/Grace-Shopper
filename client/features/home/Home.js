import React from "react";
import { useSelector } from "react-redux";
import Banner from "./Banner";

/**
 * COMPONENT
 */
const Home = (props) => {
  const username = useSelector((state) => state.auth.me.username);

  return (
    <div>
      <h3>Welcome {username ?`, ${username}` : "to BookWorm"}</h3>
      <Banner />
      <h1>THIS IS THE HOMEPAGE!*</h1>
    </div>
  );
};

export default Home;
