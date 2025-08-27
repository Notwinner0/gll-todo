/**
 * Generates a unique ID from a state.
 * @param {object} state - The current state.
 * @returns {string} The unique ID.
 */
const generateId = (state) =>
    state.todos.length === 0
        ? 1
        : Math.max(...state.todos.map(t => t.id)) + 1;