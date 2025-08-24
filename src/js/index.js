import '../styles/main.scss'; // Импорт SCSS в JS (Webpack обработает)

// const tasks = document.querySelectorAll('.task');
const elements = {
    inputBox: document.querySelector('.new-todo'),
    todoList: document.querySelector('.todo-list'),
    clearButton: document.querySelector('.clear-completed')
}

function fadingRemove(element) {
    element.classList.add('fading-out')
    element.addEventListener('transitionend', () => {
        element.remove()
    }, { once: true })
}

function addTask(content) {
    let task = document.createElement('li')
    task.classList.add('task')

    let contentSpan = document.createElement('span');
    contentSpan.textContent = content;

    let statusLabel = document.createElement('div');
    statusLabel.classList.add('status-label');
    statusLabel.textContent = 'unfinished';

    task.appendChild(contentSpan);
    task.appendChild(statusLabel);

    // task.innerHTML = `<span>${content}</span><div class="status-label">unfinished</div>`
    statusLabel.addEventListener('click', () => {
        task.classList.toggle('done');
        var taskLabel = task.querySelector('.status-label');
        taskLabel.textContent = task.classList.contains('done') ? 'finished' : 'unfinished';
    });

    task.addEventListener('dblclick', () => {
        console.log('start implementing proper mvc? this is getting quite messy.')
    });
    addHoldToRemove(task)
    elements.todoList.appendChild(task)
}

elements.inputBox.addEventListener('keydown', (event) => {
    if (event.key == 'Enter') {
        addTask(elements.inputBox.value)
    }
})


function clearCompleted() {
    let tasks = document.querySelectorAll('.task.done')
    tasks.forEach(task => {
        fadingRemove(task)
    })
}

elements.clearButton.addEventListener('click', () => {
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

