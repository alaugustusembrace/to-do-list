import { parseISO, format } from "date-fns";

const editButtonModal = (taskId, currentProject) => {
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

  let editTaskDate = document.createElement("input");
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

  const confirmAndCancelWrapper = document.createElement("div");
  confirmAndCancelWrapper.classList.add("confirmAndCancelWrapper");

  const confirmEdit = document.createElement("button");
  confirmEdit.classList.add("confirmEdit");
  confirmEdit.textContent = "Confirm";

  confirmEdit.addEventListener("click", () => {
    // input validation
    try {
      if (
        editTaskTitle.value === "" ||
        editTaskDescription.value === "" ||
        editTaskDate.value === "" ||
        editTaskPriority.value === ""
      ) {
        throw "Please fill all the fields";
      } else if (
        (editTaskTitle.value !== "" && editTaskTitle.value.length > 60) ||
        (editTaskDescription.value !== "" &&
          editTaskDescription.value.length > 80)
      ) {
        throw "Title or Description too long";
      } else {
        editTaskDate = parseISO(editTaskDate.value);
        editTaskDate = format(editTaskDate, "MMMM dd, yyyy");

        const taskToEdit = document.querySelector(`[data-id="${taskId}"]`);
        if (!taskToEdit) return;

        const newTitle = taskToEdit
          .querySelector(".taskTitleAndDescWrapper")
          .querySelector(".taskTitle");
        if (newTitle) newTitle.textContent = editTaskTitle.value;

        const newDescription = taskToEdit
          .querySelector(".taskTitleAndDescWrapper")
          .querySelector(".taskDescription");
        if (newDescription)
          newDescription.textContent = editTaskDescription.value;

        const newDate = taskToEdit
          .querySelector(".taskDateAndPriorityWrapper")
          .querySelector(".taskDate");
        if (newDate) newDate.textContent = "Due Date: " + editTaskDate;

        const newPriority = taskToEdit
          .querySelector(".taskDateAndPriorityWrapper")
          .querySelector(".taskPriorityWrapper")
          .querySelector(".priorityWrapper")
          .querySelector(".priority");
        if (newPriority) {
          newPriority.textContent = editTaskPriority.value.toUpperCase();
        }

        const newPriorityWrapper = taskToEdit
          .querySelector(".taskDateAndPriorityWrapper")
          .querySelector(".taskPriorityWrapper")
          .querySelector(".priorityWrapper");
        if (newPriorityWrapper) {
          if (newPriority.textContent === "LOW") {
            newPriorityWrapper.style.backgroundColor = "rgba(0, 255, 0, 0.5)";
          } else if (newPriority.textContent === "MEDIUM") {
            newPriorityWrapper.style.backgroundColor = "rgba(255, 255, 0, 0.5)";
          } else {
            newPriorityWrapper.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
          }
        }

        const taskData = currentProject.tasks.find(
          (tasky) => String(tasky.id) === String(taskId)
        );

        if (taskData) {
          taskData.title = editTaskTitle.value;
          taskData.description = editTaskDescription.value;
          taskData.dueDate = editTaskDate;
          taskData.priority = editTaskPriority.value;
        }

        editModal.close();
      }
    } catch (error) {
      alert(error);
    }

    // editTaskDate = parseISO(editTaskDate.value);
    // editTaskDate = format(editTaskDate, "MMMM dd, yyyy");

    // const taskToEdit = document.querySelector(`[data-id="${taskId}"]`);
    // if (!taskToEdit) return;

    // const newTitle = taskToEdit
    //   .querySelector(".taskTitleAndDescWrapper")
    //   .querySelector(".taskTitle");
    // if (newTitle) newTitle.textContent = editTaskTitle.value;

    // const newDescription = taskToEdit
    //   .querySelector(".taskTitleAndDescWrapper")
    //   .querySelector(".taskDescription");
    // if (newDescription) newDescription.textContent = editTaskDescription.value;

    // const newDate = taskToEdit
    //   .querySelector(".taskDateAndPriorityWrapper")
    //   .querySelector(".taskDate");
    // if (newDate) newDate.textContent = "Due Date: " + editTaskDate;

    // const newPriority = taskToEdit
    //   .querySelector(".taskDateAndPriorityWrapper")
    //   .querySelector(".taskPriorityWrapper")
    //   .querySelector(".priorityWrapper")
    //   .querySelector(".priority");
    // if (newPriority) {
    //   newPriority.textContent = editTaskPriority.value.toUpperCase();
    // }

    // const newPriorityWrapper = taskToEdit
    //   .querySelector(".taskDateAndPriorityWrapper")
    //   .querySelector(".taskPriorityWrapper")
    //   .querySelector(".priorityWrapper");
    // if (newPriorityWrapper) {
    //   if (newPriority.textContent === "LOW") {
    //     newPriorityWrapper.style.backgroundColor = "rgba(0, 255, 0, 0.5)";
    //   } else if (newPriority.textContent === "MEDIUM") {
    //     newPriorityWrapper.style.backgroundColor = "rgba(255, 255, 0, 0.5)";
    //   } else {
    //     newPriorityWrapper.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
    //   }
    // }

    // const taskData = currentProject.tasks.find(
    //   (tasky) => String(tasky.id) === String(taskId)
    // );

    // if (taskData) {
    //   taskData.title = editTaskTitle.value;
    //   taskData.description = editTaskDescription.value;
    //   taskData.dueDate = editTaskDate;
    //   taskData.priority = editTaskPriority.value;
    // }

    // editModal.close();
  });

  const cancelEdit = document.createElement("button");
  cancelEdit.classList.add("cancelEdit");
  cancelEdit.textContent = "Cancel";

  cancelEdit.addEventListener("click", () => {
    editModal.close();
  });

  confirmAndCancelWrapper.append(confirmEdit, cancelEdit);

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

  editModal.append(editModalHeader, editTasksWrapper, confirmAndCancelWrapper);

  content.appendChild(editModal);

  editModal.showModal();
};

export { editButtonModal };
