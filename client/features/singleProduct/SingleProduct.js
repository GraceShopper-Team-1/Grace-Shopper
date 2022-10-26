import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "./singleProductSlice";
import { useParams } from "react-router-dom";

function SingleProduct() {
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
        <img src={product.coverImage} className="single-img"/>
      </header>
      <div>
        <body>
          <p>
            <h2>{product.title}</h2> by {product.author}
          </p>
        </body>
      </div>
      <div>
        <body>
          <p>{product.description}</p>
        </body>
        <h2>${product.price}</h2>
        <p>{product.isbn}</p>
      </div>
    </div>
  );
}

export default SingleProduct;
