import { Project } from "./project.js";
import { createTaskInputAndBtn } from "./addTaskInputAndButton.js";
import { addTask } from "./addTask.js";

const createNewProject = (projectWrapper, listArea) => {
  const newProjectDivision = document.createElement("button");
  newProjectDivision.classList.add("newProjectDivision");
  const projectTitle = document.createElement("h2");
  const projectDescription = document.createElement("p");

  const projectDialog = document.createElement("dialog");
  projectDialog.classList.add("project-dialog");
  const projectTitleInput = document.createElement("input");
  projectTitleInput.classList.add("title-input");
  const projectDescriptionInput = document.createElement("input");
  projectDescriptionInput.classList.add("desc-input");

  const projectDialogHeader = document.createElement("h2");
  projectDialogHeader.textContent = "New Project";

  projectTitleInput.placeholder = "Project Title";
  projectDescriptionInput.placeholder = "Project Description";

  projectDialog.appendChild(projectDialogHeader);
  projectDialog.appendChild(projectTitleInput);
  projectDialog.appendChild(projectDescriptionInput);
  content.appendChild(projectDialog);
  projectDialog.showModal();

  const createProjectBtn = document.createElement("button");
  createProjectBtn.textContent = "Create Project";
  projectDialog.appendChild(createProjectBtn);

  createProjectBtn.addEventListener("click", () => {
    const currentProject = new Project(
      projectTitleInput.value,
      projectDescriptionInput.value
    );

    projectTitle.textContent = currentProject.title;
    projectDescription.textContent = currentProject.description;

    newProjectDivision.appendChild(projectTitle);
    newProjectDivision.appendChild(projectDescription);
    projectWrapper.appendChild(newProjectDivision);
    projectDialog.close();

    // Clearing the listArea for new project
    let clickCounter = 0;
    newProjectDivision.addEventListener("click", () => {
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
        removeTaskBtn.classList.add("removeTaskBtn");
        removeTaskBtn.textContent = "X";
        taskContainer.classList.add("taskContainer");

        taskContainer.textContent = task.text;
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
  });

  const closeModalBtn = document.createElement("button");
  closeModalBtn.textContent = "Close";
  projectDialog.appendChild(closeModalBtn);

  closeModalBtn.addEventListener("click", () => {
    projectDialog.close();
  });
};

export { createNewProject };
