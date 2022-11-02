import React from "react";

const Toast = (props) => {
	return (
		<div id="toast">
			<span>{props.message}</span>
		</div>
	);
};

export default Toast;
