let input = document.querySelector(".input")
let submit = document.querySelector(".add")
let tasksDiv = document.querySelector(".tasks")

// Empty array to add tasks
let arrayOfTasks = [];

// check if there is tasks in local storage
if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"))
}

getDataFromLocalStorage()

// add task
submit.onclick = function (e) {
    if (input.value !== "") {
        addTaskToArray(input.value);
        input.value = "";
    }
}

// click on task element
tasksDiv.addEventListener("click", (e) => {
    // Delete button
    if (e.target.classList.contains("del")) {
        // remove task from local storage
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"))
        // remove element from page
        e.target.parentElement.remove()
    }
    // Task Element
    if (e.target.classList.contains("task")) {
        // Toggle completed for the task
        toggleStatusTaskWith(e.target.getAttribute("data-id"))
        // Toggle done class
        e.target.classList.toggle("done")
    }
})

function addTaskToArray (taskText) {
    let randomNum = Math.ceil(Math.random() * 99999)
    // task data
    const task = {
        id: randomNum,
        title: taskText,
        completed: false,
    }
    // push task to the array
    arrayOfTasks.push(task)
    // Add tasks to page
    addElementsToPageFrom(arrayOfTasks)
    // Add tasks to local storage
    addDataToLocalStorageFrom(arrayOfTasks)
}

function addElementsToPageFrom(arrayOfTasks) {
    // Empty tasks div
    tasksDiv.innerHTML = "";
    // looping on array of tasks
    arrayOfTasks.forEach ((task) => {
        // creat the element
        let div = document.createElement("div");
        div.className = "task";
        if (task.completed === true) {
            div.className = "task done"
        }
        div.setAttribute("data-id", task.id)
        div.appendChild(document.createTextNode(task.title))
        let span = document.createElement("span");
        span.className = "del"
        span.appendChild(document.createTextNode("Delete"))
        div.appendChild(span)
        // Add the element to the tasks div
        tasksDiv.appendChild(div)
    })
}

function addDataToLocalStorageFrom(arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks))
}

function getDataFromLocalStorage () {
    let data = window.localStorage.getItem("tasks")
    if (data) {
        let tasks = JSON.parse(data)
        addElementsToPageFrom(tasks)
    }
}

function deleteTaskWith(taskId) {
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId)
    addDataToLocalStorageFrom(arrayOfTasks)
}

function toggleStatusTaskWith (taskId) {
    for (i = 0 ; i < arrayOfTasks.length ; i++) {
        if (arrayOfTasks[i].id == taskId) {
            if (arrayOfTasks[i].completed == false) {
                arrayOfTasks[i].completed = true
            } else {
                arrayOfTasks[i].completed = false
            }
        }
    }
    addDataToLocalStorageFrom(arrayOfTasks)
}