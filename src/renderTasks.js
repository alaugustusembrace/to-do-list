const renderTasks = (currentProject, listArea, taskItemIndex, inputValue) => {
  listArea.innerHTML = "";
  for (const task of currentProject.tasks) {
    const taskItem = document.createElement("li");
    taskItem.dataset.id = taskItemIndex;
    currentProject.tasks.push({ id: taskItemIndex, text: inputValue });
    const taskContainer = document.createElement("div");
    const removeTaskBtn = document.createElement("button");
    removeTaskBtn.textContent = "X";
    taskContainer.classList.add("taskContainer");
    taskContainer.textContent = task;
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
  }
};

export { renderTasks };
