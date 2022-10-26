import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AllProducts from "../features/allProducts/AllProducts";
import AuthForm from "../features/auth/AuthForm";
import Home from "../features/home/Home";
import SingleProduct from "../features/singleProduct/SingleProduct";
import Cart from "../features/cart/Cart";
import LoadingScreen from "../features/LoadingScreen/LoadingScreen";
import { me } from "./store";

/**
 * COMPONENT
 */

const AppRoutes = () => {
	const isLoggedIn = useSelector((state) => !!state.auth.me.id);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(me());
	}, []);

	return (
		<div>
			{isLoggedIn ? (
				<Routes>
					<Route path="/*" element={<Home />} />
					<Route to="/home" element={<Home />} />
					<Route path="/products" element={<AllProducts />} />
					<Route path="/products/:productId" element={<SingleProduct />} />
					<Route path="/cart" element={<Cart />} />
          <Route path="loading" element={<LoadingScreen/>} />
					<Route path="*" element={"Not found!"} />
				</Routes>
			) : (
				<Routes>
					<Route
						path="/*"
						element={<AuthForm name="login" displayName="Login" />}
					/>
					<Route
						path="/login"
						element={<AuthForm name="login" displayName="Login" />}
					/>
					<Route
						path="/signup"
						element={<AuthForm name="signup" displayName="Sign Up" />}
					/>

					<Route path="/products/:productId" element={<SingleProduct />} />
				</Routes>
			)}
		</div>
	);
};

export default AppRoutes;
