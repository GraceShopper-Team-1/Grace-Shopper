import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUser } from "./usersSlice";
import { useParams } from "react-router-dom";

function SingleUser() {
	const dispatch = useDispatch();
	const { id } = useParams();
	const user = useSelector((state) => state.user.singleUser);

	useEffect(() => {
		dispatch(getSingleUser(id));
	}, [dispatch]);

	return (
		<div>
			<img
				className="pfp"
				src="https://www.learningguild.com/images/redesign-2022/avatar.png"
			/>
			<div>
				<h1>{user.username}</h1>
				<p>{user.email}</p>
			</div>
		</div>
	);
}

export default SingleUser;
