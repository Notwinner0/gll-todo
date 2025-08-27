import { generateId } from './model'

// DB

// state is like a store

export const storeGetData = (currentState, name) => {
    return currentState[name];
};

export const storeFind = (currentState, name, query) => {
    const { todos } = currentState[name];

    const checkTodo = (todo, currentQuery) =>
    Object.entries(currentQuery).every(([k, v]) => todo[k] === v); // simple search

    return todos.filter((todo) => checkTodo(todo, query));
};


export const storeFindAll = (currentState, name) => {
    return currentState[name].todos
}

export const storeSave = (currentState, updateData, name, id) => {
    const todos = currentState[name].todos; // a.k.a. data

    if (id) {
        const updatedTodos = todos.map(todo => todo.id === id ? { ...todo, ...updateData } : todo);

        return {
            ...currentState,
            [name]: {
                ...currentState[name],
                todos: updatedTodos // fresh object
            }
        };
    } else {
        const newTodo = { ...updateData, id: generateId(currentState) };
        const newTodos = [...todos, newTodo];

        return {
            ...currentState,
            [name]: {
                ...currentState[name],
                todos: newTodos // fresh object
            }
        };
    }
}

export const storeRemove = (currentState, name, id) => {
    const todos = currentState[name].todos; // a.k.a. data
    const updatedTodos = todos.filter(todo => todo.id !== id); // filters it out and gets new todos

    return {
            ...currentState,
            [name]: {
                ...currentState[name],
                todos: updatedTodos // fresh object
            }
        };
}

export const storeDrop = (currentState, name) => {
    return {
        ...currentState,
        [name] : {
            todos: [] // empty
        }
    }
}

export const storeSetState = (currentState, newName, newData) => {
    return {
        ...currentState, // non-destructive copy
        [newName]: newData,
    };
};