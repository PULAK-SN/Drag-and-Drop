const draggable_list = document.getElementById("draggable-list");
const check = document.getElementById("check");

// in the correct order
// "Elon Musk",
// "Bernard Arnault",
// "Jeff Bezos",
// "Bill Gates",
// "Larry Ellison",
// "Steve Ballmer",
// "Larry Page",
// "Mark Zuckerberg",
// "Warren Buffett",
// "Sergey Brin",

const richestPeople = [
  "Elon Musk",
  "Bernard Arnault",
  "Jeff Bezos",
  "Bill Gates",
  "Larry Ellison",
  "Steve Ballmer",
  "Larry Page",
  "Mark Zuckerberg",
  "Warren Buffett",
  "Sergey Brin",
];

// store list items
const listItems = [];

let dragStartIndex;

createList();

// Array sort() function demo
// const a = [12, 4, 1, 10, 50, 23, 1];
// console.log(
//   a.sort(function (a, b) {
//     return a - b;
//   })
// );
// console.log(a);
// // a.sort();
// // console.log(a);

// a.sort((a, b) => {
//   return a - b;
// });
// console.log(a);

// insert list items into DOM
function createList() {
  [...richestPeople]
    .map((a) => {
      return { value: a, sort: Math.random() };
    })
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .forEach((person, index) => {
      //   console.log(person);
      const listItem = document.createElement("li");

      //   listItem.classList.add("wrong");
      //   listItem.classList.add("over");

      listItem.setAttribute("data-index", index);

      listItem.innerHTML = `
        <span class="number">${index + 1} </span>
        <div class="draggable" draggable='true'>
            <p class = 'person-name'> ${person} </p>
            <i class='fas fa-grip-lines'></i>
        </div>
        `;

      listItems.push(listItem);
      draggable_list.appendChild(listItem);
    });
  //   console.log(listItems);

  addEventListeners();
}

// check the order of the list items
function checkOrder() {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector(".person-name").innerText.trim();
    // console.log(personName);
    if (personName !== richestPeople[index]) {
      listItem.classList.add("wrong");
    } else {
      listItem.classList.remove("wrong");
      listItem.classList.add("right");
    }
  });
}
function dragStart() {
  //   console.log("Event :", "dragStart");
  dragStartIndex = +this.closest("li").getAttribute("data-index");
  //   console.log(dragStartIndex);
}

function dragDrop(e) {
  //   console.log("Event :", "drop");
  const dragDropIndex = +this.getAttribute("data-index");
  //   console.log(dragDropIndex);
  swapItems(dragStartIndex, dragDropIndex);
  this.classList.remove("over");
}

// swap list items that are drag and drop
function swapItems(startIndex, endIndex) {
  const itemOne = listItems[startIndex].querySelector(".draggable");
  const itemTwo = listItems[endIndex].querySelector(".draggable");

  listItems[startIndex].appendChild(itemTwo);
  listItems[endIndex].appendChild(itemOne);
  //   console.log(itemOne, itemTwo);
  //   console.log(listItems);
}

function dragLeave() {
  //   console.log("Event :", "dragleave");
  this.classList.remove("over");
}

function dragOver(e) {
  //   console.log("Event :", "dragover");
  e.preventDefault();
}

function dragEnter() {
  //   console.log("Event :", "dragenter");
  this.classList.add("over");
}

function addEventListeners() {
  const draggables = document.querySelectorAll(".draggable");

  const dragItems = document.querySelectorAll(".draggable-list li");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });

  dragItems.forEach((dragItem) => {
    // dragItem.addEventListener("dragstart", dragStart);
    dragItem.addEventListener("dragover", dragOver);
    dragItem.addEventListener("drop", dragDrop);
    dragItem.addEventListener("dragenter", dragEnter);
    dragItem.addEventListener("dragleave", dragLeave);
  });
}

check.addEventListener("click", checkOrder);
