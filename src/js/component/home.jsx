import React from "react";

//include images into your bundle
import { ToDoList } from "./todolist";

//create your first component
export function Home() {
	return (
		<div className="todo-app">
			<ToDoList />
		</div>
	);
}
