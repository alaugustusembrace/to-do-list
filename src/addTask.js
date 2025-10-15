const addTask = (taskItemIndex, currentProject, inputValue, listArea) => {
  const taskItem = document.createElement("li");
  taskItem.dataset.id = taskItemIndex;
  currentProject.tasks.push({ id: taskItemIndex, title: inputValue });
  const taskContainer = document.createElement("div");
  const removeTaskBtn = document.createElement("button");
  removeTaskBtn.textContent = "X";
  taskContainer.classList.add("taskContainer");
  taskContainer.textContent = inputValue;
  taskContainer.appendChild(removeTaskBtn);
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
