import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "./ordersSlice";

function OrdersDashboard() {
	const orders = useSelector((state) => state.orders);
	console.log("orders", orders);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchOrders());
	}, [dispatch]);

	return (
		<div>
			<h1>Orders Dashboard</h1>
			{orders.map((order) => {
				return (
					<div key={order.id} className="order">
						<p>Order ID: {order.id}</p>
						<p>User: {order.user.username || "Guest"}</p>
						<div>Products: {order.products.map((book) => (<li>{book.title}</li>))}</div>
						<p>Status: {order.status}</p>
						<p>Created at: {order.createdAt}</p>
					</div>
				);
			})}
		</div>
	);
}

export default OrdersDashboard;
