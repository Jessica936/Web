const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".input");
const ulEl = document.querySelector(".list");

let list = JSON.parse(localStorage.getItem("list"));

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  toDoList();
});

function toDoList(task) {
  let newTask = inputEl.value;
  if (task) {
    newTask = task.name;
  }

  const liEl = document.createElement("li");
  if (task && task.checked) {
    liEl.classList.add("checked");
  }

  const spanEl = document.createElement("span");
  spanEl.innerText = newTask;
  spanEl.contentEditable = "false"; // 不允许内容可编辑

  liEl.appendChild(spanEl);
  ulEl.appendChild(liEl);
  inputEl.value = "";

  const editBtnEl = document.createElement("div");
  editBtnEl.innerHTML = `<i class="fas fa-edit"></i>`;
  liEl.appendChild(editBtnEl);

  const checkBtnEl = document.createElement("div");
  checkBtnEl.innerHTML = `<i class="fas fa-check-square"></i>`;
  liEl.appendChild(checkBtnEl);

  const trashBtnEl = document.createElement("div");
  trashBtnEl.innerHTML = `<i class="fas fa-trash"></i>`;
  liEl.appendChild(trashBtnEl);

  liEl.appendChild(editBtnEl);
  liEl.appendChild(checkBtnEl);
  liEl.appendChild(trashBtnEl);

  editBtnEl.addEventListener("click", () => {
    // 设置内容可编辑
    spanEl.contentEditable = "true";
    spanEl.focus(); // 让编辑框获取焦点
  });

  checkBtnEl.addEventListener("click", () => {
    liEl.classList.toggle("checked");
    updateLocalStorage();
  });

  trashBtnEl.addEventListener("click", () => {
    liEl.remove();
    updateLocalStorage();
  });

  
  spanEl.addEventListener("input", () => {
    // 更新本地存储当任务名被编辑时
    task.name = spanEl.innerText;
    updateLocalStorage();
  });

  updateLocalStorage();
}

function updateLocalStorage() {
  const liEls = document.querySelectorAll("li");
  list = [];
  liEls.forEach((liEl) => {
    list.push({
      name: liEl.innerText,
      checked: liEl.classList.contains("checked"),
    });
  });
  localStorage.setItem("list", JSON.stringify(list));
}

if (list) {
  list.forEach((task) => {
    toDoList(task);
  });
}


