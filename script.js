const formInput = document.querySelector(".add-task__input");
const mainWrap = document.querySelector(".main-wrap");

class TodoList {
  constructor(el) {
    this.todos = [];
    this.el = el;
  }
  addTodo(todo) {
    this.todos.push(todo);
  }
  removeTodo(id) {
    this.todos = this.todos.filter((el) => {
      return el.id !== id;
    });
  }
  getTodos() {
    return this.todos;
  }

  changeStatus(id) {
    let index = this.todos.findIndex((el) => el.id === id);
    this.todos[index].status = !this.todos[index].status;
  }

  findTask(value) {
    let allLI = document.querySelectorAll("ul > li");
    if (value != "") {
      allLI.forEach(function (elem) {
        if (elem.innerText.search(value) == -1) {
          elem.classList.add("hide");
        } else {
          elem.classList.remove("hide");
        }
      });
    }
  }

  render() {
    let lis = "";
    for (let el of this.todos) {
      if (!el) {
        return;
      }
      lis += `
        <li data-id="${el.id}" class ="underline">
          ${el.value}
          <button class="set-status">Change status</button>
          <button class="delete-task">Delete</button>
        </li>
      `;
    }
    this.el.innerHTML = lis;
  }
}

class Task {
  constructor(value, status) {
    this.value = value;
    this.status = status;
    this.id = Math.random().toString(36).substr(2, 9);
  }
}

let list = document.getElementById("list");
let todo1 = new TodoList(list);

todo1.addTodo(new Task("fieldValue", false));
todo1.render();

mainWrap.addEventListener("click", (e) => {
  let fieldValue = formInput.value;
  const eventTarget = e.target;
  if (eventTarget.id === "test") {
    if (fieldValue === "") return;
    todo1.addTodo(new Task(fieldValue, false));
    todo1.render();
    formInput.value = "";
  } else if (eventTarget.className === "delete-task") {
    todo1.removeTodo(eventTarget.parentElement.dataset.id);
    todo1.render();
  } else if (eventTarget.className === "add-task__button_search") {
    todo1.findTask(fieldValue);
  } else if (eventTarget.className === "set-status") {
  }
});
