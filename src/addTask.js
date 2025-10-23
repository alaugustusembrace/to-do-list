import { parseISO, format } from "date-fns";

const addTask = (
  taskItemIndex,
  currentProject,
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
    priorityWrapper.style.backgroundColor = "green";
  } else if (taskPriorityValue === "medium") {
    priority.textContent = "MEDIUM";
    priorityWrapper.style.backgroundColor = "yellow";
  } else {
    priority.textContent = "HIGH";
    priorityWrapper.style.backgroundColor = "red";
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

  checkTaskBtn.addEventListener("click", (e) => {
    taskTitle.style.textDecoration = e.target.checked ? "line-through" : "none";
    taskTitle.style.textDecorationThickness = "3px";
  });

  const editWrapper = document.createElement("div");
  editWrapper.classList.add("editWrapper");

  const editButton = document.createElement("button");
  editButton.classList.add("editButton");
  editButton.textContent = "Edit";

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
  removeTaskBtn.addEventListener("click", (e) => {
    const listItem = e.target.closest("li");
    currentProject.tasks = currentProject.tasks.filter(
      (item) => item.id !== Number(listItem.dataset.id)
    );
    listItem.remove();
  });
};

export { addTask };
