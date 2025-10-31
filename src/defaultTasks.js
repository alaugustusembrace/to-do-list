import { defaultProject } from "./project.js";
import { editButtonModal } from "./editButton.js";

const createDefaultTasks = (listArea, content) => {
  for (const task of defaultProject.tasks) {
    const taskItem = document.createElement("li");
    taskItem.classList.add("taskItem");
    taskItem.dataset.id = task.id;

    const taskContainer = document.createElement("div");
    taskContainer.classList.add("taskContainer");

    const taskWrapper = document.createElement("div");
    taskWrapper.classList.add("taskWrapper");

    const taskTitleAndDescWrapper = document.createElement("div");
    taskTitleAndDescWrapper.classList.add("taskTitleAndDescWrapper");

    const taskTitle = document.createElement("h3");
    taskTitle.classList.add("taskTitle");
    taskTitle.textContent = task.title;

    const taskDescription = document.createElement("p");
    taskDescription.classList.add("taskDescription");
    taskDescription.textContent = task.description;

    // /*
    const taskPriorityWrapper = document.createElement("div");
    taskPriorityWrapper.classList.add("taskPriorityWrapper");

    const priorityHeading = document.createElement("h4");
    priorityHeading.classList.add("priorityHeading");

    priorityHeading.textContent = "Priority";

    const priority = document.createElement("h5");
    priority.classList.add("priority");

    const priorityWrapper = document.createElement("div");
    priorityWrapper.classList.add("priorityWrapper");

    priorityWrapper.appendChild(priority);

    switch (task.title) {
      case "Capture Saddam Hussein":
        priority.textContent = task.priority.toUpperCase();
        priorityWrapper.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
        break;
      case "Fix the bug":
        priority.textContent = task.priority.toUpperCase();
        priorityWrapper.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
        break;
      case "Hiking":
        priority.textContent = task.priority.toUpperCase();
        priorityWrapper.style.backgroundColor = "rgba(255, 255, 0, 0.5)";
        break;
      case "Attend the meeting":
        priority.textContent = task.priority.toUpperCase();
        priorityWrapper.style.backgroundColor = "rgba(255, 255, 0, 0.5)";
        break;
      case "Join the seminar":
        priority.textContent = task.priority.toUpperCase();
        priorityWrapper.style.backgroundColor = "rgba(0, 255, 0, 0.5)";
        break;
    }

    taskPriorityWrapper.append(priorityHeading, priorityWrapper);

    const taskDateAndPriorityWrapper = document.createElement("div");
    taskDateAndPriorityWrapper.classList.add("taskDateAndPriorityWrapper");

    const taskDate = document.createElement("p");
    taskDate.classList.add("taskDate");
    taskDate.textContent = "Due Date: " + task.dueDate;

    const taskBtnWrapper = document.createElement("div");
    taskBtnWrapper.classList.add("taskBtnWrapper");

    const checkAndRemoveBtnWrapper = document.createElement("div");
    checkAndRemoveBtnWrapper.classList.add("checkAndRemoveBtnWrapper");

    const editWrapper = document.createElement("div");
    editWrapper.classList.add("editWrapper");

    const checkTaskBtn = document.createElement("input");
    checkTaskBtn.classList.add("check-btn");
    checkTaskBtn.type = "checkbox";

    checkTaskBtn.addEventListener("click", (e) => {
      if (e.target.checked) {
        taskTitle.style.textDecoration = "line-through";
        task.completed = true;
      } else {
        taskTitle.style.textDecoration = "none";
        task.completed = false;
      }
      taskTitle.style.textDecorationThickness = "3px";
    });

    const removeTaskBtn = document.createElement("button");
    removeTaskBtn.classList.add("remove-btn");
    removeTaskBtn.textContent = "X";

    const editButton = document.createElement("button");
    editButton.classList.add("editButton");
    editButton.textContent = "EDIT";

    // to edit task
    taskWrapper.dataset.id = task.id;

    editButton.addEventListener("click", () => {
      editButtonModal(taskWrapper.dataset.id, defaultProject, content);
    });

    editWrapper.appendChild(editButton);

    checkAndRemoveBtnWrapper.append(removeTaskBtn, checkTaskBtn);

    taskTitleAndDescWrapper.append(taskTitle, taskDescription);

    taskDateAndPriorityWrapper.append(taskDate, taskPriorityWrapper);

    taskWrapper.append(taskTitleAndDescWrapper, taskDateAndPriorityWrapper);

    taskBtnWrapper.append(checkAndRemoveBtnWrapper, editWrapper);

    taskContainer.append(taskWrapper, taskBtnWrapper);

    taskItem.appendChild(taskContainer);

    listArea.appendChild(taskItem);

    // Remove task
    removeTaskBtn.addEventListener("click", (e) => {
      const listItem = e.target.closest("li");
      defaultProject.tasks = defaultProject.tasks.filter(
        (item) => String(item.id) !== String(listItem.dataset.id),
      );

      listItem.remove();
    });

    fetch("http://localhost:5000/api/tasks", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        priority: task.priority,
        completed: false,
      }),
    });
  }
};

export { createDefaultTasks };
