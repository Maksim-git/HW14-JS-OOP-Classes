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
        <li data-id="${el.id}" class ="${
        el.status ? "done" : "in-progress"
      } list__li">
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
  constructor(value) {
    this.value = value;
    this.status = false;
    this.id = Math.random().toString(36).substr(2, 9);
  }
}

let list = document.getElementById("list");
let todo = new TodoList(list);

todo.addTodo(new Task("Implement the site header"));
todo.addTodo(new Task("Implement of the left menu"));
todo.addTodo(new Task("Implement the site footer"));
todo.addTodo(new Task("Iafasdfasdf"));

todo.render();
console.log(todo);
mainWrap.addEventListener("click", (e) => {
  let fieldValue = formInput.value;
  const eventTarget = e.target;
  if (eventTarget.id === "buttonCreate") {
    if (fieldValue === "") return;
    todo.addTodo(new Task(fieldValue));
    todo.render();
    formInput.value = "";
  } else if (eventTarget.className === "delete-task") {
    todo.removeTodo(eventTarget.parentElement.dataset.id);
    eventTarget.closest("li").remove();
  } else if (eventTarget.id === "add-task__button_search") {
    todo.findTask(fieldValue);
  } else if (eventTarget.className === "set-status") {
    todo.changeStatus(eventTarget.parentElement.dataset.id);
    todo.render();
  }
});
