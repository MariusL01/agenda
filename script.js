let nameElement = document.querySelector("#name");
let phoneNumberElement = document.querySelector("#phoneNumber");
const addContactElement = document.querySelector("#addContactButton");
const tableElement = document.querySelector("table");
let pressedEdit = false;
let clickedElement;

addContactElement.addEventListener("click", addContact);
tableElement.addEventListener("click", removeOrEdit);
phoneNumberElement.addEventListener("keyup", addContactWithEnter);
nameElement.addEventListener("keyup", addContactWithEnter);

function addContact() {
  if (nameElement.value != "" && phoneNumberElement.value != "") {
    const showAgenda = document.querySelector(".agenda");

    showAgenda.style.display = "initial";

    pressedEdit ? modify(clickedElement) : createNewRow();
    reinitializeInputs();
  }
}

function reinitializeInputs() {
  nameElement.value = "";
  phoneNumberElement.value = "";
  pressedEdit = false;
  return pressedEdit;
}

function createNewRow() {
  const createRow = document.createElement("tr");
  const createCell1 = document.createElement("td");
  const createCell2 = document.createElement("td");
  const createCell3 = document.createElement("td");

  createCell1.innerHTML = nameElement.value;
  createCell2.innerHTML = phoneNumberElement.value;
  createCell3.innerHTML = `<i class="fas fa-edit" id="edit"></i>
  <i class="fas fa-sharp fa-solid fa-xmark" id="removeRow"></i>`;

  tableElement.appendChild(createRow);
  createRow.appendChild(createCell1);
  createRow.appendChild(createCell2);
  createRow.appendChild(createCell3);
}

function removeOrEdit(e) {
  clickedElement = e.target;

  if (clickedElement.id == "removeRow") {
    remove(clickedElement);
  } else if (clickedElement.id == "edit") {
    edit(clickedElement);
    return pressedEdit;
  }
}

function remove(clickedElement) {
  const clickedElementCopy = clickedElement;
  clickedElementCopy.parentNode.parentNode.remove();
}

function edit(clickedElement) {
  pressedEdit = true;
  let firstCell = clickedElement.parentNode.parentNode.firstChild;
  nameElement.value = firstCell.innerText;
  phoneNumberElement.value = firstCell.nextSibling.innerText;
  return pressedEdit;
}

function addContactWithEnter(e) {
  if (e.key === "Enter") {
    addContact();
  }
}

function modify(clickedElement) {
  let newName = nameElement.value;
  let newPhoneNumber = phoneNumberElement.value;

  clickedElement.parentNode.parentNode.firstChild.innerText = newName;
  clickedElement.parentNode.parentNode.firstChild.nextSibling.innerText =
    newPhoneNumber;
}
