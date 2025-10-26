import { Project } from "./project.js";
import { createTaskInputAndBtn } from "./addTaskInputAndButton.js";
import { addTask } from "./addTask.js";
import { editButtonModal } from "./editButton.js";

const createNewProject = (
  projectWrapper,
  listArea,
  listAreaWrapper,
  content,
) => {
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

    // input validation
    try {
      if (newProjectDivision.textContent === "") {
        throw "empty";
      } else if (newProjectDivision.textContent.length > 18) {
        throw "too long";
      } else {
        projectWrapper.appendChild(newProjectDivision);
        projectDialog.close();
      }
    } catch (error) {
      alert("Error: Input is " + error);
    }

    // Clearing the listArea for new project
    newProjectDivision.addEventListener("click", () => {
      listArea.innerHTML = "";

      const oldWrapper = document.querySelector(".taskInputWrapper");
      if (oldWrapper) oldWrapper.remove();

      const { addTaskBtn } = createTaskInputAndBtn(content, listAreaWrapper);

      for (const task of currentProject.tasks) {
        // taskItemIndex++;
        const taskItem = document.createElement("li");
        taskItem.dataset.id = task.id;

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
            priorityWrapper.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
            break;
          case "Sleep":
            priority.textContent = task.priority.toUpperCase();
            priorityWrapper.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
            break;
          case "Eat":
            priority.textContent = task.priority.toUpperCase();
            priorityWrapper.style.backgroundColor = "rgba(255, 255, 0, 0.5)";
            break;
          case "Exercise":
            priority.textContent = task.priority.toUpperCase();
            priorityWrapper.style.backgroundColor = "rgba(255, 255, 0, 0.5)";
            break;
          case "Run":
            priority.textContent = task.priority.toUpperCase();
            priorityWrapper.style.backgroundColor = "rgba(0, 255, 0, 0.5)";
            break;
          default:
            priority.textContent = task.priority.toUpperCase();
            if (task.priority === "high") {
              priorityWrapper.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
            } else if (task.priority === "medium") {
              priorityWrapper.style.backgroundColor = "rgba(255, 255, 0, 0.5)";
            } else {
              priorityWrapper.style.backgroundColor = "rgba(0, 255, 0, 0.5)";
            }
        }

        taskPriorityWrapper.append(priorityHeading, priorityWrapper);

        const checkTaskBtn = document.createElement("input");
        checkTaskBtn.classList.add("check-btn");
        checkTaskBtn.type = "checkbox";

        if (task.completed) {
          checkTaskBtn.checked = true;
          taskTitle.style.textDecoration = "line-through";
          taskTitle.style.textDecorationThickness = "3px";
        }

        checkTaskBtn.addEventListener("click", (e) => {
          if (e.target.checked) {
            taskTitle.style.textDecoration = "line-through";
            task.completed = true;
          } else {
            taskTitle.style.textDecoration = "none";
            task.completed = false;
          }
          taskTitle.style.textDecorationThickness = "3px";
        });

        const removeTaskBtn = document.createElement("button");
        removeTaskBtn.classList.add("remove-btn");
        removeTaskBtn.textContent = "X";

        const editButton = document.createElement("button");
        editButton.classList.add("editButton");
        editButton.textContent = "EDIT";

        // to edit task
        taskWrapper.dataset.id = task.id;

        editButton.addEventListener("click", () => {
          editButtonModal(taskWrapper.dataset.id, currentProject);
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
            (item) => String(item.id) !== String(listItem.dataset.id),
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
          "taskTitleAndPriorityWrapper",
        );

        const taskDescriptionAndDateWrapper = document.createElement("div");
        taskDescriptionAndDateWrapper.classList.add(
          "taskDescriptionAndDateWrapper",
        );

        const submitAndCloseBtnWrapper = document.createElement("div");
        submitAndCloseBtnWrapper.classList.add("submitAndCloseBtnWrapper");

        taskTitleAndPriorityWrapper.append(
          dialogTaskTitle,
          labelForPriority,
          dialogTaskPriority,
        );

        taskDescriptionAndDateWrapper.append(
          dialogTaskDescription,
          dialogTaskDueDate,
        );
        submitAndCloseBtnWrapper.append(submitTaskModalBtn, closeTaskModalBtn);

        taskDialog.append(
          taskHeader,
          taskTitleAndPriorityWrapper,
          taskDescriptionAndDateWrapper,
          submitAndCloseBtnWrapper,
        );
        content.appendChild(taskDialog);
        taskDialog.showModal();

        submitTaskModalBtn.addEventListener("click", () => {
          const taskID = crypto.randomUUID();

          // input validation
          try {
            if (
              dialogTaskTitle.value === "" ||
              dialogTaskDescription.value === "" ||
              dialogTaskPriority.value === "" ||
              dialogTaskDueDate.value === ""
            ) {
              throw "Please fill all the fields";
            } else if (
              (dialogTaskTitle.value !== "" &&
                dialogTaskTitle.value.length > 60) ||
              (dialogTaskDescription.value !== "" &&
                dialogTaskDescription.value.length > 80)
            ) {
              throw "Title or Description Input too long";
            } else {
              addTask(
                taskID,
                currentProject,
                listArea,
                dialogTaskTitle.value,
                dialogTaskDescription.value,
                dialogTaskDueDate.value,
                dialogTaskPriority.value,
              );
              taskDialog.close();
            }
          } catch (error) {
            alert(error);
          }
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
