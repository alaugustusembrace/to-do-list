import { defaultProject } from "./project.js";

const createDefaultTasks = (listArea) => {
  let taskItemIndex = 0;
  for (const task of defaultProject.tasks) {
    taskItemIndex++;
    const taskItem = document.createElement("li");
    taskItem.dataset.id = taskItemIndex;
    const taskContainer = document.createElement("div");
    const removeTaskBtn = document.createElement("button");
    removeTaskBtn.classList.add("remove-btn");
    removeTaskBtn.textContent = "X";
    taskContainer.classList.add("taskContainer");

    taskContainer.textContent = task.text;
    taskContainer.appendChild(removeTaskBtn);
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
