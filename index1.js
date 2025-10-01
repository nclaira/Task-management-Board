// Sample tasks
let tasks = [
  { name: "watch movie", dueDate: "2025-09-28", status: "Pending" },
  { name: "Call my friend", dueDate: "2025-09-27", status: "Pending" },
  { name: "Go to the gym", dueDate: "2025-09-29", status: "Completed" },
  { name: "Call Mom", dueDate: "2025-09-26", status: "Pending" },
  { name: "Pay electricity bill", dueDate: "2025-09-30", status: "Deleted" }
];


// filter function

function filterTasks() {
  const filterValue = document.getElementById("filterSelect").value;

  if (filterValue === "all") {
    // Show everything except deleted
    return tasks.filter(task => task.status !== "Deleted");
  }
  if (filterValue === "completed") {
    return tasks.filter(task => task.status === "Completed");
  }
  if (filterValue === "deleted") {
    return tasks.filter(task => task.status === "Deleted");
  }
  return tasks; // fallback
}


// display function
function displayTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = ""; // Clear old tasks

  // Apply the filter
  const filtered = filterTasks();

  // Render filtered tasks
  filtered.forEach((task, index) => {
    const taskDiv = document.createElement("div");
    taskDiv.className = "flex justify-between items-center border p-3 rounded";

    // LEFT SIDE: task details
    const taskInfo = `
      <div>
        <p class="font-medium ${task.status === "Completed" ? "line-through text-gray-500" : ""}">
          ${task.name}
        </p>
        <p class="text-sm text-gray-500">Due: ${task.dueDate}</p>
        <p class="text-sm">Status: 
          <span class="${task.status === "Completed" ? "text-green-600" : task.status === "Deleted" ? "text-red-600" : "text-yellow-600"}">
            ${task.status}
          </span>
        </p>
      </div>
    `;

    // RIGHT SIDE: action buttons
    const taskActions = `
      <div class="flex flex-col md:flex-row gap-2 ">
        <button onclick="toggleStatus(${index})" 
          class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
          ${task.status === "Completed" ? "Mark Pending" : "Mark Complete"}
        </button>

        <button onclick="editTask(${index})" 
          class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
          Edit
        </button>

        <button onclick="deleteTask(${index})" 
          class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
          Delete
        </button>
      </div>
    `;

    taskDiv.innerHTML = taskInfo + taskActions;
    taskList.appendChild(taskDiv);
  });
}



// add new task
const taskForm = document.getElementById("taskForm");
taskForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const taskNameInput = document.getElementById("taskName");
  const dueDateInput = document.getElementById("dueDate");

  const taskName = taskNameInput.value.trim();
  const dueDate = dueDateInput.value;

  if (taskName === "") {
    alert("Task name cannot be empty!");
    return;
  }

  const newTask = {
    name: taskName,
    dueDate: dueDate || "No due date",
    status: "Pending"
  };

  tasks.push(newTask);

  displayTasks();
  taskNameInput.value = "";
  dueDateInput.value = "";
});


// delete task
function deleteTask(index) {
  const confirmDelete = confirm("Are you sure you want to delete this task?");
  if (!confirmDelete) return;

  tasks[index].status = "Deleted"; // mark as deleted instead of removing

  displayTasks();
}


// toggle status 
function toggleStatus(index) {
  if (tasks[index].status === "Completed") {
    tasks[index].status = "Pending";
  } else {
    tasks[index].status = "Completed";
  }
  displayTasks();
}


// edit task
 
function editTask(index) {
  const newName = prompt("Edit task name:", tasks[index].name);
  if (newName === null || newName.trim() === "") return;

  const newDate = prompt("Edit due date (YYYY-MM-DD):", tasks[index].dueDate);
  if (newDate === null || newDate.trim() === "") return;

  tasks[index].name = newName.trim();
  tasks[index].dueDate = newDate;

  displayTasks();
}


// event listener for filter
document.getElementById("filterSelect").addEventListener("change", displayTasks);


// initial render
displayTasks();
