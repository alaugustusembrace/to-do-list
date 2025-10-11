import { Project } from "./project.js";

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

  const createProjectBtn = document.createElement("button");
  createProjectBtn.textContent = "Create Project";
  projectDialog.appendChild(createProjectBtn);

  createProjectBtn.addEventListener("click", () => {
    const newProject = new Project(
      projectTitleInput.value,
      projectDescriptionInput.value
    );

    projectTitle.textContent = newProject.title;
    projectDescription.textContent = newProject.description;

    newProjectDivision.appendChild(projectTitle);
    newProjectDivision.appendChild(projectDescription);
    projectWrapper.appendChild(newProjectDivision);
    projectDialog.close();

    newProjectDivision.addEventListener("click", () => {
      listArea.innerHTML = "";
    });
  });

  const closeModalBtn = document.createElement("button");
  closeModalBtn.textContent = "Close";
  projectDialog.appendChild(closeModalBtn);

  closeModalBtn.addEventListener("click", () => {
    projectDialog.close();
  });

  projectDialog.showModal();
};

export { createNewProject };
