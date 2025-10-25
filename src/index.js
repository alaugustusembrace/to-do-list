import "./styles.css";
import { createBaseContent } from "./baseContent.js";
import { createDefaultProject } from "./defaultProject.js";
import { defaultProject, Project } from "./project.js";
import { createDefaultTasks } from "./defaultTasks.js";

const { content, project, projectWrapper, listAreaWrapper, listArea } =
  createBaseContent();

// Creating Default Tasks
let { taskItemIndex } = createDefaultTasks(listArea);

// Creating Default Project
const { projectDivision } = createDefaultProject(
  taskItemIndex,
  defaultProject.title,
  // defaultProject.description,
  listArea,
  content,
  defaultProject,
  listAreaWrapper
);
projectWrapper.appendChild(projectDivision);
