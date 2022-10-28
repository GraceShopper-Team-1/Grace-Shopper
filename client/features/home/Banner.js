import { use } from "chai";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Banner() {
	const navigate = useNavigate();

	return (
		<div
			id="banner"
			style={{
				backgroundSize: "cover",
				backgroundImage: `url("https://dispatch.barnesandnoble.com/content/dam/ccr/homepage/daily/2022/10/24/24947_BB_A_BOTY_1024_V2_Oct-24-31.jpg")`,
				backgroundPosition: "center center",
			}}
			onClick={() => navigate("/products")}
		></div>
	);
}

export default Banner;
