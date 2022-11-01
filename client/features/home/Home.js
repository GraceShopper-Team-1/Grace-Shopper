import React from "react";
// import { useSelector } from "react-redux";
import Banner from "./Banner";
import Row from "./Row";
import {horror, romance, fiction, astro, novels } from './booksByGenre'


/**
 * COMPONENT
 */
const Home = () => {
	// const username = useSelector((state) => state.auth.me.username);

	return (
		<div>
			<Banner />
			<hr className="linebreak-below-banner" />
			<Row title={"Best Selling Novels"} genre={novels} isLargeRow={true}/>
			<Row title={"Horror Books"} genre={horror}/>
			<Row title={"Fiction Books"} genre={fiction} />
			<Row title={"Romance Books"} genre={romance}/>
			<Row title={"Astrology Books"} genre={astro} />
		</div>
	);
};

export default Home;
