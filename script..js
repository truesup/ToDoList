const inputBox = document.getElementById("inputBox");
const listContainer = document.getElementById("listContainer");
const deleteAll = document.getElementById("deleteAll");

hideButton();

function addTask() {
  if (inputBox.value === "") {
    alert("Please, enter your task 🙌");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
    hideButton();
  }
  inputBox.value = "";
  saveData();
}

listContainer.addEventListener(
  "click",
  (e) => {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      hideButton();
      saveData();
    }
  },
  false
);

function deleteAllTasks() {
  while (listContainer.firstChild) {
    listContainer.removeChild(listContainer.firstChild);
  }
  hideButton();
}

deleteAll.addEventListener("click", () => {
  deleteAllTasks();
});

function hideButton() {
  if (listContainer.getElementsByTagName("li").length === 0) {
    deleteAll.style.display = "none";
  } else {
    deleteAll.style.display = "block";
  }
}

function saveData() {
  let listItems = listContainer.getElementsByTagName("li");
  if (listItems.length > 0) {
    localStorage.setItem("data", listContainer.innerHTML);
  } else {
    localStorage.removeItem("data");
  }
}

function showList() {
  let data = localStorage.getItem("data");
  if (data) {
    listContainer.innerHTML = data;
  }
  hideButton();
}
showList();

window.addEventListener("beforeunload", saveData);
