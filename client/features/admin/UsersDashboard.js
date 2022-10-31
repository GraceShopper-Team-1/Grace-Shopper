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
      <div>
      
        <h1>USER INFORMATION</h1>
        {users.map((user) => {
          return (
            <ul key={user.id}>
              <Link to={`/admin/users/${user.id}`}>
                <h4>{user.username}</h4>
              </Link>
            </ul>
          );
        })}
      </div>
    </div>
  );
}

export default UsersDashboard;
