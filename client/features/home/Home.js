import React, { useEffect } from "react";
import Banner from "./Banner";
import Row from "./Row";
import LoadingScreen from "../loadingScreen/LoadingScreen";
import { fetchAllProducts } from "../allProducts/allProductsSlice"
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const productsToBeLoaded = useSelector((state) => state.allProducts.products);
  const loading = useSelector((state) => state.allProducts.loading);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <div>
      {loading ? <LoadingScreen/> : (<div>
        <Banner />
      <hr className="linebreak-below-banner" />
      <Row
        title={"Best Selling Novels"}
        genre={"novel" && "story"}
        isLargeRow={true}
        productArray={productsToBeLoaded}
      />
      <Row title={"Horror Books"} genre={"horr" && "film"} productArray={productsToBeLoaded}/>
      <Row title={"Fiction Books"} genre={"fiction"} productArray={productsToBeLoaded}/>
      <Row title={"Romance Books"} genre={"rom" && "love"} productArray={productsToBeLoaded}/>
      <Row title={"Astronomy Books"} genre={"astro"} productArray={productsToBeLoaded}/>
      </div>)}
    </div>
  );
};

export default Home;
