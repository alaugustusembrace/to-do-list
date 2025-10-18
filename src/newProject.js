import { Project } from "./project.js";
import { createTaskInputAndBtn } from "./addTaskInputAndButton.js";
import { addTask } from "./addTask.js";
import { parseISO, format } from "date-fns";

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
        taskContainer.classList.add("taskContainer");

        const taskWrapper = document.createElement("div");
        taskWrapper.classList.add("taskWrapper");

        const taskTitleAndDescWrapper = document.createElement("div");
        taskTitleAndDescWrapper.classList.add("taskTitleAndDescWrapper");

        const taskDateAndPriorityWrapper = document.createElement("div");
        taskDateAndPriorityWrapper.classList.add("taskDateAndPriorityWrapper");

        const taskBtnWrapper = document.createElement("div");
        taskBtnWrapper.classList.add("taskBtnWrapper");

        const checkAndRemoveBtnWrapper = document.createElement("div");
        checkAndRemoveBtnWrapper.classList.add("checkAndRemoveBtnWrapper");

        const editWrapper = document.createElement("div");
        editWrapper.classList.add("editWrapper");

        const taskTitle = document.createElement("h3");
        taskTitle.classList.add("taskTitle");
        taskTitle.textContent = task.title;

        const taskDescription = document.createElement("p");
        taskDescription.classList.add("taskDescription");
        taskDescription.textContent = task.description;

        const taskDate = document.createElement("p");
        taskDate.classList.add("taskDate");
        taskDate.textContent = "Due Date: " + task.dueDate;

        const taskPriority = document.createElement("p");
        taskDate.classList.add("taskPriority");
        taskPriority.textContent = "Priority: " + task.priority;

        const checkTaskBtn = document.createElement("input");
        checkTaskBtn.classList.add("check-btn");
        checkTaskBtn.type = "checkbox";

        const removeTaskBtn = document.createElement("button");
        removeTaskBtn.classList.add("remove-btn");
        removeTaskBtn.textContent = "X";

        const editButton = document.createElement("button");
        editButton.classList.add("editButton");
        editButton.textContent = "edit";

        checkAndRemoveBtnWrapper.append(checkTaskBtn, removeTaskBtn);

        editWrapper.appendChild(editButton);

        taskBtnWrapper.append(checkAndRemoveBtnWrapper, editWrapper);

        taskTitleAndDescWrapper.append(taskTitle, taskDescription);
        taskDateAndPriorityWrapper.append(taskDate, taskPriority);

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
      }

      // Add task
      addTaskBtn.addEventListener("click", () => {
        const taskDialog = document.createElement("dialog");
        taskDialog.classList.add("taskDialog");

        const taskHeader = document.createElement("h2");
        taskHeader.classList.add("taskHeader");
        taskHeader.textContent = "Add Task";

        const dialogTaskTitle = document.createElement("input");
        dialogTaskTitle.classList.add("dialogTaskTitle");
        dialogTaskTitle.placeholder = "Task Title";

        const dialogTaskDescription = document.createElement("textarea");
        dialogTaskDescription.classList.add("dialogTaskDescription");
        dialogTaskDescription.placeholder = "Task Description...";

        const dialogTaskDueDate = document.createElement("input");
        dialogTaskDueDate.classList.add("dialogTaskDueDate");
        dialogTaskDueDate.type = "date";

        const dialogTaskPriority = document.createElement("input");
        dialogTaskPriority.classList.add("dialogTaskPriority");
        dialogTaskPriority.placeholder = "Task Priority (1, 2, 3)";

        const submitTaskModalBtn = document.createElement("button");
        submitTaskModalBtn.classList.add("submitTaskModalBtn");
        submitTaskModalBtn.textContent = "Submit";

        const closeTaskModalBtn = document.createElement("button");
        closeTaskModalBtn.classList.add("closeTaskModalBtn");
        closeTaskModalBtn.textContent = "Close";

        const taskTitleAndPriorityWrapper = document.createElement("div");
        taskTitleAndPriorityWrapper.classList.add(
          "taskTitleAndPriorityWrapper"
        );

        const taskDescriptionAndDateWrapper = document.createElement("div");
        taskDescriptionAndDateWrapper.classList.add(
          "taskDescriptionAndDateWrapper"
        );

        const submitAndCloseBtnWrapper = document.createElement("div");
        submitAndCloseBtnWrapper.classList.add("submitAndCloseBtnWrapper");

        taskTitleAndPriorityWrapper.append(dialogTaskTitle, dialogTaskPriority);
        taskDescriptionAndDateWrapper.append(
          dialogTaskDescription,
          dialogTaskDueDate
        );
        submitAndCloseBtnWrapper.append(submitTaskModalBtn, closeTaskModalBtn);

        taskDialog.append(
          taskHeader,
          taskTitleAndPriorityWrapper,
          taskDescriptionAndDateWrapper,
          submitAndCloseBtnWrapper
        );
        content.appendChild(taskDialog);
        taskDialog.showModal();

        submitTaskModalBtn.addEventListener("click", () => {
          taskItemIndex++;

          const isoDate = dialogTaskDueDate.value;
          const newDate = parseISO(isoDate);
          const formattedTaskDate = format(newDate, "MMMM dd, yyyy");

          addTask(
            taskItemIndex,
            currentProject /* , addTaskInput.value */,
            listArea,
            dialogTaskTitle.value,
            dialogTaskDescription.value,
            formattedTaskDate,
            dialogTaskPriority.value
          );

          taskDialog.close();
        });

        closeTaskModalBtn.addEventListener("click", () => {
          taskDialog.close();
        });
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
