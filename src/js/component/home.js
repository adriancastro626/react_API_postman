import React, { useState, useEffect } from "react";

//create your first component
export function Todo() {
	const [userInput, setUserInput] = useState("");
	const [task, setTask] = useState([]);
	const [count, setCount] = useState(0);

	const handleInfo = () => {
		if (userInput != null) {
			let newArray = [...task, { label: userInput, done: true }];
			console.log(task);
			setTask(newArray);
			setUserInput("");
			setCount(count + 1);
		}
		{
			actualizar();
		}
	};

	useEffect(() => {
		getData();
	}, []);
	const getData = () => {
		fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json"
			}
		})
			.then(function(response) {
				return response.json();
			})
			.then(function(myJson) {
				setTask(myJson);
			});
	};

	let flag = false;
	const removeTask = id => {
		task.splice(id, 1);
		setTask([...task]);
		// setCount(count - 1);
		actualizar();
		if (flag) {
			getData();
		}
	};

	let url =
		"https://assets.breatheco.de/apis/fake/todos/user/adriancastro626";
	let options = {
		method: "PUT",
		body: JSON.stringify(task),
		headers: {
			"Content-Type": "application/json"
		}
	};
	// let refresh = {
	// 	method: "GET",
	// 	headers: {
	// 		"Content-Type": "application/json"
	// 	}
	// };

	const actualizar = () => {
		fetch(url, options)
			.then(resp => {
				if (resp.status >= 200 && resp.status < 300) {
					console.log("La solicitud fue exitosa");
					flag = true;
					return resp.json();
				} else {
					console.log(
						`Se produjo un error ${resp.status} en la ejecucion`
					);
				}
				// Será true (verdad) si la respuesta es exitosa.
				// console.log(resp.status); // el código de estado = 200 o código = 400 etc.
				// console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string)
				// return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(body => {
				//Aquí es donde debe comenzar tu código después de que finalice la búsqueda
				console.log("Este es el body del request", body); //esto imprimirá en la consola el objeto exacto recibido del servidor
			})
			.catch(error => {
				//manejo de errores
				console.log(error);
			});
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
						{final.label}
						<button id="botonDelete" onClick={() => removeTask(id)}>
							<i className="far fa-trash-alt"></i>
						</button>
					</span>
				))}
				<p id="counter" className="ml-1">
					{task.length} tasks left{" "}
				</p>
			</div>
		</>
	);
}
