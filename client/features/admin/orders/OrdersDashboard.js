import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "./ordersSlice";
import LoadingScreen from "../../loadingScreen/LoadingScreen";

function OrdersDashboard() {
	const dispatch = useDispatch();
	const orders = useSelector((state) => state.orders.allOrders);
	const loading = useSelector((state) => state.orders.loading);

	useEffect(() => {
		dispatch(fetchOrders());
	}, [dispatch]);

	return (
		<div>
			{loading ? (
				<LoadingScreen />
			) : (
				<div>
					<h2>Orders Dashboard</h2>
					<table className="table" id="orders-dash">
						<thead>
							<tr>
								<th>Order ID</th>
								<th>User</th>
								<th>Products</th>
								<th>Status</th>
								<th>Created at</th>
							</tr>
						</thead>
						<tbody>
							{orders?.map((order) => {
								return (
									<tr key={order.id} className="order">
										<td>{order.id}</td>
										<td>{order.user?.username || "Guest"}</td>
										<td>
											{" "}
											{order?.products.map((book) => (
												<li key={book.id}>{book.title}</li>
											))}
										</td>
										<td>{order?.status}</td>
										<td>{order?.createdAt}</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}

export default OrdersDashboard;
