const inp = document.querySelector(".input-container input");
const form = document.querySelector("form");
const todoContainer = document.querySelector(".todo-list-container");

window.onload = () => {
  const todos = localStorage.getItem("todoList");
  if (!todos) return;
  todos.split(",").forEach((todo) => createLiNode(todo));
};

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const todo = inp.value.trim();

  if (!todo) return;

  createLiNode(todo);

  saveTodos();

  inp.value = "";
});



const removeBtn = document.querySelectorAll(".remove-btn");

removeBtn.forEach((btn) => {
  btn.addEventListener("click", todoRemover);
});

function todoRemover() {
  this.parentNode.remove();
  saveTodos();
}


const sortBtn = document.querySelector(".sort-btn__button");

sortBtn.addEventListener("click", function () {
  this.classList.toggle("active");

  let liNodeTexts = [
    ...document.querySelectorAll(".todo-list-container li"),
  ].map((element) => element.innerText);

  

  
  liNodeTexts = liNodeTexts.reverse();

  document
    .querySelectorAll(".todo-list-container li")
    .forEach((element) => element.remove());
  liNodeTexts.forEach((element) => createLiNode(element));
  saveTodos();
});



function createLiNode(text) {
  const liNode = document.createElement("li");
  liNode.setAttribute("draggable", true);
  liNode.classList.add("draggable");
  const spanNode = document.createElement("span");
  spanNode.setAttribute("contenteditable", true);
  const textNode = document.createTextNode(text);
  spanNode.append(textNode);
  addEventsDragAndDrop(liNode);

  const removeBtn = document.createElement("span");
  removeBtn.classList.add("remove-btn");
  removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  removeBtn.addEventListener("click", todoRemover);

  liNode.append(spanNode);
  liNode.append(removeBtn);
  todoContainer.append(liNode);
}



function saveTodos() {
  const todos = [...document.querySelectorAll(".todo-list-container li")].map(
    (element) => element.innerText
  );
  localStorage.setItem("todoList", todos);
  todos[0] ?? localStorage.removeItem("todoList");
}



var remove = document.querySelector(".draggable");

function dragStart(e) {
  this.style.opacity = "0.4";
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/html", this.innerHTML);
}

function dragEnter(e) {
  this.classList.add("over");
}

function dragLeave(e) {
  e.stopPropagation();
  this.classList.remove("over");
}

function dragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
  return false;
}

function dragDrop(e) {
  if (dragSrcEl != this) {
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData("text/html");
  }

  this.children[1].addEventListener("click", todoRemover);
  return false;
}

function dragEnd(e) {
  var listItens = document.querySelectorAll(".draggable");
  [].forEach.call(listItens, function (item) {
    item.classList.remove("over");
  });
  this.style.opacity = "1";
  this.children[1].addEventListener("click", todoRemover);
}

function addEventsDragAndDrop(el) {
  el.addEventListener("dragstart", dragStart, false);
  el.addEventListener("dragenter", dragEnter, false);
  el.addEventListener("dragover", dragOver, false);
  el.addEventListener("dragleave", dragLeave, false);
  el.addEventListener("drop", dragDrop, false);
  el.addEventListener("dragend", dragEnd, false);
}

var listItens = document.querySelectorAll(".draggable");

[].forEach.call(listItens, function (item) {
  addEventsDragAndDrop(item);
});