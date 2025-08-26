// DB

// state is like a store

export const storeGetData = (currentState, name) => {
    return currentState[name];
};

export const storeFind = (currentState, name, query) => {
    const { todos } = currentState[name];

    const checkTodo = (todo, currentQuery) => {
        const keys = Object.keys(currentQuery);
        if (keys.length === 0) {
            return true;
        }
        const [key, ...remainingKeys] = keys;

        const nextQuery = {};
        for (const k of remainingKeys) {
            nextQuery[k] = currentQuery[k];
        }

        if (currentQuery[key] !== todo[key]) {
            return false;
        } else {
            return checkTodo(todo, nextQuery);
        }
    };

    return todos.filter((todo) => checkTodo(todo, query));
};

// TODO: findAll, save, remove, drop

export const storeSetState = (currentState, newName, newData) => {
    return {
        ...currentState, // non-destructive copy
        [newName]: newData,
    };
};