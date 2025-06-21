const inputBtn = document.getElementById("input-btn");
const todoArea = document.getElementById("todo-area");
const todoCountDisplay = document.getElementById("todoCount");

// ===== 共通部品 =====
const createButton = (text, onClick) => {
  const button = document.createElement("button");
  button.innerText = text;
  button.addEventListener("click", onClick);
  return button;
};

const createCheckbox = () => {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", updateCount);
  return checkbox;
};

// ===== メイン処理 =====
const onClickAdd = () => {
  const input = document.getElementById("input-text");
  const inputText = input.value.trim();
  if (!inputText) return;

  input.value = "";

  const todoItem = document.createElement("div");
  const p = document.createElement("p");
  p.innerText = inputText;

  const checkbox = createCheckbox();
  const editButton = createButton("編集", onClickEditTodo);
  const deleteButton = createButton("削除", onClickDeleteTodo);

  todoItem.append(p, checkbox, editButton, deleteButton);
  todoArea.appendChild(todoItem);
  updateCount();
};

const onClickDeleteTodo = (event) => {
  const item = event.target.closest("div");
  if (item) item.remove();
  updateCount();
};

const onClickEditTodo = (event) => {
  const item = event.target.closest("div");
  const p = item.querySelector("p");
  const input = document.createElement("input");
  input.type = "text";
  input.value = p.innerText;

  item.removeChild(p);
  item.querySelectorAll("button").forEach((btn) => btn.remove());

  const saveButton = createButton("保存", onClickStoreTodo);
  item.appendChild(input);
  item.appendChild(saveButton);
};

const onClickStoreTodo = (event) => {
  const item = event.target.closest("div");
  const input = item.querySelector('input[type="text"]');
  const newText = input.value.trim();
  const p = document.createElement("p");
  p.innerText = newText;

  item.replaceChild(p, input);
  event.target.remove();

  const editButton = createButton("編集", onClickEditTodo);
  const deleteButton = createButton("削除", onClickDeleteTodo);
  item.append(editButton, deleteButton);
};

// ===== カウント更新 =====
const updateCount = () => {
  const todoItems = todoArea.querySelectorAll("div");
  const total = todoItems.length;
  const checked = Array.from(todoItems).filter(
    (item) => item.querySelector('input[type="checkbox"]')?.checked
  ).length;

  todoCountDisplay.innerText = `総数: ${total} 件 / 完了: ${checked} 件`;
};

// ===== 初期化 =====
inputBtn.addEventListener("click", onClickAdd);
