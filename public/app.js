const form = document.querySelector(".grocery-form");
const alert = document.querySelector(".alert");
const input = document.getElementById("grocery");
const container = document.querySelector(".grocery-container");
const articles = document.querySelector(".grocery-list");
const item = document.querySelector(".grocery-item");

const submitBtn = document.querySelector(".submit-btn");
const clearBtn = document.querySelector(".clear-btn");

const showItems = async () => {
  try {
    const {
      data: { items },
    } = await axios.get("/api/v1/grocery");

    addItems(items);
    clearBtn.addEventListener("click", async () => {
      await items.forEach((item) => {
        axios.delete(`/api/v1/grocery/${item._id}`);
      });

      setBackToDefault();
      articles.innerHTML = "";
      container.classList.remove("show-container");
      clearAlert();
    });
  } catch (error) {
    console.log(error);
  }
};
showItems();
// the app major functionality,alerts,submit items to local storage and viewer interface,edit items,delete items,clear storage.....

submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const name = input.value;
  try {
    await axios.post("/api/v1/grocery", { name });
    addalert();
    showItems();
    input.value = " ";
  } catch (error) {
    console.log(error);
  }
});

// ===============alerts functions
function dangeralert() {
  alert.classList.add("alert-danger");
  alert.classList.remove("alert-success");
  alert.textContent = "please add item";
  setTimeout(() => {
    alert.classList.remove("alert-danger");
    alert.textContent = " ";
  }, 1000);
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
  alert.textContent = "item is being  edited";
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
    listItems += `  <article class="grocery-item" >
  <p class="title"  >${arr[i].name}</p>
  <div class="btn-container">
    <button type="button" class="edit-btn" data-edit = ${arr[i]._id}>
      <i class="fas fa-edit"></i>
    </button>
    <button type="button" class="delete-btn" data-delete = ${arr[i]._id}>
      <i class="fas fa-trash"></i>
    </button>
  </div>
</article>`;

    setBackToDefault();
  }
  articles.innerHTML = listItems;

  //=================== delete btn=======
  const deleteBtn = document.querySelectorAll(".delete-btn");
  deleteBtn.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      let deleteId = e.currentTarget.dataset.delete;
      try {
        await axios.delete(`/api/v1/grocery/${deleteId}`);
        showItems();
      } catch (error) {
        console.log(error);
      }
    });
  });

  //=========edit btn =========
  const editBtn = document.querySelectorAll(".edit-btn");
  const submitEdit = document.querySelector(".submit-edit");
  editBtn.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      const editId = e.currentTarget.dataset.edit;

      console.log(editId);
      const itemIndex = arr.findIndex((item) => {
        return item._id === editId;
      });
      input.value = arr[itemIndex].name;

      // event listener to submit
      submitEdit.addEventListener("click", async function () {
        const newName = input.value;
        await axios.patch(`/api/v1/grocery/${editId}`, {
          name: newName,
        });
        showItems();
        submitBtn.textContent = "submit";
      });
      editAlert();
    });
  });
}

// function clear storage and clear items
