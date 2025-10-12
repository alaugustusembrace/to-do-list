const createBaseContent = () => {
  const content = document.getElementById("content");

  const projectContainer = document.createElement("div");
  projectContainer.classList.add("projectContainer");

  const project = document.createElement("div");
  project.classList.add("project");

  const projectWrapper = document.createElement("div");
  projectWrapper.classList.add("projectWrapper");

  const listAreaWrapper = document.createElement("div");
  listAreaWrapper.classList.add("listAreaWrapper");

  const listArea = document.createElement("ul");
  listArea.classList.add("listArea");

  listAreaWrapper.appendChild(listArea);
  project.append(projectWrapper, listAreaWrapper);
  projectContainer.appendChild(project);
  content.appendChild(projectContainer);

  return {
    content,
    projectContainer,
    projectWrapper,
    listAreaWrapper,
    listArea,
  };
};

export { createBaseContent };
