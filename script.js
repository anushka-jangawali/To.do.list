const taskCount = document.getElementById("taskCount");
const input = document.getElementById("taskInput");
const button = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function displayTasks() {

    taskList.innerHTML = "";

    taskCount.textContent = tasks.length + " tasks";

    tasks.forEach(function(taskData, index) {

        const task = document.createElement("li");

        const taskTextElement = document.createElement("span");
        taskTextElement.textContent = taskData.text;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function() {

            tasks.splice(index, 1);

            localStorage.setItem("tasks", JSON.stringify(tasks));

            displayTasks();
        });

        task.appendChild(taskTextElement);
        task.appendChild(deleteButton);

        taskList.appendChild(task);
    });
}

button.addEventListener("click", function() {

    const taskText = input.value.trim();

    if (taskText !== "") {

        const taskData = {
            text: taskText
        };

        tasks.push(taskData);

        localStorage.setItem("tasks", JSON.stringify(tasks));

        displayTasks();

        input.value = "";
    }
});

input.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        button.click();
    }
});

displayTasks();