let tasks = JSON.parse(localStorage.getItem("tasks")) || []

const input = document.querySelector(".task-input")
const button = document.querySelector(".add-btn")
const list = document.querySelector(".taskList")

renderTasks()

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

function updateUI() {
    saveTasks()
    renderTasks()
}

button.addEventListener("click", () => {
    const taskText = input.value

    if (taskText === "") return

    tasks.push({
        id: Date.now(),
        text: taskText,
        completed: false
    })
    updateUI()
    input.value = ""
})

function renderTasks() {
    list.innerHTML = ""

    tasks.forEach((task) => {
        const li = document.createElement("li")

        const checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        checkbox.checked = task.completed

        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked
            updateUI()
        })

        const span = document.createElement("span")
        span.textContent = task.text

        if (task.completed) {
            span.classList.add("completed")
        }

        const deleteBtn = document.createElement("button")

        const deleteIcon = document.createElement("img")
        deleteIcon.src = "icons/delete.png"
        deleteIcon.alt = "Delete task"

        deleteBtn.addEventListener("click", (e) => {
            e.stopPropagation()
            tasks = tasks.filter(t => t.id !== task.id)
            updateUI()
        })

        li.appendChild(checkbox)
        li.appendChild(span)
        li.appendChild(deleteBtn)
        deleteBtn.appendChild(deleteIcon)
        list.appendChild(li)
    })
}

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        button.click()
    }
})

document.querySelector(".clearCompleted").addEventListener("click", () => {
    tasks = tasks.filter(task => !task.completed)
    updateUI()
})