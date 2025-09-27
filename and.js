  // Step 1: Create an array of sample tasks
  // Each task is an object with: name, dueDate, and status
  let tasks = [
    { name: "Finish Assignment", dueDate: "2025-09-28", status: "Pending" },
    { name: "Buy groceries", dueDate: "2025-09-27", status: "Pending" },
    { name: "Go to the gym", dueDate: "2025-09-29", status: "Pending" },
    { name: "Call Mom", dueDate: "2025-09-26", status: "Pending" },
    { name: "Pay electricity bill", dueDate: "2025-09-30", status: "Pending" }
  ];

  // Step 2: Function to display tasks in the DOM
  function displayTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; // clear old content before adding new

    // Loop through all tasks and create HTML for each
    tasks.forEach((task, index) => {
      // Create a wrapper div for each task
      const taskDiv = document.createElement("div");
      taskDiv.className = "flex justify-between items-center border p-3 rounded";

      // Task info: name + due date + status
      taskDiv.innerHTML = `
        <div>
          <p class="font-medium">${task.name}</p>
          <p class="text-sm text-gray-500">Due: ${task.dueDate}</p>
          <p class="text-sm">Status: 
            <span class="${task.status === "Completed" ? "text-green-600" : "text-yellow-600"}">
              ${task.status}
            </span>
          </p>
        </div>
      `;

      taskList.appendChild(taskDiv); // add taskDiv inside taskList
    });
  }

  // Step 3: Call displayTasks() once when page loads
  displayTasks();



    // Step 4: Handle Form Submission (Adding New Task)
  const taskForm = document.getElementById("taskForm");

  // Listen when user submits the form
  taskForm.addEventListener("submit", function(event) {
    event.preventDefault(); 
    // preventDefault() stops page from refreshing (default form behavior)

    // Get values from inputs
    const taskNameInput = document.getElementById("taskName");
    const dueDateInput = document.getElementById("dueDate");

    const taskName = taskNameInput.value.trim(); // remove spaces
    const dueDate = dueDateInput.value;

    // Validation: Task name must not be empty
    if (taskName === "") {
      alert("Task name cannot be empty!");
      return;
    }

    // Create a new task object
    const newTask = {
      name: taskName,
      dueDate: dueDate || "No due date", // if user doesn't pick date
      status: "Pending"
    };

    // Add to tasks array
    tasks.push(newTask);

    // Re-render the task list
    displayTasks();

    // Clear the form
    taskNameInput.value = "";
    dueDateInput.value = "";
  });


//Add Delete Button in displayTasks()

    function displayTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; // clear old content before adding new

    tasks.forEach((task, index) => {
      const taskDiv = document.createElement("div");
      taskDiv.className = "flex justify-between items-center border p-3 rounded";

      // LEFT: Task info
      const taskInfo = `
        <div>
          <p class="font-medium">${task.name}</p>
          <p class="text-sm text-gray-500">Due: ${task.dueDate}</p>
          <p class="text-sm">Status: 
            <span class="${task.status === "Completed" ? "text-green-600" : "text-yellow-600"}">
              ${task.status}
            </span>
          </p>
        </div>
      `;

      // RIGHT: Action buttons (Delete now, others later)
      const taskActions = `
        <div class="flex gap-2">
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



  //Create the deleteTask() Function

    // Function to delete a task
  function deleteTask(index) {
    // Confirm before deleting
    const confirmDelete = confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    // Remove task from array using index
    tasks.splice(index, 1); // removes 1 item at position 'index'

    // Refresh task list
    displayTasks();
  }






  //Update displayTasks() with complete & incomplete , edit Buttons



  function displayTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = ""; // clear old content before adding new

  tasks.forEach((task, index) => {
    const taskDiv = document.createElement("div");
    taskDiv.className = "flex justify-between items-center border p-3 rounded";

    // LEFT: Task info (if completed → strike-through text)
    const taskInfo = `
      <div>
        <p class="font-medium ${task.status === "Completed" ? "line-through text-gray-500" : ""}">
          ${task.name}
        </p>
        <p class="text-sm text-gray-500">Due: ${task.dueDate}</p>
        <p class="text-sm">Status: 
          <span class="${task.status === "Completed" ? "text-green-600" : "text-yellow-600"}">
            ${task.status}
          </span>
        </p>
      </div>
    `;

    // RIGHT: Action buttons
    const taskActions = `
      <div class="flex gap-2">
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




//Add toggleStatus() Function

// Function to mark task as Complete / Pending

function toggleStatus(index) {
  // Toggle between "Pending" and "Completed"
  tasks[index].status = (tasks[index].status === "Pending") ? "Completed" : "Pending";

  // Refresh task list
  displayTasks();
}



//Add edit task function

// Function to edit a task

function editTask(index) {
  // Ask new name (default: current name)
  const newName = prompt("Edit task name:", tasks[index].name);
  if (newName === null || newName.trim() === "") return; // Cancel or empty

  // Ask new due date (default: current due date)
  const newDate = prompt("Edit due date (YYYY-MM-DD):", tasks[index].dueDate);
  if (newDate === null || newDate.trim() === "") return;

  // Update task
  tasks[index].name = newName.trim();
  tasks[index].dueDate = newDate;

  // Refresh list
  displayTasks();
}






