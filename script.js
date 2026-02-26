let tasks = [];

function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        displayTasks();
    }
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

function displayTasks() {
    const taskList = document.getElementById('taskList');
    const emptyMessage = document.getElementById('emptyMessage');

    taskList.innerHTML = '';

    if (tasks.length === 0) {
        emptyMessage.style.display = 'block';
        return;
    } else {
        emptyMessage.style.display = 'none';
    }

    tasks.forEach((task, index) => {
        const li = document.createElement('li');

        const taskSpan = document.createElement('span');
        taskSpan.className = 'task-text';
        taskSpan.textContent = task.text;

        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'task-buttons';

        const editBtn = document.createElement('button');
        editBtn.className = 'task-btn edit-btn';
        editBtn.innerHTML = '✎';
        editBtn.onclick = () => editTask(index);

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'task-btn delete-btn';
        deleteBtn.innerHTML = '✖';
        deleteBtn.onclick = () => deleteTask(index);

        buttonContainer.appendChild(editBtn);
        buttonContainer.appendChild(deleteBtn);

        li.appendChild(taskSpan);
        li.appendChild(buttonContainer);
        taskList.appendChild(li);
    });
}

function addTask() {
    const input = document.getElementById('newTaskInput');
    const taskText = input.value.trim();

    if (taskText) {
        tasks.push({
            text: taskText,
            id: Date.now(),
            created: new Date().toLocaleString()
        });

        saveTasks();
        input.value = '';
        showNotification('Задача добавлена!', 'success');
    } else {
        showNotification('Введите текст задачи!', 'error');
    }
}

function deleteTask(index) {
    if (confirm('Вы уверены, что хотите удалить эту задачу?')) {
        const deletedTask = tasks[index].text;
        tasks.splice(index, 1);
        saveTasks();
        showNotification(`Задача "${deletedTask}" удалена`, 'info');
    }
}

function editTask(index) {
    const newText = prompt('Редактировать задачу:', tasks[index].text);

    if (newText !== null) {
        const trimmedText = newText.trim();

        if (trimmedText === '') {
            showNotification('Текст задачи не может быть пустым!', 'error');
            return;
        }

        if (trimmedText !== tasks[index].text) {
            tasks[index].text = trimmedText;
            saveTasks();
            showNotification('Задача обновлена!', 'success');
        }
    }
}

function clearAllTasks() {
    if (tasks.length === 0) {
        showNotification('Список задач уже пуст', 'info');
        return;
    }

    if (confirm('Вы уверены, что хотите удалить ВСЕ задачи?')) {
        tasks = [];
        saveTasks();
        showNotification('Все задачи удалены', 'info');
    }
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 8px;
        color: white;
        font-size: 14px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    `;

    switch(type) {
        case 'success':
            notification.style.backgroundColor = '#28a745';
            break;
        case 'error':
            notification.style.backgroundColor = '#dc3545';
            break;
        default:
            notification.style.backgroundColor = '#007BFF';
    }

    document.body.appendChild(notification);

    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

document.addEventListener('DOMContentLoaded', function() {
    loadTasks();

    const input = document.getElementById('newTaskInput');
    input.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});