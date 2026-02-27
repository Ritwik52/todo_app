let todos = JSON.parse(localStorage.getItem("todos")) || [];

const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

const totalCount = document.getElementById("totalCount");
const completedCount = document.getElementById("completedCount");
const pendingCount = document.getElementById("pendingCount");

addBtn.addEventListener("click", addTodo);

function addTodo() {
  const text = todoInput.value.trim();
  if (!text) return;

  const newTodo = {
    id: Date.now(),      // unique ID
    text,
    completed: false
  };

  todos.push(newTodo);
  todoInput.value = "";
  saveAndRender();
}

function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id);
  saveAndRender();
}

function toggleComplete(id) {
  todos = todos.map(t =>
    t.id === id ? { ...t, completed: !t.completed } : t
  );
  saveAndRender();
}

function saveAndRender() {
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
  updateCounts();
}

function renderTodos() {
  todoList.innerHTML = "";

  todos.forEach(todo => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span class="${todo.completed ? "completed" : ""}">
        ${todo.text}
      </span>

      <div>
        <button onclick="toggleComplete(${todo.id})">✔</button>
        <button onclick="deleteTodo(${todo.id})">✖</button>
      </div>
    `;

    todoList.appendChild(li);
  });
}

function updateCounts() {
  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;
  const pending = total - completed;

  totalCount.textContent = total;
  completedCount.textContent = completed;
  pendingCount.textContent = pending;
}

saveAndRender();