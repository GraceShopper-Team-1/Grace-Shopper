import React from "react";
// import { useSelector } from "react-redux";
import Banner from "./Banner";
import Row from "./Row";

/**
 * COMPONENT
 */
const Home = () => {
  // const username = useSelector((state) => state.auth.me.username);

  return (
    <div>
      <Banner />
      <hr className="linebreak-below-banner" />
      <Row
        title={"Best Selling Novels"}
        genre={"novel" && "story"}
        isLargeRow={true}
      />
      <Row title={"Horror Books"} genre={"horr" && "film"} />
      <Row title={"Fiction Books"} genre={"fiction"} />
      <Row title={"Romance Books"} genre={"rom" && "love"} />
      <Row title={"Astronomy Books"} genre={"astro"} />
    </div>
  );
};

export default Home;
