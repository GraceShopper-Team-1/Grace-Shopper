import React from "react";
import Navbar from "../features/navbar/Navbar";
import AppRoutes from "./AppRoutes";

const App = () => {
	localStorage.setItem("guest", JSON.stringify([]));
	return (
		<div>
			<Navbar />
			<AppRoutes />
		</div>
	);
};

export default App;
