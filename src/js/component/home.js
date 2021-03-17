import React, { useState } from "react";

//create your first component
export function Todo() {
	const [userInput, setUserInput] = useState("");
	const [task, setTask] = useState([]);
	const [count, setCount] = useState(0);

	const handleInfo = () => {
		if (userInput != null) {
			let newArray = [...task, userInput];
			setTask(newArray);
			setUserInput("");
		}
	};

	function removeTask(id) {
		const elimTask = [...task].filter(userInput => userInput.id !== id);

		setTask(elimTask);
		setCount(count - 1);
	}

	return (
		<>
			<div className="fondo">
				<div className="container" className="edit">
					<h1 className="title">Enter Your Next Task</h1>
					<input
						className="boton"
						type="text"
						requiered
						value={userInput}
						onChange={e => setUserInput(e.target.value)}
						onKeyPress={e =>
							e.key === "Enter" ? handleInfo() : ""
						}
					/>

					{task.map((final, i) => (
						<p key={i} onClick={() => removeTask()}>
							{final}
						</p>
					))}
				</div>
			</div>
		</>
	);
}
