const form = document.querySelector(".grocery-form");
const alert = document.querySelector(".alert");
const input = document.getElementById("grocery");
const container = document.querySelector(".grocery-container");
const articles = document.querySelector(".grocery-list");
const item = document.querySelector(".grocery-item");

const submitBtn = document.querySelector(".submit-btn");
const clearBtn = document.querySelector(".clear-btn");

let groceryArr = [];

// getting the local storage in case we refresh we want the same array and local storage to be displayed
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

function removeAlert() {
  alert.classList.add("alert-danger");
  alert.classList.remove("alert-success");
  alert.textContent = "item was removed";
  setTimeout(() => {
    alert.classList.remove("alert-danger");
    alert.textContent = " ";
  }, 1000);
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
  // in case we removed the last item we want to hid the clear btn,otherwise we want to display the same items
  if (arr.length === 0) {
    container.classList.remove("show-container");
  } else {
    container.classList.add("show-container");
  }

  // creating the html here by setting the input value into an array and then setting a for loop to display all the articles we want each one into a different container
  let listItems = "";
  for (let i = 0; i < arr.length; i++) {
    listItems += `  <article class="grocery-item" data-id = ${arr[i]}>
  <p class="title"  >${arr[i]}</p>
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

  //=================== delete btn=======
  const deleteBtn = document.querySelectorAll(".delete-btn");
  deleteBtn.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      // selecting the title ,cause if we select the id and a person set a phrase we cant grab the id ,and then finding the index of that title with the function removeItem ,and the we splice that index and re-display the array
      let id =
        e.currentTarget.parentElement.previousSibling.previousElementSibling
          .textContent;
      const removeItem = (groceryArr, id) => {
        const index = groceryArr.findIndex((element) => element === id);
        if (index !== -1) {
          groceryArr.splice(index, 1);
          return groceryArr;
        }
      };

      // calling the remove item function and then  setting the new localstorage ,and calling the alert ,also calling the initial add item function to display all elements
      removeItem(groceryArr, id);
      localStorage.setItem("groceryArr", JSON.stringify(groceryArr));
      removeAlert();
      addItems(groceryArr);
    });
  });

  //=========edit btn =========
  const editBtn = document.querySelectorAll(".edit-btn");
  editBtn.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      // id = to title and input value is = id ,and submit btn we want to change it to edit btn then we want to splice this main item on submit and generate a new item
      let id =
        e.currentTarget.parentElement.previousSibling.previousElementSibling
          .textContent;
      input.value = id;
      submitBtn.textContent = "Edit";
      const index = groceryArr.findIndex((element) => element === id);
      if (index !== -1) {
        groceryArr.splice(index, 1);

        // event listener to submit
        submitBtn.addEventListener("click", function () {
          submitBtn.textContent = "submit";

          editAlert();
        });
      }
    });
  });
}

// function clear storage and clear items

clearBtn.addEventListener("click", function () {
  groceryArr = [];
  articles.innerHTML = "";
  localStorage.clear();
  container.classList.remove("show-container");
  clearAlert();
});
