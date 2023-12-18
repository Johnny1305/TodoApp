import update from 'immutability-helper';

// Function to get tasks from localStorage
export function getAll() {
    // Get tasks from localStorage, or an empty array if not present
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // If no tasks are stored, use the initial data
    return storedTasks.length ? storedTasks : getDefaultTasks();
}

// Function to get default tasks
function getDefaultTasks() {
    return [
    ];
}

// Function to save tasks to localStorage
function saveTasksToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function getItemById(itemId) {
    return getAll().find(item => item.id === itemId);
}

export function updateStatus(items, itemId, completed) {
    let index = items.findIndex(item => item.id === itemId);

    // Returns a new list of data with updated item.
    const updatedItems = update(items, {
        [index]: {
            completed: {$set: completed}
        }
    });

    // Save the updated tasks to localStorage
    saveTasksToLocalStorage(updatedItems);

    return updatedItems;
}

let todoCounter = 1;

function getNextId() {
    return getAll().length + todoCounter++;
}

export function addToList(list, data) {
    let item = Object.assign({
        id: getNextId()
    }, data);

    const updatedList = list.concat([item]);

    // Save the updated tasks to localStorage
    saveTasksToLocalStorage(updatedList);

    return updatedList;
}

