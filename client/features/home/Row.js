import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllProducts } from "../allProducts/allProductsSlice";

function Row({ title, genre, isLargeRow }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.allProducts.products);

  const bookInfo = products.map(({id,coverImageUrl, description}) => {
    return {
      id,
      coverImageUrl,
      description: description !== null ? description : "You just gotta give this book a try..."
    }
    
   })

  const genreBooks = bookInfo.filter((book) => {
      return book.description.includes(genre)
  })


  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <div className="row-container">
      <h2 className="row-text-HomeScreen">{title}</h2>
      <hr />
      <div className="rowBooks">
        {isLargeRow
          ? genreBooks?.map((book) => (
              <li key={book.id}>
                <img
                  className="row-img-large"
                  src={book.coverImageUrl}
                  onClick={() => navigate(`/products/${book.id}`)}
                />
              </li>
            ))
          : genreBooks?.map((book) => (
              <li key={book.id}>
                <img className="row-img" src={book.coverImageUrl}  onClick={() => navigate(`/products/${book.id}`)}/>
              </li>
            ))}
      </div>
    </div>
  );
}

export default Row;
