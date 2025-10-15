const addTask = (taskItemIndex, currentProject, inputValue, listArea) => {
  const taskItem = document.createElement("li");
  taskItem.dataset.id = taskItemIndex;
  currentProject.tasks.push({ id: taskItemIndex, title: inputValue });
  const taskContainer = document.createElement("div");
  taskContainer.classList.add("taskContainer");

  const taskBtnWrapper = document.createElement("div");
  taskBtnWrapper.classList.add("taskBtnWrapper");

  const checkTaskBtn = document.createElement("input");
  checkTaskBtn.classList.add("check-btn");
  checkTaskBtn.type = "checkbox";

  const removeTaskBtn = document.createElement("button");
  removeTaskBtn.classList.add("remove-btn");
  removeTaskBtn.textContent = "X";

  taskBtnWrapper.append(checkTaskBtn, removeTaskBtn);

  taskContainer.textContent = inputValue;
  taskContainer.appendChild(taskBtnWrapper);

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
