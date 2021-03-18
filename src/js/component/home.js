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
			setCount(count + 1);
		}
	};

	const removeTask = id => {
		task.splice(id, 1);
		setTask([...task]);
		setCount(count - 1);
	};

	return (
		<>
			<div className="card" id="mainCard">
				<h1 id="header" className="card-header">
					To Do List
				</h1>
				<input
					className="mb-2 inputClass"
					placeholder="Add Task"
					type="text"
					requiered
					value={userInput}
					onChange={e => setUserInput(e.target.value)}
					onKeyPress={e => (e.key === "Enter" ? handleInfo() : "")}
				/>

				{task.map((final, id) => (
					<span className="card-subtitle mb-4 claseTask" key={id}>
						{final}
						<button id="botonDelete" onClick={() => removeTask(id)}>
							<i class="far fa-trash-alt"></i>
						</button>
					</span>
				))}
				<p id="counter" className="ml-1">
					{count} task's left{" "}
				</p>
			</div>
		</>
	);
}
