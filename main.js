const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');

//Show input error messages
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

//show success colour
function showSucces(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

let Contact = function (name, email, phone) {
    this.name = name;
    this.email = email;
    this.phone = phone;
}

function setUiChanges (lineId, border, cursor, focus, disabled){
    const editInputName = document.getElementById("editInputName"+lineId);
    const editInputEmail = document.getElementById("editInputEmail"+lineId);
    const editInputPhone = document.getElementById("editInputPhone"+lineId);

    const editButton = document.getElementById("editButton"+lineId);

    const endEditing = document.getElementById("endEditing"+lineId);

    if(disabled === "removeAttribute"){
        editInputName.removeAttribute("disabled");
        editInputEmail.removeAttribute("disabled");
        editInputPhone.removeAttribute("disabled");
        endEditing.removeAttribute("disabled");

        editButton.setAttribute("disabled","disabled");
    }else{
        editInputName.setAttribute("disabled","disabled");
        editInputEmail.setAttribute("disabled","disabled");
        editInputPhone.setAttribute("disabled","disabled");
        endEditing.setAttribute("disabled","disabled");

        editButton.removeAttribute("disabled");
    }
    
    editInputName.style.border = border
    editInputName.style.cursor = cursor

    editInputEmail.style.border = border
    editInputEmail.style.cursor = cursor

    editInputPhone.style.border = border
    editInputPhone.style.cursor = cursor

    if(focus) editInputName.focus()

}

function editContact(lineId){
    setUiChanges(lineId, "2px solid #000", "text", true, "removeAttribute")
}

function endEdit(lineId){
    setUiChanges(lineId, "none", "default", false, "setAttribute")
}

function validateEmail() {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let email = document.getElementById('inputEmail').value;
    const success = re.test(email);
    if(success){
        addNewContact()
    }else{
        alert("Email неверный")
    }
}

let contacts = [];
contacts.push(new Contact("Jef", "jef@gmail.com", "255-234-23425"));
contacts.push(new Contact("Dack", "duck@gmail.com", "2554-54354-453"));
contacts.push(new Contact("Micky", "mouse@gmail.com", "4245-245245-245"));
contacts.push(new Contact("Wolf", "wolf@gmail.com", "4253-2354-212"));
contacts.push(new Contact("Spider", "spider@gmail.com", "482-4256-4585"));

let listContacts = function () {
    document.getElementById('displayContacts').innerHTML = " ";
    for (let i = 0; i < contacts.length; i++) {
        document.getElementById('displayContacts').innerHTML += 
        '<tr>'+
            '<td class="name edit" id="name' + i + '">'+
                '<input type="text" class="edit-input" disabled id="editInputName' + i + '" value="'+ contacts[i].name +'">'+
            '</td>'+
            '<td class="email edit" id="email' + i + '">' + 
                '<input type="text" class="edit-input" disabled id="editInputEmail' + i + '" value="'+ contacts[i].email + '">'+
            '</td>'+
            '<td class="number edit" id="phone' + i + '">' + 
                '<input type="text" class="edit-input" disabled id="editInputPhone' + i + '" value="'+ contacts[i].phone + '">'+
            '</td>'+
            '<td>'+
                '<button class="btn btn-warning" type="submit" id="editButton' + i + '" onClick="editContact(' + i + ')">Edit</button>'+
                '<button class="btn btn-success" type="submit" disabled id="endEditing' + i + '" onClick="endEdit(' + i + ')">Done</button></div>'+
                '<button class="btn btn-danger" onclick=deleteContact(' + i + ')>Delete</button>'+
            '</td>'+
        '</tr>';
    }
}

let addNewContact = function () {
    let name = document.getElementById('inputName').value;
    let email = document.getElementById('inputEmail').value;
    let phone = document.getElementById('inputPhone').value;
    let contact = new Contact(name, email, phone);
    contacts.push(contact);
    listContacts();
}

let deleteContact = function (i) {
    contacts.splice(i, 1);
    listContacts();
}


listContacts();