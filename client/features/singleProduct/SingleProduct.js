import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "./singleProductSlice";
import { useParams } from "react-router-dom";

function singleProduct() {
  const dispatch = useDispatch();

  const { productId } = useParams();

  const product = useSelector((state) => state.singleProduct);

  console.log(product);

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
  }, []);

  return (
    <div>
      <header>
        <img src={product.coverImage} className="single-img" />
      </header>
      <div>
        <body>
          <h2>{product.title}</h2> by {product.author}
        </body>
      </div>
      <div>
        <body>
          <p>{product.description}</p>
        </body>
        <h2>${product.price}</h2>
        <p>{product.isbn}</p>
      </div>
      <div>
        <button type="submit">Add to cart</button>
      </div>
    </div>
  );
}

export default singleProduct;
