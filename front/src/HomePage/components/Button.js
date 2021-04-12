import React from "react";
import PropTypes from "prop-types";

const Button = ({ color, text, onClick }) => {
	return (
		<button
			onClick={onClick}
			style={{ backgrounColor: color }}
			className="btn"
		>
			{text}
		</button>
	);
};
Button.propTypes = {
	color: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default Button;
