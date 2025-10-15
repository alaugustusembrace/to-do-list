// import { createDefaultTasks } from "./defaultTasks.js";
import { createTaskInputAndBtn } from "./addTaskInputAndButton.js";
import { addTask } from "./addTask.js";

// const defaultTasks = createDefaultTasks;

// added content parameter 10/14/2025 7:17AM
const createDefaultProject = (
  taskItemIndex,
  title,
  description,
  listArea,
  content,
  currentProject
) => {
  const projectDivision = document.createElement("button");
  projectDivision.classList.add("projectDivision");
  const projectTitle = document.createElement("h2");
  const projectDescription = document.createElement("p");
  projectTitle.textContent = title;
  projectDescription.textContent = description;
  projectDivision.appendChild(projectTitle);
  projectDivision.appendChild(projectDescription);

  const { addTaskBtn, addTaskInput } = createTaskInputAndBtn(content);

  addTaskBtn.addEventListener("click", () => {
    taskItemIndex++;
    addTask(taskItemIndex, currentProject, addTaskInput.value, listArea);
  });

  // Clearing the listArea then Assigning its respective lists
  let clickCounter = 0;
  projectDivision.addEventListener("click", () => {
    listArea.innerHTML = "";

    const oldWrapper = document.querySelector(".taskInputWrapper");
    if (oldWrapper) oldWrapper.remove();

    const { addTaskBtn, addTaskInput } = createTaskInputAndBtn(content);

    let taskItemIndex = 0;

    for (const task of currentProject.tasks) {
      taskItemIndex++;
      const taskItem = document.createElement("li");
      taskItem.dataset.id = taskItemIndex;
      const taskContainer = document.createElement("div");
      const removeTaskBtn = document.createElement("button");
      removeTaskBtn.classList.add("remove-btn");
      removeTaskBtn.textContent = "X";
      taskContainer.classList.add("taskContainer");

      taskContainer.textContent = task.title;
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

    addTaskBtn.addEventListener("click", () => {
      taskItemIndex++;
      addTask(taskItemIndex, currentProject, addTaskInput.value, listArea);
    });
  });

  return { projectDivision };
};

export { createDefaultProject };
