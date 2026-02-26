function addTask() {
    const input = document.getElementById('newTaskInput');
    const taskText = input.value.trim();

    if(taskText) {
        const taskList = document.getElementById('taskList');
        const newItem = document.createElement('li');
        newItem.textContent = taskText;
        taskList.appendChild(newItem);
        input.value = '';
    }
}
