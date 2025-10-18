import { parseISO, format } from "date-fns";

const addTask = (
  taskItemIndex,
  currentProject /* , inputValue */,
  listArea,
  taskTitleValue,
  taskDescriptionValue,
  taskDateValue,
  taskPriorityValue
) => {
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

  // const isoDate = taskDateValue;
  // const newDate = parseISO(isoDate);
  // const formattedTaskDateValue = format(newDate, "MMMM dd, yyyy");

  const taskDate = document.createElement("p");
  taskDate.classList.add("taskDate");
  taskDate.textContent = "Due Date: " + taskDateValue;

  const taskPriority = document.createElement("p");
  taskDate.classList.add("taskPriority");
  taskPriority.textContent = "Priority: " + taskPriorityValue;

  const taskBtnWrapper = document.createElement("div");
  taskBtnWrapper.classList.add("taskBtnWrapper");

  const checkAndRemoveBtnWrapper = document.createElement("div");
  checkAndRemoveBtnWrapper.classList.add("checkAndRemoveBtnWrapper");

  const checkTaskBtn = document.createElement("input");
  checkTaskBtn.classList.add("check-btn");
  checkTaskBtn.type = "checkbox";

  const removeTaskBtn = document.createElement("button");
  removeTaskBtn.classList.add("remove-btn");
  removeTaskBtn.textContent = "X";

  const editWrapper = document.createElement("div");
  editWrapper.classList.add("editWrapper");

  const editButton = document.createElement("button");
  editButton.classList.add("editButton");
  editButton.textContent = "Edit";

  checkAndRemoveBtnWrapper.append(checkTaskBtn, removeTaskBtn);

  editWrapper.appendChild(editButton);

  taskBtnWrapper.append(checkAndRemoveBtnWrapper, editWrapper);

  taskTitleAndDescWrapper.append(taskTitle, taskDescription);
  taskDateAndPriorityWrapper.append(taskDate, taskPriority);

  taskWrapper.append(taskTitleAndDescWrapper, taskDateAndPriorityWrapper);

  taskContainer.append(taskWrapper, taskBtnWrapper);

  taskItem.appendChild(taskContainer);

  listArea.appendChild(taskItem);

  // Remove task
  removeTaskBtn.addEventListener("click", (e) => {
    const listItem = e.target.closest("li");
    currentProject.tasks = currentProject.tasks.filter(
      (item) => item.id !== Number(listItem.dataset.id)
    );
    listItem.remove();
  });
};

export { addTask };
