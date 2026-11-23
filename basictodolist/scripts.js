const input = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("todoList");

function setTaskDone(checkbox) {
  const li = checkbox.closest("li");
  li.querySelector("span").classList.toggle("done", checkbox.checked);
}

addBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (!text) return;

  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "taskCheckbox";
  checkbox.setAttribute("aria-label", `Mark "${text}" as done`);

  const span = document.createElement("span");
  span.textContent = text;

  const actions = document.createElement("div");

  const checkButton = document.createElement("button");
  checkButton.className = "check";
  checkButton.setAttribute("aria-label", "Mark task as done");
  checkButton.innerHTML = '<img src="./check.svg" alt="">';

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete";
  deleteButton.setAttribute("aria-label", "Delete task");
  deleteButton.innerHTML = '<img src="./delete.svg" alt="">';

  actions.append(checkButton, deleteButton);
  li.append(checkbox, span, actions);
  list.appendChild(li);
  input.value = "";
  input.focus();
});

list.addEventListener("click", (e) => {
  const checkButton = e.target.closest("button.check");
  if (checkButton) {
    const checkbox = checkButton.closest("li").querySelector(".taskCheckbox");
    checkbox.checked = !checkbox.checked;
    setTaskDone(checkbox);
    return;
  }

  const deleteButton = e.target.closest("button.delete");
  if (deleteButton) {
    deleteButton.closest("li").remove();
  }
});

list.addEventListener("change", (e) => {
  if (e.target.classList.contains("taskCheckbox")) {
    setTaskDone(e.target);
  }
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addBtn.click();
  }
});
