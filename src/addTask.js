import { editButtonModal } from "./editButton.js";
// import { parseISO, format } from "date-fns";

const addTask = async (
  taskItemIndex,
  currentProject,
  listArea,
  taskTitleValue,
  taskDescriptionValue,
  taskDateValue,
  taskPriorityValue,
  // id,   REMEMBER THIS!
) => {
  fetch("http://localhost:5000/api/defaultProject/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: taskTitleValue,
      description: taskDescriptionValue,
      dueDate: taskDateValue,
      priority: taskPriorityValue,
      completed: false,
    }),
  });

  // taskDateValue = parseISO(taskDateValue);
  // taskDateValue = format(taskDateValue, "MMMM dd, yyyy");

  const taskItem = document.createElement("li");
  taskItem.dataset.id = taskItemIndex;
  currentProject.tasks.push({
    id: taskItemIndex,
    title: taskTitleValue,
    description: taskDescriptionValue,
    dueDate: taskDateValue,
    priority: taskPriorityValue,
  });

  const taskContainer = document.createElement("div");
  taskContainer.classList.add("taskContainer");

  const taskWrapper = document.createElement("div");
  taskWrapper.classList.add("taskWrapper");

  const taskTitleAndDescWrapper = document.createElement("div");
  taskTitleAndDescWrapper.classList.add("taskTitleAndDescWrapper");

  const taskDateAndPriorityWrapper = document.createElement("div");
  taskDateAndPriorityWrapper.classList.add("taskDateAndPriorityWrapper");

  const taskTitle = document.createElement("h3");
  taskTitle.classList.add("taskTitle");
  taskTitle.textContent = taskTitleValue;

  const taskDescription = document.createElement("p");
  taskDescription.classList.add("taskDescription");
  taskDescription.textContent = taskDescriptionValue;

  const taskDate = document.createElement("p");
  taskDate.classList.add("taskDate");
  taskDate.textContent = "Due Date: " + taskDateValue;

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

  if (taskPriorityValue === "low") {
    priority.textContent = "LOW";
    priorityWrapper.style.backgroundColor = "rgba(0, 255, 0, 0.5)";
  } else if (taskPriorityValue === "medium") {
    priority.textContent = "MEDIUM";
    priorityWrapper.style.backgroundColor = "rgba(255, 255, 0, 0.5)";
  } else {
    priority.textContent = "HIGH";
    priorityWrapper.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
  }

  taskPriorityWrapper.append(priorityHeading, priorityWrapper);

  const taskBtnWrapper = document.createElement("div");
  taskBtnWrapper.classList.add("taskBtnWrapper");

  const checkAndRemoveBtnWrapper = document.createElement("div");
  checkAndRemoveBtnWrapper.classList.add("checkAndRemoveBtnWrapper");

  const removeTaskBtn = document.createElement("button");
  removeTaskBtn.classList.add("remove-btn");
  removeTaskBtn.textContent = "X";

  const checkTaskBtn = document.createElement("input");
  checkTaskBtn.classList.add("check-btn");
  checkTaskBtn.type = "checkbox";

  const res = await fetch("http://localhost:5000/api/defaultProject/tasks");
  let tasks = await res.json();

  for (const task of tasks) {
    if (task.completed) {
      checkTaskBtn.checked = true;
      taskTitle.style.textDecoration = "line-through";
      taskTitle.style.textDecorationThickness = "3px";
    }

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
  }

  const editWrapper = document.createElement("div");
  editWrapper.classList.add("editWrapper");

  const editButton = document.createElement("button");
  editButton.classList.add("editButton");
  editButton.textContent = "EDIT";

  // to edit task

  for (const task of tasks) {
    taskWrapper.dataset.id = task._id;

    editButton.addEventListener("click", () => {
      editButtonModal(taskWrapper.dataset.id, currentProject);
    });
  }

  checkAndRemoveBtnWrapper.append(removeTaskBtn, checkTaskBtn);

  editWrapper.appendChild(editButton);

  taskBtnWrapper.append(checkAndRemoveBtnWrapper, editWrapper);

  taskTitleAndDescWrapper.append(taskTitle, taskDescription);
  taskDateAndPriorityWrapper.append(taskDate, taskPriorityWrapper);

  taskWrapper.append(taskTitleAndDescWrapper, taskDateAndPriorityWrapper);

  taskContainer.append(taskWrapper, taskBtnWrapper);

  taskItem.appendChild(taskContainer);

  listArea.appendChild(taskItem);

  // Remove task
  // const res = await fetch("http://localhost:5000/api/defaultProject/tasks");
  // let tasks = await res.json();

  for (const task of tasks) {
    removeTaskBtn.addEventListener("click", (e) => {
      const listItem = e.target.closest("li");

      tasks = tasks.filter(
        (item) => String(item._id) !== String(listItem.dataset.id),
      );

      fetch(`http://localhost:5000/api/defaultProject/tasks/${task._id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .catch((err) => console.log(err));

      listItem.remove();
    });
  }
};

export { addTask };
