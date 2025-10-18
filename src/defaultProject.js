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

  // Add task
  addTaskBtn.addEventListener("click", () => {
    taskItemIndex++;

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

    const dialogTaskDueDate = document.createElement("p");
    dialogTaskDueDate.classList.add("dialogTaskDueDate");
    dialogTaskDueDate.textContent = currentProject.tasks[1].dueDate;

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
    taskTitleAndPriorityWrapper.classList.add("taskTitleAndPriorityWrapper");

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
      taskDialog.close();
    });

    closeTaskModalBtn.addEventListener("click", () => {
      taskDialog.close();
    });

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

      const taskTitle = document.createElement("h4");
      taskTitle.classList.add("taskTitle");
      taskTitle.textContent = task.title;

      const taskDescription = document.createElement("p");
      taskDescription.classList.add("taskDescription");
      taskDescription.textContent = task.description;

      const taskDate = document.createElement("p");
      taskDate.classList.add("taskDate");
      taskDate.textContent = task.dueDate;

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

    addTaskBtn.addEventListener("click", () => {
      taskItemIndex++;
      addTask(taskItemIndex, currentProject, addTaskInput.value, listArea);
    });
  });

  return { projectDivision };
};

export { createDefaultProject };
