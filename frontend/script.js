const API = "https://to-do-app-dhnk.onrender.com/todos";

async function loadTodos() {
  const res = await fetch(API);
  const data = await res.json();

  const list = document.getElementById("list");
  list.innerHTML = "";

  data.forEach(todo => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = todo.text;

    const btn = document.createElement("button");
    btn.textContent = "Delete";

    btn.onclick = () => deleteTodo(todo.id);

    li.appendChild(span);
    li.appendChild(btn);

    list.appendChild(li);
  });
}

async function addTodo() {
  const input = document.getElementById("taskInput");

  if (!input.value) return;

  await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text: input.value })
  });

  input.value = "";
  loadTodos();
}

async function deleteTodo(id) {
  await fetch(`${API}/${id}`, {
    method: "DELETE"
  });

  loadTodos();
}

loadTodos();