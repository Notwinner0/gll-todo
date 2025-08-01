import '../styles/main.scss'; // Импорт SCSS в JS (Webpack обработает)

const tasks = document.querySelectorAll('.task');

tasks.forEach(task => {
    task.addEventListener('click', () => {
        task.classList.toggle('done');
        var taskLabel = task.querySelector('.status-label');
        taskLabel.textContent = task.classList.contains('done') ? 'finished' : 'unfinished';
    });

});