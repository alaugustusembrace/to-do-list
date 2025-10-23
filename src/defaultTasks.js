import { defaultProject } from "./project.js";

const createDefaultTasks = (listArea) => {
  let taskItemIndex = 0;

  for (const task of defaultProject.tasks) {
    const randomDifficulty = Math.floor(Math.random() * 10);

    taskItemIndex++;
    const taskItem = document.createElement("li");
    taskItem.dataset.id = taskItemIndex;
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
      case "Study":
        priority.textContent = task.priority.toUpperCase();
        priorityWrapper.style.backgroundColor = "red";
        break;
      case "Sleep":
        priority.textContent = task.priority.toUpperCase();
        priorityWrapper.style.backgroundColor = "red";
        break;
      case "Eat":
        priority.textContent = task.priority.toUpperCase();
        priorityWrapper.style.backgroundColor = "yellow";
        break;
      case "Exercise":
        priority.textContent = task.priority.toUpperCase();
        priorityWrapper.style.backgroundColor = "yellow";
        break;
      case "Run":
        priority.textContent = task.priority.toUpperCase();
        priorityWrapper.style.backgroundColor = "green";
        break;
    }

    taskPriorityWrapper.append(priorityHeading, priorityWrapper);

    const taskDateAndPriorityWrapper = document.createElement("div");
    taskDateAndPriorityWrapper.classList.add("taskDateAndPriorityWrapper");

    const taskDate = document.createElement("p");
    taskDate.classList.add("taskDate");
    taskDate.textContent = "Due Date: " + task.dueDate;

    // const taskPriority = document.createElement("p");
    // taskDate.classList.add("taskPriority");
    // taskPriority.textContent = "Priority: " + task.priority;

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
      taskTitle.style.textDecoration = e.target.checked
        ? "line-through"
        : "none";
      taskTitle.style.textDecorationThickness = "3px";
    });

    const removeTaskBtn = document.createElement("button");
    removeTaskBtn.classList.add("remove-btn");
    removeTaskBtn.textContent = "X";

    const editButton = document.createElement("button");
    editButton.classList.add("editButton");
    editButton.textContent = "edit";

    editButton.addEventListener("click", () => {
      const editModal = document.createElement("dialog");
      editModal.classList.add("editModal");

      const editTasksWrapper = document.createElement("div");
      editTasksWrapper.classList.add("editTaskWrapper");

      const editModalHeader = document.createElement("h2");
      editModalHeader.classList.add("editModalHeader");
      editModalHeader.textContent = "Edit Task";

      const editTitleAndDescWrapper = document.createElement("div");
      editTitleAndDescWrapper.classList.add("editTitleAndDescWrapper");

      const editTaskTitle = document.createElement("input");
      editTaskTitle.classList.add("editTaskTitle");
      editTaskTitle.placeholder = "Task Title";

      const editTaskDescription = document.createElement("input");
      editTaskTitle.classList.add("editTaskDescription");
      editTaskDescription.placeholder = "Task Description...";

      editTitleAndDescWrapper.append(editTaskTitle, editTaskDescription);

      const editDateAndDateLabebl = document.createElement("div");
      editDateAndDateLabebl.classList.add("editDateAndDateLabebl");

      const editTaskDate = document.createElement("input");
      editTaskTitle.id = "date";
      editTaskDate.type = "date";

      const editTaskDateLabel = document.createElement("label");
      editTaskDateLabel.htmlFor = "date";
      editTaskDateLabel.textContent = "Due Date:";

      editDateAndDateLabebl.append(editTaskDateLabel, editTaskDate);

      const editTaskPriority = document.createElement("select");
      editTaskPriority.id = "edit-priority";

      const editTaskPriorityLabel = document.createElement("label");
      editTaskPriorityLabel.classList.add("editTaskPriorityLabel");
      editTaskPriorityLabel.htmlFor = "edit-priority";
      editTaskPriorityLabel.textContent = "Priority: ";

      for (let i = 1; i <= 3; i++) {
        if (i === 1) {
          const editPriorityOption = document.createElement("option");
          editPriorityOption.value = "low";
          editPriorityOption.textContent = "LOW";
          editTaskPriority.appendChild(editPriorityOption);
        } else if (i === 2) {
          const editPriorityOption = document.createElement("option");
          editPriorityOption.value = "medium";
          editPriorityOption.textContent = "MEDIUM";
          editTaskPriority.appendChild(editPriorityOption);
        } else if (i === 3) {
          const editPriorityOption = document.createElement("option");
          editPriorityOption.value = "high";
          editPriorityOption.textContent = "HIGH";
          editTaskPriority.appendChild(editPriorityOption);
        }
      }

      editTasksWrapper.append(
        editTitleAndDescWrapper,
        editDateAndDateLabebl,
        editTaskPriorityLabel,
        editTaskPriority
      );

      editModal.append(editModalHeader, editTasksWrapper);

      content.appendChild(editModal);

      editModal.showModal();
    });

    editWrapper.appendChild(editButton);

    checkAndRemoveBtnWrapper.append(removeTaskBtn, checkTaskBtn);

    taskTitleAndDescWrapper.append(taskTitle, taskDescription);
    // taskDateAndPriorityWrapper.append(taskDate, taskPriority);

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
        (item) => item.id !== Number(listItem.dataset.id)
      );

      listItem.remove();
    });
  }
  return { taskItemIndex };
};

export { createDefaultTasks };
export const getTaskItemIndex = () => taskItemIndex;
export const setTaskItemIndex = () => (taskItemIndex = val);
