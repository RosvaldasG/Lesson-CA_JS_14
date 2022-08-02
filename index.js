let arr = [
  { id: 101, task: "buy milk" },
  { id: 102, task: "buy eggs" },
  { id: 103, task: "buy bear" },
  { id: 104, task: "buy cockut" },
];

document
  .getElementById("taskInput")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("addBtn").click();
    }
  });

document.getElementById("addBtn").addEventListener("click", () => {
  const inputValue = document.getElementById("taskInput").value;
  if (!inputValue.trim()) {
    alert("Neteisinga reikšmė");
  } else {
    const newTask = {
      id: new Date().getTime(),
      task: inputValue,
    };
    arr.push(newTask);
    drawTaskList();
  }
});

function deleteItem() {
  // console.log(
  //   this.outerHTML
  //     .split(" ")
  //     .filter((item) => item.includes("taskid"))[0]
  //     .split("=")[1]
  // );
  arr = arr.filter((val) => val.id !== +this.id);
  console.log(arr.filter((val) => val.id !== +this.id));
  drawTaskList();
}

const drawTaskList = () => {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = null;
  arr.forEach((value, ind) => {
    // ---Sukuria Elementus
    const myLi = document.createElement("li");
    const myInput = document.createElement("Input");
    const myLabel = document.createElement("Label");
    const delBut = document.createElement("Button");
    //   ---Priskiria clases
    myLi.className = "list-group-item";
    myInput.className = "form-check-input me-1 col-1";
    myLabel.className = "form-check-label col-6";
    delBut.className = "btn btn-success btn-sm col-5";
    //   ----Priskiria atributus, kaip TYPE, ID ir FOR
    myInput.setAttribute("type", "checkbox");
    myInput.setAttribute("id", value.id);
    myLabel.setAttribute("for", value.id);
    // delBut.setAttribute("taskId", value.id);
    delBut.setAttribute("id", value.id);
    delBut.setAttribute("type", "button");

    delBut.onclick = deleteItem;

    //-------------
    myLabel.textContent = value.task;
    delBut.textContent = "Delete";
    // --- išveda į ekraną
    myLi.append(myInput, myLabel, delBut);
    taskList.append(myLi);
  });
};

drawTaskList();
