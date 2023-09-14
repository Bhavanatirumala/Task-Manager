document.addEventListener("DOMContentLoaded", function () {
    const taskList = document.getElementById('task-list');
    const taskInput = document.getElementById('task-input');
    const prioritySelect = document.getElementById('priority-select');
    const categorySelect = document.getElementById('category-select');
    const addTaskButton = document.getElementById('add-task');
    const storageUsage = document.getElementById('storage-usage');
    const memoryUsage = document.getElementById('memory-usage');
    const ramUsage = document.getElementById('ram-usage');

    const tasks = []; // Array to store tasks

    // Simulated resource usage data
    let simulatedStorageUsage = 100; // MB
    let simulatedMemoryUsage = 200; // MB
    let simulatedRamUsage = 400; // MB

    updateResourceUsage();

    addTaskButton.addEventListener('click', function () {
        const taskText = taskInput.value.trim();
        const taskPriority = prioritySelect.value;
        const taskCategory = categorySelect.value;

        if (taskText !== '') {
            // Create a task object
            const task = {
                text: taskText,
                priority: taskPriority,
                category: taskCategory,
                usage: Math.floor(Math.random() * 100) + 1 // Random usage value (for demonstration)
            };

            tasks.push(task); // Add the task to the array

            // Update simulated resource usage (increase by a random amount)
            simulatedStorageUsage += Math.floor(Math.random() * 20); // Increase storage usage by up to 20 MB
            simulatedMemoryUsage += Math.floor(Math.random() * 30); // Increase memory usage by up to 30 MB
            simulatedRamUsage += Math.floor(Math.random() * 40); // Increase RAM usage by up to 40 MB

            updateResourceUsage();

            // Clear the input fields
            taskInput.value = '';
            prioritySelect.value = 'High'; // Reset priority to default
            categorySelect.value = 'Work'; // Reset category to default

            // Re-render the task list
            renderTaskList();
        }
    });

    taskList.addEventListener('click', function (event) {
        const target = event.target;
        if (target.classList.contains('edit-button')) {
            const taskContent = target.parentElement.querySelector('.task-content');
            const newTaskText = prompt('Edit task:', taskContent.textContent);
            if (newTaskText !== null) {
                taskContent.textContent = newTaskText;
            }
        } else if (target.classList.contains('delete-button')) {
            const taskItem = target.parentElement;
            const index = parseInt(taskItem.getAttribute('data-index'));
            tasks.splice(index, 1); // Remove task from array

            // Simulate a decrease in RAM usage (reduce by up to 40 MB)
            simulatedRamUsage -= Math.floor(Math.random() * 40);

            updateResourceUsage();
            renderTaskList(); // Re-render the task list after deletion
        }
    });

    // Helper function to update resource usage display
    function updateResourceUsage() {
        storageUsage.textContent = simulatedStorageUsage + ' MB';
        memoryUsage.textContent = simulatedMemoryUsage + ' MB';
        ramUsage.textContent = simulatedRamUsage + ' MB';
    }

    // Helper function to create a task element
    function createTaskElement(task, index) {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');
        taskItem.dataset.priority = task.priority;
        taskItem.dataset.category = task.category;
        taskItem.setAttribute('data-index', index);

        const taskContent = document.createElement('span');
        taskContent.textContent = task.text;
        taskContent.classList.add('task-content');

        const taskMeta = document.createElement('div');
        taskMeta.classList.add('task-meta');

        const priorityBadge = document.createElement('span');
        priorityBadge.textContent = 'Priority: ' + task.priority;
        priorityBadge.classList.add('priority-badge');

        const categoryBadge = document.createElement('span');
        categoryBadge.textContent = 'Category: ' + task.category;
        categoryBadge.classList.add('category-badge');

        const usageBadge = document.createElement('span');
        usageBadge.textContent = 'Usage: ' + task.usage + '%';
        usageBadge.classList.add('usage-badge');

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-button');

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');

        taskItem.appendChild(taskContent);
        taskItem.appendChild(taskMeta);
        taskMeta.appendChild(priorityBadge);
        taskMeta.appendChild(categoryBadge);
        taskMeta.appendChild(usageBadge);
        taskItem.appendChild(editButton);
        taskItem.appendChild(deleteButton);

        return taskItem;
    }

    // Helper function to render the task list
    function renderTaskList() {
        // Clear the task list
        taskList.innerHTML = '';

        // Sort tasks by priority and category
        tasks.sort((a, b) => {
            // First, compare priorities
            const priorityComparison = comparePriority(a.priority, b.priority);

            // If priorities are equal, compare categories
            if (priorityComparison === 0) {
                return compareCategory(a.category, b.category);
            }

            return priorityComparison;
        });

        // Render the sorted tasks
        tasks.forEach((task, index) => {
            const taskItem = createTaskElement(task, index);
            taskList.appendChild(taskItem);
        });
    }

    // Helper function to compare priorities
    function comparePriority(a, b) {
        const priorities = ['High', 'Medium', 'Low'];
        return priorities.indexOf(a) - priorities.indexOf(b);
    }

    // Helper function to compare categories
    function compareCategory(a, b) {
        const categories = ['Personal', 'Work', 'Errands'];
        return categories.indexOf(a) - categories.indexOf(b);
    }

    // Helper function to update task usage randomly
    function updateTaskUsage() {
        tasks.forEach((task) => {
            task.usage = Math.floor(Math.random() * 100) + 1; // Update usage with a new random value
        });

        renderTaskList(); // Re-render the task list with updated usage values
    }

    // Automatically update task usage every one second
    setInterval(updateTaskUsage, 1000);

    // Initial rendering of tasks
    renderTaskList();
});
