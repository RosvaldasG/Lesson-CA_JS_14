let arr = [
  { id: new Date().getTime(), task: "buy milk" },
  { id: new Date().getTime() + 10, task: "buy eggs" },
  { id: new Date().getTime() + 100, task: "buy bear" },
  { id: new Date().getTime() + 100000, task: "buy apples" },
];
let sortByName = false;
let sortByDate = false;

document
  .getElementById("taskInput")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      // document.getElementById("addBtn").click();
      pressEn();
    }
  });

document.getElementById("addBtn").addEventListener("click", pressEn);

function pressEn() {
  const inputValue = document.getElementById("taskInput").value;
  const input = document.getElementById("taskInput");
  if (!inputValue.trim()) {
    alert("Neteisinga reikšmė");
  } else {
    const newTask = {
      id: new Date().getTime(),
      task: inputValue,
    };
    arr.push(newTask);
    input.value = null;
    input.blur();
    drawTaskList();
  }
}

// function deleteItem() {
//   // console.log(
//   //   this.outerHTML
//   //     .split(" ")
//   //     .filter((item) => item.includes("taskid"))[0]
//   //     .split("=")[1]
//   // );
//   arr = arr.filter((val) => val.id !== +this.id);
//   console.log(arr.filter((val) => val.id !== +this.id));
//   drawTaskList();
// }

const formatDate = (date) => {
  // console.dir(new Date(date).getFullYear());
  const taskYear = new Date(date).getFullYear();
  const taskMounth = new Date(date).getMonth() + 1;
  const taskDay = new Date(date).getDate();
  const taskHours = new Date(date).getHours();
  const taskMinutes = new Date(date).getMinutes();
  const taskSecond = new Date(date).getSeconds();

  function formatTime(time) {
    return time < 10 ? `0${time}` : time;
  }

  // console.log(taskYear, taskMounth, taskDay, taskHours, taskMin);
  return (
    taskYear +
    "-" +
    formatTime(taskMounth) +
    "-" +
    formatTime(taskDay) +
    " " +
    formatTime(taskHours) +
    ":" +
    formatTime(taskMinutes) +
    ":" +
    formatTime(taskSecond)
  );
};

const drawTaskList = () => {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = null;

  if (sortByName) {
    arr.sort((a, b) => (a.task > b.task ? 1 : b.task > a.task ? -1 : 0));
  }

  if (sortByDate) {
    arr.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0));
  }

  arr.forEach((value, ind) => {
    // ---Sukuria Elementus
    const myLi = document.createElement("li");
    const myInput = document.createElement("Input");
    const myLabel = document.createElement("Label");
    const btnGroup = document.createElement("div");
    const editBut = document.createElement("Button");
    const delBut = document.createElement("Button");
    const taskDate = document.createElement("div");

    //   ---Priskiria clases
    myLi.className = "container d-flex justify-content-between list-group-item";
    myInput.className = "form-check-input text-bg-light p-2 col-1"; // check
    myLabel.className = "form-check-label text-bg-light p-3 col-2"; //task
    btnGroup.className = "btn-group col-2";
    editBut.className = "btn btn-info btn-sm col-1"; // edit button
    delBut.className = "btn btn-success btn-sm col-1"; // del button
    taskDate.className = "text-bg-light p-3 col-4"; // task date

    //   ----Priskiria atributus, kaip TYPE, ID ir FOR
    myInput.setAttribute("type", "checkbox");
    myInput.setAttribute("id", value.id);
    myLabel.setAttribute("for", value.id);
    // delBut.setAttribute("taskId", value.id);
    delBut.setAttribute("id", value.id);
    delBut.setAttribute("type", "button");
    editBut.setAttribute("type", "button");
    btnGroup.setAttribute("role", "group");

    // delBut.onclick = deleteItem;
    delBut.addEventListener("click", () => {
      arr = arr.filter((val) => val.id !== value.id);
      drawTaskList();
    });
    // ------------
    editBut.addEventListener("click", () => {
      const editTask = prompt("Įvesk atnaujintą užduotį", value.task);

      if (editTask?.trim()) {
        const editNewTask = {
          ...value,
          // id: value.id,
          task: editTask,
        };

        arr.splice(ind, 1, editNewTask);
        drawTaskList();
      }
    });
    //-------------
    myLabel.textContent = value.task;
    editBut.textContent = "Edit";
    delBut.textContent = "Delete";
    taskDate.textContent = formatDate(value.id);

    // --- išveda į ekraną
    btnGroup.append(editBut, delBut);
    myLi.append(myInput, myLabel, taskDate, btnGroup);

    taskList.append(myLi);
  });
};
// ---------- sort by Name
document.getElementById("sortByName").addEventListener("click", function () {
  sortByName = !sortByName;
  sortByDate = false;
  document.getElementById("sortByDate").classList.remove("active");
  // console.log("sortByName", sortByName);
  sortByName ? this.classList.add("active") : this.classList.remove("active");
  drawTaskList();
});
// ------------------
// -----------sort by Date
document.getElementById("sortByDate").addEventListener("click", function () {
  sortByDate = !sortByDate;
  sortByName = false;
  document.getElementById("sortByName").classList.remove("active");
  // console.log("sortByDate", sortByDate);
  sortByDate ? this.classList.add("active") : this.classList.remove("active");
  drawTaskList();
});

drawTaskList();
