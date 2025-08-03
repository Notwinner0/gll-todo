import '../styles/main.scss'; // Импорт SCSS в JS (Webpack обработает)

// const tasks = document.querySelectorAll('.task');
const inputBox = document.querySelector('.new-todo')
const todoList = document.querySelector('.todo-list')
const clearButton = document.querySelector('.clear-completed')

function fadingRemove(element) {
    element.classList.add('fading-out')
    element.addEventListener('transitionend', () => {
        element.remove()
    }, { once: true })
}

function addTask(content) {
    let task = document.createElement('li')
    task.classList.add('task')
    task.innerHTML = `<span>${content}</span><div class="status-label">unfinished</div>`
    task.addEventListener('click', () => {
        task.classList.toggle('done');
        var taskLabel = task.querySelector('.status-label');
        taskLabel.textContent = task.classList.contains('done') ? 'finished' : 'unfinished';
    });
    addHoldToRemove(task)
    todoList.appendChild(task)
}

inputBox.addEventListener('keydown', (event) => {
    if (event.key == 'Enter') {
        addTask(inputBox.value)
    }
})


function clearCompleted() {
    let tasks = document.querySelectorAll('.task')
    let toDelete = []
    if (tasks) {
        tasks.forEach(task => {
            task.classList.contains('done') ? toDelete.push(task) : ''
        });
    }
    toDelete.forEach(task => {
        fadingRemove(task)
    })
}

clearButton.addEventListener('click', () => {
    clearCompleted()
})

function addHoldToRemove(element) {
    let pressTimer;
    element.addEventListener('mousedown', () => {
        pressTimer = setTimeout(() => {
            // console.log('Элемент удален по зажатию!');
            fadingRemove(element);
        }, 1000);
    });
    element.addEventListener('mouseup', () => {
        clearTimeout(pressTimer);
        // console.log('Кнопка отпущена, удаление отменено.');
    });

    element.addEventListener('mouseleave', () => {
        clearTimeout(pressTimer);
        // console.log('Курсор ушел с элемента, удаление отменено.');
    });
}

//TODO: dblclick to edit, if mouse out - save, enter - save