import React from "react";
import { useState } from "react";
import Modal from "react-modal";
import Datetime from "react-datetime";
import PropTypes from "prop-types";
function AddEventModal({ isOpen, onClose, onEventAdded }) {
	const [title, setTitle] = useState("");
	const [start, setStart] = useState(new Date());
	// eslint-disable-next-line no-unused-vars
	const [end, setEnd] = useState(new Date());
	const onSubmit = (event) => {
		event.preventDefault();
		onEventAdded({
			title,
			start,
			end,
		});
		onClose();
	};

	return (
		<Modal isOpen={isOpen} onRequestClose={onClose}>
			<form onSubmit={onSubmit}>
				<input
					placeholder="number"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>

				<div>
					<label>Completion date</label>
					<Datetime
						value={start}
						onChange={(date) => setStart(date)}
					/>
				</div>
				<button>Add</button>
			</form>
		</Modal>
	);
}

AddEventModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	onEventAdded: PropTypes.func.isRequired,
};

export default AddEventModal;
