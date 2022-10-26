
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchFeaturedProducts} from "./homeSlice"



const Home = (props) => {
  const dispatch = useDispatch();
  let featuredProducts = useSelector((state) => state.home.featuredProducts)
  featuredProducts = featuredProducts.slice(5)

  useEffect(() => {
    dispatch(fetchFeaturedProducts())
  }, [dispatch])

  const username = useSelector((state) => state.auth.me.username);

  return (

   <div>
      <div className="welcome-user">
    <h3>Welcome, {username}</h3>
    </div>
    <h1 className="featured-text">Featured Books</h1>
    <div className='featured-books'> 
    {featuredProducts.map((product) => (
    <div className="product-entry" key={product.id}>
							<img
								src={product.book_image}
								alt="Cover Image"
								className="product-img"
							/>
							<h3>{product.title}</h3>
							<h5>{product.author}</h5>
    </div>))}
    </div>
    </div>)
};

export default Home;
