let arr = [
  { id: 101, task: "buy milk" },
  { id: 102, task: "buy eggs" },
  { id: 103, task: "buy bear" },
  { id: 104, task: "buy cockut" },
  { id: 104, task: "buy tomatoes" },
  { id: 104, task: "buy cucmber" },
];

document.getElementById("addBtn").addEventListener("click", () => {
  const inputValue = document.getElementById("taskInput").value;
  if (inputValue == "") {
    alert("Neteisinga reikšmė");
  } else {
    const newTask = {
      id: new Date().getTime,
      task: inputValue,
    };
    arr.push(newTask);
    drawTaskList();
  }
});

const drawTaskList = () => {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = null;
  arr.forEach((value, ind) => {
    // ---Sukuria Elementus
    const myLi = document.createElement("li");
    const myInput = document.createElement("Input");
    const myLabel = document.createElement("Label");
    //   ---Priskiria clases
    myLi.className = "list-group-item";
    myInput.className = "form-check-input me-1";
    myLabel.className = "form-check-label";
    //   ----Priskiria atributus, kaip TYPE, ID ir FOR
    myInput.setAttribute("type", "checkbox");
    myInput.setAttribute("id", value.id);
    myLabel.setAttribute("for", value.id);
    //-------------
    myLabel.textContent = value.task;
    // --- išveda į ekraną
    myLi.append(myInput, myLabel);
    taskList.append(myLi);
  });
};

drawTaskList();
