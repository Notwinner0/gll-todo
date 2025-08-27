import { storeSave, storeFindAll, storeFind, storeRemove, storeDrop } from "./store";

/**
* Generates a unique ID from a state.
* @param {object} state - The current state.
*/
export const generateId = (state) =>
	state.todos.length === 0
? 1
: Math.max(...state.todos.map(t => t.id)) + 1;

export const modelCreate = (currentState, name, title) => {
	const safeTitle = title || "";

	const newItem = { // a.k.a. updateData
		title: safeTitle.trim(),
		completed: false,
	};

	return storeSave(currentState, newItem, name) // fresh model
}

export const modelRead = (currentState, name, query) => {
	const queryType = typeof query;

	if (queryType === "function") {
		return storeFindAll(currentState, name)
	} else if (queryType === "string" || queryType === "number") {
		const newQuery = parseInt(query, 10)
		return storeFind(currentState, name, newQuery)
	} else {
		return storeFind(currentState, name, query)
	}
}

export const modelUpdate = (currentState, data, name, id) => {
	return storeSave(currentState, data, name, id)
}

export const modelRemove = (currentState, name, id) => {
	return storeRemove(currentState, name, id)
}

export const modelRemoveAll = (currentState, name) => {
	return storeDrop(currentState, name)
}

export const modelGetCount = (currentState, name) => {

	const allTodos = storeFindAll(currentState, name)
	return allTodos.reduce(
    (stats, todo) => ({
      active: stats.active + (todo.completed ? 0 : 1),
      completed: stats.completed + (todo.completed ? 1 : 0),
      total: stats.total + 1
    }),
    { active: 0, completed: 0, total: 0 }
  );
}