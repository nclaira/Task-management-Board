//Create an array of sample tasks
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
    taskList.innerHTML = "";   // clear old content before adding new


     // Loop through all tasks and create HTML for each
    tasks.forEach((task, index) => {
      // Create a wrapper div for each task
      const taskDiv = document.createElement("div");
      taskDiv.className = "flex justify-between items-center border p-3 rounded";

      // Task info: name + due date + status
      taskDiv.innerHTML = `                                      //embed variables or write multi-line text,backtick is better
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

