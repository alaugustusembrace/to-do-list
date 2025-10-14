const createTaskInputAndBtn = (content) => {
  const addTaskInput = document.createElement("input");
  addTaskInput.placeholder = "Buy a new tank";
  const addTaskBtn = document.createElement("button");
  addTaskBtn.textContent = "Add Task";

  content.appendChild(addTaskInput);
  content.appendChild(addTaskBtn);

  return { addTaskBtn, addTaskInput };
};

export { createTaskInputAndBtn };
