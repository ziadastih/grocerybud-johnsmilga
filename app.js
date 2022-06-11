const form = document.querySelector(".grocery-form");
const alert = document.querySelector(".alert");
const input = document.getElementById("grocery");
const container = document.querySelector(".grocery-container");
const articles = document.querySelector(".grocery-list");
const item = document.querySelector(".grocery-item");
const title = document.querySelector(".title");
const submitBtn = document.querySelector(".submit-btn");
const clearBtn = document.querySelector(".clear-btn");

let groceryArr = [];

const itemFromLocalS = JSON.parse(localStorage.getItem("groceryArr"));
if (itemFromLocalS) {
  groceryArr = itemFromLocalS;
  addItems(groceryArr);
}
// the app major functionality,alerts,submit items to local storage and viewer interface,edit items,delete items,clear storage.....

submitBtn.addEventListener("click", function (e) {
  e.preventDefault();

  if (input.value === "") {
    dangeralert();
  } else {
    addalert();
    groceryArr.push(input.value);
    input.value = " ";
    localStorage.setItem("groceryArr", JSON.stringify(groceryArr));
    addItems(groceryArr);
  }
});

// ===============alerts functions
function dangeralert() {
  alert.classList.add("alert-danger");
  alert.textContent = "please add item";
  setTimeout(() => {
    alert.classList.remove("alert-danger");
    alert.textContent = " ";
  }, 2000);
}

function addalert() {
  alert.classList.add("alert-success");
  alert.textContent = "item was added";
  setTimeout(() => {
    alert.classList.remove("alert-success");
    alert.textContent = " ";
  }, 2000);
}
// in case we added and cleared right away we want to remove this function so we set less time in clear to appear and disappear
function editAlert() {
  alert.classList.add("alert-success");
  alert.textContent = "item was edited";
  setTimeout(() => {
    alert.classList.remove("alert-success");
    alert.textContent = " ";
  }, 2000);
}

function clearAlert() {
  alert.textContent = "list is cleared";
  alert.classList.remove("alert-success");
  alert.classList.add("alert-danger");
  setTimeout(function () {
    alert.textContent = "";
    alert.classList.remove("alert-danger");
  }, 1000);
}
// set back to default function
function setBackToDefault() {
  input.value = "";
}
//  additems to the container and local storage
function addItems(arr) {
  container.classList.add("show-container");
  let listItems = "";
  for (let i = 0; i < arr.length; i++) {
    listItems += `  <article class="grocery-item">
  <p class="title">${arr[i]}</p>
  <div class="btn-container">
    <button type="button" class="edit-btn">
      <i class="fas fa-edit"></i>
    </button>
    <button type="button" class="delete-btn">
      <i class="fas fa-trash"></i>
    </button>
  </div>
</article>`;

    setBackToDefault();
  }
  articles.innerHTML = listItems;
}

// function clear storage and clear items

clearBtn.addEventListener("click", function () {
  groceryArr = [];
  articles.innerHTML = "";
  localStorage.clear();
  container.classList.remove("show-container");
  clearAlert();
});
