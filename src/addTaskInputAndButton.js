const createTaskInputAndBtn = (content) => {
  const wrapper = document.createElement("div");
  wrapper.classList.add("taskInputWrapper");

  const addTaskInput = document.createElement("input");
  addTaskInput.placeholder = "Buy a new tank";

  const addTaskBtn = document.createElement("button");
  addTaskBtn.textContent = "Add Task";

  wrapper.append(addTaskInput, addTaskBtn);
  content.appendChild(wrapper);

  return { addTaskBtn, addTaskInput, wrapper };
};

export { createTaskInputAndBtn };
