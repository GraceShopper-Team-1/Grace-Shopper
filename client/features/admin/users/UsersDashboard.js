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
			<h2>Users Dashboard</h2>
			<table>
				<thead>
					<tr>
						<th>User ID</th>
						<th>Username</th>
						<th>Email</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => {
						return (
							<tr key={user.id}>
								<td>{user.id}</td>
								<td>
									<Link to={`/admin/users/${user.id}`}>
										<div>{user.username}</div>
									</Link>
								</td>
								<td>{user.email}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

export default UsersDashboard;
