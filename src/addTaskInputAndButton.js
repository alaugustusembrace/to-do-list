const createTaskInputAndBtn = (content, listAreaWrapper) => {
  const wrapper = document.createElement("div");
  wrapper.classList.add("taskInputWrapper");

  const addTaskBtn = document.createElement("button");
  addTaskBtn.classList.add("addTaskBtn");
  addTaskBtn.textContent = "+ Add Task";

  wrapper.appendChild(addTaskBtn);
  listAreaWrapper.appendChild(wrapper);

  return { addTaskBtn, wrapper };
};

export { createTaskInputAndBtn };
