import { createTaskInputAndBtn } from "./addTaskInputAndButton.js";
import { addTask } from "./addTask.js";
import { parseISO, format } from "date-fns";

const createDefaultProject = (
  taskItemIndex,
  title,
  listArea,
  content,
  currentProject,
  listAreaWrapper
) => {
  const projectDivision = document.createElement("button");
  projectDivision.classList.add("projectDivision");
  const projectTitle = document.createElement("h2");
  projectTitle.textContent = title;
  projectDivision.appendChild(projectTitle);

  const { addTaskBtn } = createTaskInputAndBtn(content, listAreaWrapper);

  // To Add task
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

    const dialogTaskPriority = document.createElement("select");
    dialogTaskPriority.classList.add("dialogTaskPriority");
    dialogTaskPriority.name = "priority";
    dialogTaskPriority.id = "priority";

    const labelForPriority = document.createElement("label");
    labelForPriority.classList.add("labelForPriority");
    labelForPriority.htmlFor = "priority";
    labelForPriority.textContent = "Priority:";

    for (let i = 1; i <= 3; i++) {
      if (i === 1) {
        const optionLow = document.createElement("option");
        optionLow.value = "low";
        optionLow.textContent = "LOW";
        dialogTaskPriority.add(optionLow);
      } else if (i === 2) {
        const optionMedium = document.createElement("option");
        optionMedium.value = "medium";
        optionMedium.textContent = "MEDIUM";
        dialogTaskPriority.add(optionMedium);
      } else {
        const optionHigh = document.createElement("option");
        optionHigh.value = "high";
        optionHigh.textContent = "HIGH";
        dialogTaskPriority.add(optionHigh);
      }
    }

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

    taskTitleAndPriorityWrapper.append(
      dialogTaskTitle,
      labelForPriority,
      dialogTaskPriority
    );

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

      addTask(
        taskItemIndex,
        currentProject,
        listArea,
        dialogTaskTitle.value,
        dialogTaskDescription.value,
        dialogTaskDueDate.value,
        dialogTaskPriority.value
      );

      taskDialog.close();
    });

    closeTaskModalBtn.addEventListener("click", () => {
      taskDialog.close();
    });
  });

  // Clearing the listArea then Assigning its respective lists
  projectDivision.addEventListener("click", () => {
    listArea.innerHTML = "";

    const oldWrapper = document.querySelector(".taskInputWrapper");
    if (oldWrapper) oldWrapper.remove();

    const { addTaskBtn } = createTaskInputAndBtn(content, listAreaWrapper);

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

      // const dialogTaskPriority = document.createElement("select");
      // dialogTaskPriority.classList.add("dialogTaskPriority");
      // dialogTaskPriority.name = "priority";
      // dialogTaskPriority.id = "priority";

      const randomDifficulty = Math.floor(Math.random() * 10);

      const taskPriorityWrapper = document.createElement("div");
      taskPriorityWrapper.classList.add("taskPriorityWrapper");

      const priorityHeading = document.createElement("h4");
      priorityHeading.classList.add("priorityHeading");

      priorityHeading.textContent = "Priority";

      const priority = document.createElement("h5");
      priority.classList.add("priority");

      const priorityWrapper = document.createElement("div");
      priorityWrapper.classList.add("priorityWrapper");

      priorityWrapper.appendChild(priority);

      switch (task.title) {
        case "Study":
          priority.textContent = task.priority.toUpperCase();
          priorityWrapper.style.backgroundColor = "red";
          break;
        case "Sleep":
          priority.textContent = task.priority.toUpperCase();
          priorityWrapper.style.backgroundColor = "red";
          break;
        case "Eat":
          priority.textContent = task.priority.toUpperCase();
          priorityWrapper.style.backgroundColor = "yellow";
          break;
        case "Exercise":
          priority.textContent = task.priority.toUpperCase();
          priorityWrapper.style.backgroundColor = "yellow";
          break;
        case "Run":
          priority.textContent = task.priority.toUpperCase();
          priorityWrapper.style.backgroundColor = "green";
          break;
      }

      taskPriorityWrapper.append(priorityHeading, priorityWrapper);

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
      taskDateAndPriorityWrapper.append(taskDate, taskPriorityWrapper);

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

    // To add task
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

      const dialogTaskPriority = document.createElement("select");
      dialogTaskPriority.classList.add("dialogTaskPriority");
      dialogTaskPriority.name = "priority";
      dialogTaskPriority.id = "priority";

      const labelForPriority = document.createElement("label");
      labelForPriority.classList.add("labelForPriority");
      labelForPriority.htmlFor = "priority";
      labelForPriority.textContent = "Priority:";

      for (let i = 1; i <= 3; i++) {
        if (i === 1) {
          const optionLow = document.createElement("option");
          optionLow.value = "low";
          optionLow.textContent = "LOW";
          dialogTaskPriority.add(optionLow);
        } else if (i === 2) {
          const optionMedium = document.createElement("option");
          optionMedium.value = "medium";
          optionMedium.textContent = "MEDIUM";
          dialogTaskPriority.add(optionMedium);
        } else {
          const optionHigh = document.createElement("option");
          optionHigh.value = "high";
          optionHigh.textContent = "HIGH";
          dialogTaskPriority.add(optionHigh);
        }
      }

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

      taskTitleAndPriorityWrapper.append(
        dialogTaskTitle,
        labelForPriority,
        dialogTaskPriority
      );

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

        addTask(
          taskItemIndex,
          currentProject,
          listArea,
          dialogTaskTitle.value,
          dialogTaskDescription.value,
          dialogTaskDueDate.value,
          dialogTaskPriority.value
        );

        taskDialog.close();
      });

      closeTaskModalBtn.addEventListener("click", () => {
        taskDialog.close();
      });
    });
  });

  return { projectDivision };
};

export { createDefaultProject };
