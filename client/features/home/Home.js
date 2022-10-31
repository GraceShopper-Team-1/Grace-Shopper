import React from "react";
// import { useSelector } from "react-redux";
import Banner from "./Banner";
import Row from "./Row";

/**
 * COMPONENT
 */
const Home = () => {
	// const username = useSelector((state) => state.auth.me.username);

	return (
		<div>
			<Banner />
			<hr className="linebreak-below-banner" />
			<Row title={"Best Selling Novels"} />
			<Row title={"Horror Books"} />
			<Row title={"Fiction Books"} />
			<Row title={"Romance Books"} />
			<Row title={"Astrology Books"} />
		</div>
	);
};

export default Home;
