import React, { useState, useEffect } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";

//create your first component
export function ToDoList() {
	const [tarea, setTarea] = useState("");
	const [tareas, setTareas] = useState([]);
	const [falso, setFalso] = useState(0);
	const [verdadero, setVerdadero] = useState(0);

	useEffect(() => {
		// Actualiza el título del documento usando la API del navegador
		loadTodo();
		//contarTodo();
	}, ["loadTodo"]);

	let url = "https://assets.breatheco.de/apis/fake/todos/user/kao-hurtado";

	const loadTodo = async () => {
		let contar = 0;
		await fetch(url, {
			method: "Get",
			headers: { "Content-Type": "application/json" },
		})
			.then((res) => res.json())
			.then((data) => {
				setTareas(data);
				console.log({ data });

				for (let i = 0; i < data.length; i++) {
					if (data[i].done == false) {
						contar++;
					}
				}
				setFalso(contar);
				setVerdadero(data.length - contar);
			})
			.catch((error) => console.error("Error:", error.message));
	};

	//loadTodo();

	const newUser = () => {
		let array = [];
		fetch(url, {
			method: "Post",
			body: JSON.stringify(array),
			headers: { "Content-Type": "application/json" },
		})
			.then((res) => res.json())
			.then((data) => {
				loadTodo();
			});
	};

	const updatetodo = (tareas) => {
		fetch(url, {
			method: "Put",
			body: JSON.stringify(tareas),
			headers: { "Content-Type": "application/json" },
		})
			.then((res) => res.json())
			.then((data) => {
				loadTodo();
				alert(data.result);
			});
	};

	const deletetodo = (tareas) => {
		fetch(url, {
			method: "delete",
			body: "",
			headers: { "Content-Type": "application/json" },
		})
			.then((res) => res.json())
			.then((data) => {
				alert(data.result);
			})
			.catch((error) => console.log("error", error));
	};

	const validateTask = () => {
		if (tarea === "")
			alert("Debe ingresar algún valor para agregar la tarea");
		else {
			let nuevo = {
				label: tarea,
				done: false,
			};
			tareas.push(nuevo);
			//alert("Tarea agregada Satisfactoriamente");
			console.log(tareas);
			updatetodo(tareas);
			loadTodo();
			setTarea("");
		}
	};

	const todoTask = (index) => {
		//alert(index);
		let newList = tareas;

		let item = newList[index];
		item.done = true;
		console.log(newList);
		//setTareas([...newList]);
		updatetodo(newList);
	};

	const doneTask = (index) => {
		//alert(index);
		let newList = tareas;

		let item = newList[index];
		item.done = false;
		console.log(newList);
		//setTareas([...newList]);
		updatetodo(newList);
	};
	return (
		<div className=" container ">
			<div className="col-6">
				<div className="card col-12" id="container">
					<h1 className="card-title mt-4" id="h1">
						Todo List React con Fetch
					</h1>
					<div className="input-group mb-3 col-12">
						<input
							type="text"
							className="form-control"
							id="todo-input"
							placeholder="What needs to be done?"
							aria-label="Recipient's username"
							aria-describedby="button-addon2"
							onChange={(e) => setTarea(e.target.value)}
							value={tarea}
						/>
						<div className="input-group-append">
							<button
								className="btn btn-outline-success"
								type="button"
								id="button-addon2"
								onClick={validateTask}>
								Add Todo
							</button>
						</div>
					</div>
					<div className="card-body text-left">
						{tareas.map((muestratarea, index) => {
							if (muestratarea.done == false) {
								return (
									<div className="todo-row" key={index}>
										{muestratarea.label}
										<div className="icons">
											<RiCloseCircleLine
												onClick={() => todoTask(index)}
												className="delete-icon"
											/>
										</div>
									</div>
								);
							}
						})}
					</div>
					<p className="card-text text-left ml-2">
						<small className="text-muted">{falso} task ready</small>
					</p>
				</div>
				<div className="card col-12 mt-2" id="container">
					<h1 className="card-title mt-4" id="h1">
						Recicle
					</h1>
					<div className="input-group mb-3 col-12"></div>
					<div className="card-body text-left">
						{tareas.map((muestratarea, index) => {
							if (muestratarea.done == true) {
								return (
									<div className="todo-row" key={index}>
										{muestratarea.label}
										<TiEdit
											onClick={() => doneTask(index)}
											className="edit-icon"
										/>
									</div>
								);
							}
						})}
					</div>
					<p className="card-text text-left ml-2">
						<small className="text-muted">
							{verdadero} task ready
						</small>
					</p>
				</div>
			</div>
		</div>
	);
}
