$(document).ready(function () {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function renderTasks() {
        $("#taskList").empty();
        tasks.forEach((task, index) => {
            $("#taskList").append(`
                <li class="list-group-item">
                    <span class="task-text">${task}</span>
                    <div>
                        <button class="btn btn-warning btn-sm edit-task" data-index="${index}">Edit</button>
                        <button class="btn btn-danger btn-sm delete-task" data-index="${index}">Delete</button>
                    </div>
                </li>
            `);
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    $("#addTask").click(function () {
        let taskText = $("#taskInput").val().trim();
        if (taskText) {
            tasks.push(taskText);
            $("#taskInput").val("");
            renderTasks();
        }
    });

    $(document).on("click", ".delete-task", function () {
        let index = $(this).data("index");
        tasks.splice(index, 1);
        renderTasks();
    });

    $(document).on("click", ".edit-task", function () {
        let index = $(this).data("index");
        let newTask = prompt("Edit Task:", tasks[index]);
        if (newTask !== null && newTask.trim() !== "") {
            tasks[index] = newTask.trim();
            renderTasks();
        }
    });

    renderTasks();
});
