import { Project } from "./project.js";
import { createTaskInputAndBtn } from "./addTaskInputAndButton.js";
import { addTask } from "./addTask.js";
import { parseISO, format } from "date-fns";

const createNewProject = (projectWrapper, listArea, listAreaWrapper) => {
  const newProjectDivision = document.createElement("button");
  newProjectDivision.classList.add("newProjectDivision");
  const projectTitle = document.createElement("h2");

  const projectDialog = document.createElement("dialog");
  projectDialog.classList.add("project-dialog");
  const projectTitleInput = document.createElement("input");
  projectTitleInput.classList.add("title-input");

  const projectDialogHeader = document.createElement("h2");
  projectDialogHeader.textContent = "New Project";

  projectTitleInput.placeholder = "Project Title";

  projectDialog.appendChild(projectDialogHeader);
  projectDialog.appendChild(projectTitleInput);
  content.appendChild(projectDialog);
  projectDialog.showModal();

  const createProjectBtn = document.createElement("button");
  createProjectBtn.textContent = "Create Project";
  projectDialog.appendChild(createProjectBtn);

  createProjectBtn.addEventListener("click", () => {
    const currentProject = new Project(projectTitleInput.value);

    projectTitle.textContent = currentProject.title;

    newProjectDivision.appendChild(projectTitle);
    projectWrapper.appendChild(newProjectDivision);
    projectDialog.close();

    // Clearing the listArea for new project
    newProjectDivision.addEventListener("click", () => {
      listArea.innerHTML = "";

      const oldWrapper = document.querySelector(".taskInputWrapper");
      if (oldWrapper) oldWrapper.remove();

      const { addTaskBtn, addTaskInput } = createTaskInputAndBtn(
        content,
        listAreaWrapper
      );

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

        // const taskPriority = document.createElement("p");
        // taskDate.classList.add("taskPriority");
        // taskPriority.textContent = "Priority: " + task.priority;
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
          default:
            priority.textContent = task.priority.toUpperCase();
            if (task.priority === "high") {
              priorityWrapper.style.backgroundColor = "red";
            } else if (task.priority === "medium") {
              priorityWrapper.style.backgroundColor = "yellow";
            } else {
              priorityWrapper.style.backgroundColor = "green";
            }
        }

        taskPriorityWrapper.append(priorityHeading, priorityWrapper);

        const checkTaskBtn = document.createElement("input");
        checkTaskBtn.classList.add("check-btn");
        checkTaskBtn.type = "checkbox";

        checkTaskBtn.addEventListener("click", (e) => {
          taskTitle.style.textDecoration = e.target.checked
            ? "line-through"
            : "none";
          taskTitle.style.textDecorationThickness = "3px";
        });

        const removeTaskBtn = document.createElement("button");
        removeTaskBtn.classList.add("remove-btn");
        removeTaskBtn.textContent = "X";

        const editButton = document.createElement("button");
        editButton.classList.add("editButton");
        editButton.textContent = "edit";

        editButton.addEventListener("click", () => {
          const editModal = document.createElement("dialog");
          editModal.classList.add("editModal");

          const editTasksWrapper = document.createElement("div");
          editTasksWrapper.classList.add("editTaskWrapper");

          const editModalHeader = document.createElement("h2");
          editModalHeader.classList.add("editModalHeader");
          editModalHeader.textContent = "Edit Task";

          const editTitleAndDescWrapper = document.createElement("div");
          editTitleAndDescWrapper.classList.add("editTitleAndDescWrapper");

          const editTaskTitle = document.createElement("input");
          editTaskTitle.classList.add("editTaskTitle");
          editTaskTitle.placeholder = "Task Title";

          const editTaskDescription = document.createElement("input");
          editTaskTitle.classList.add("editTaskDescription");
          editTaskDescription.placeholder = "Task Description...";

          editTitleAndDescWrapper.append(editTaskTitle, editTaskDescription);

          const editDateAndDateLabebl = document.createElement("div");
          editDateAndDateLabebl.classList.add("editDateAndDateLabebl");

          const editTaskDate = document.createElement("input");
          editTaskTitle.id = "date";
          editTaskDate.type = "date";

          const editTaskDateLabel = document.createElement("label");
          editTaskDateLabel.htmlFor = "date";
          editTaskDateLabel.textContent = "Due Date:";

          editDateAndDateLabebl.append(editTaskDateLabel, editTaskDate);

          const editTaskPriority = document.createElement("select");
          editTaskPriority.id = "edit-priority";

          const editTaskPriorityLabel = document.createElement("label");
          editTaskPriorityLabel.classList.add("editTaskPriorityLabel");
          editTaskPriorityLabel.htmlFor = "edit-priority";
          editTaskPriorityLabel.textContent = "Priority: ";

          for (let i = 1; i <= 3; i++) {
            if (i === 1) {
              const editPriorityOption = document.createElement("option");
              editPriorityOption.value = "low";
              editPriorityOption.textContent = "LOW";
              editTaskPriority.appendChild(editPriorityOption);
            } else if (i === 2) {
              const editPriorityOption = document.createElement("option");
              editPriorityOption.value = "medium";
              editPriorityOption.textContent = "MEDIUM";
              editTaskPriority.appendChild(editPriorityOption);
            } else if (i === 3) {
              const editPriorityOption = document.createElement("option");
              editPriorityOption.value = "high";
              editPriorityOption.textContent = "HIGH";
              editTaskPriority.appendChild(editPriorityOption);
            }
          }

          editTasksWrapper.append(
            editTitleAndDescWrapper,
            editDateAndDateLabebl,
            editTaskPriorityLabel,
            editTaskPriority
          );

          editModal.append(editModalHeader, editTasksWrapper);

          content.appendChild(editModal);

          editModal.showModal();
        });

        checkAndRemoveBtnWrapper.append(removeTaskBtn, checkTaskBtn);

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
        taskTitleAndPriorityWrapper.classList.add(
          "taskTitleAndPriorityWrapper"
        );

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
  });

  const closeModalBtn = document.createElement("button");
  closeModalBtn.textContent = "Close";
  projectDialog.appendChild(closeModalBtn);

  closeModalBtn.addEventListener("click", () => {
    projectDialog.close();
  });
};

export { createNewProject };
