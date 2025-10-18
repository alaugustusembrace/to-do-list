import { defaultProject } from "./project.js";

const createDefaultTasks = (listArea) => {
  let taskItemIndex = 0;
  for (const task of defaultProject.tasks) {
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

    const taskDateAndPriorityWrapper = document.createElement("div");
    taskDateAndPriorityWrapper.classList.add("taskDateAndPriorityWrapper");

    const taskDate = document.createElement("p");
    taskDate.classList.add("taskDate");
    taskDate.textContent = "Due Date: " + task.dueDate;

    const taskPriority = document.createElement("p");
    taskDate.classList.add("taskPriority");
    taskPriority.textContent = "Priority: " + task.priority;

    const taskBtnWrapper = document.createElement("div");
    taskBtnWrapper.classList.add("taskBtnWrapper");

    const checkAndRemoveBtnWrapper = document.createElement("div");
    checkAndRemoveBtnWrapper.classList.add("checkAndRemoveBtnWrapper");

    const editWrapper = document.createElement("div");
    editWrapper.classList.add("editWrapper");

    const checkTaskBtn = document.createElement("input");
    checkTaskBtn.classList.add("check-btn");
    checkTaskBtn.type = "checkbox";

    const removeTaskBtn = document.createElement("button");
    removeTaskBtn.classList.add("remove-btn");
    removeTaskBtn.textContent = "X";

    const editButton = document.createElement("button");
    editButton.classList.add("editButton");
    editButton.textContent = "edit";

    editWrapper.appendChild(editButton);

    checkAndRemoveBtnWrapper.append(checkTaskBtn, removeTaskBtn);

    taskTitleAndDescWrapper.append(taskTitle, taskDescription);
    taskDateAndPriorityWrapper.append(taskDate, taskPriority);

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
