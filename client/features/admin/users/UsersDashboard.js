import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "./usersSlice";

function UsersDashboard() {
	const users = useSelector((state) => state.user.allUsers);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUsers());
	}, [dispatch]);

	return (
		<div>
			<h1>Users Dashboard</h1>
			{/* o: destructuring is your friend */}
			{users.map((user) => {
				return (
					<li key={user.id}>
						<Link to={`/admin/users/${user.id}`}>
							<span>{user.username}</span> 
							<p>{user.email}</p>
						</Link>
					</li>
				);
			})}
		</div>
	);
}

export default UsersDashboard;
