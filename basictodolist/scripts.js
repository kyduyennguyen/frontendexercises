const input = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const form = document.getElementById("todoForm");
const list = document.getElementById("todoList");
const STORAGE_KEY = "todoList";

function getTodos() {
  try {
    const todos = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(todos)
      ? todos.filter((todo) => todo && typeof todo.text === "string")
      : [];
  } catch {
    return [];
  }
}

function saveTodos() {
  const todos = Array.from(list.querySelectorAll("li")).map((li) => ({
    text: li.querySelector("span").textContent,
    done: li.querySelector(".taskCheckbox").checked
  }));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function setTaskDone(checkbox) {
  const li = checkbox.closest("li");
  li.querySelector("span").classList.toggle("done", checkbox.checked);
}

function createTodo(text, done = false) {
  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "taskCheckbox";
  checkbox.checked = done;
  checkbox.setAttribute("aria-label", `Mark "${text}" as done`);

  const span = document.createElement("span");
  span.textContent = text;
  span.classList.toggle("done", done);

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
}

function addTodo() {
  const text = input.value;
  // Trim only for validation; keep spaces in the task text itself.
  if (!text.trim()) return;

  createTodo(text);
  saveTodos();
  input.value = "";
  input.focus();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo();
});

list.addEventListener("click", (e) => {
  const checkButton = e.target.closest("button.check");
  if (checkButton) {
    const checkbox = checkButton.closest("li").querySelector(".taskCheckbox");
    checkbox.checked = !checkbox.checked;
    setTaskDone(checkbox);
    saveTodos();
    return;
  }

  const deleteButton = e.target.closest("button.delete");
  if (deleteButton) {
    deleteButton.closest("li").remove();
    saveTodos();
  }
});

list.addEventListener("change", (e) => {
  if (e.target.classList.contains("taskCheckbox")) {
    setTaskDone(e.target);
    saveTodos();
  }
});

getTodos().forEach((todo) => createTodo(todo.text, Boolean(todo.done)));
