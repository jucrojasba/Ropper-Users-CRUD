"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    const items = document.querySelector('.item-list');
    const data = yield fetchData();
    data.forEach((item) => {
        const div = document.createElement('div');
        div.classList.add('item');
        div.innerHTML = /*html*/ `
            <img src="${item.avatar}" alt="${item.name}"/>
            <h3>${item.name}</h3>
            <p>${item.email}</p>
            <div class="buttons">
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </div>
        `;
        const editButton = div.querySelector('.edit');
        const deleteButton = div.querySelector('.delete');
        editButton.addEventListener('click', () => {
            showUserDialog(item);
        });
        deleteButton.addEventListener('click', () => {
            deleteUser(item.id);
        });
        items.appendChild(div);
    });
}));
//Function to fetch data
const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch('http://localhost:3000/users');
    const data = yield response.json();
    return data;
});
//Function to show user dialog
const showUserDialog = (user) => {
    const dialog = document.createElement('dialog');
    dialog.innerHTML = /*html*/ `
        <form method="dialog">
            <label for="name">Name:</label>
            <input type="text" id="name" value="${user.name}">
            <label for="email">Email:</label>
            <input type="email" id="email" value="${user.email}">
            <label for="img">Avatar URL:</label>
            <input type="text" id="img" value="${user.avatar}">
            <button type="submit">Update</button>
        </form>
    `;
    const form = dialog.querySelector('form');
    form.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        const nameInput = form.querySelector('#name');
        const emailInput = form.querySelector('#email');
        const imgInput = form.querySelector('#img');
        if (nameInput.value === '' || emailInput.value === '' || imgInput.value === '') {
            alert('Please complete all fields.');
            return;
        }
        const updatedUser = {
            name: nameInput.value,
            email: emailInput.value,
            avatar: imgInput.value
        };
        yield updateUser(user.id, updatedUser);
        dialog.remove();
    }));
    document.body.appendChild(dialog);
    dialog.showModal();
    dialog.addEventListener('cancel', () => {
        dialog.remove();
    });
};
//Function to update user
const updateUser = (userId, updatedUser) => __awaiter(void 0, void 0, void 0, function* () {
    const updateResponse = yield fetch(`http://localhost:3000/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUser)
    });
    if (updateResponse.ok) {
        console.log('User updated successfully');
    }
    else {
        console.error('Failed to update user');
    }
});
//Function to delete user
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteResponse = yield fetch(`http://localhost:3000/users/${userId}`, {
        method: 'DELETE'
    });
    if (deleteResponse.ok) {
        console.log('User deleted successfully');
        document.location.reload();
    }
    else {
        console.error('Failed to delete user');
    }
});
//Class to manage user
class UserManager {
    constructor() {
        this.dialog = document.createElement('dialog');
        this.dialog.innerHTML = /*html*/ `
            <form method="dialog">
                <label for="name">Name:</label>
                <input type="text" id="name">
                <label for="email">Email:</label>
                <input type="email" id="email">
                <label for="img">Avatar URL:</label>
                <input type="text" id="img" value="https://randomuser.me/api/portraits/men/1.jpg">
                <button type="submit">Add</button>
            </form>
        `;
        this.form = this.dialog.querySelector('form');
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        document.body.appendChild(this.dialog);
        this.dialog.addEventListener('cancel', this.handleCancel.bind(this));
    }
    showDialog() {
        this.dialog.showModal();
        this.dialog.addEventListener('cancel', () => {
            this.dialog.remove();
            document.location.reload();
        });
    }
    handleSubmit(event) {
        return __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            const nameInput = this.form.querySelector('#name');
            const emailInput = this.form.querySelector('#email');
            const imgInput = this.form.querySelector('#img');
            if (nameInput.value === '' || emailInput.value === '' || imgInput.value === '') {
                alert('Please complete all fields.');
                return;
            }
            const newUser = {
                name: nameInput.value,
                email: emailInput.value,
                avatar: imgInput.value
            };
            yield this.addUser(newUser);
            this.dialog.remove();
        });
    }
    addUser(newUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const addResponse = yield fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            });
            if (addResponse.ok) {
                console.log('User added successfully');
                document.location.reload();
            }
            else {
                console.error('Failed to add user');
            }
        });
    }
    handleCancel() {
        this.dialog.remove();
    }
}
const userManager = new UserManager();
const createButton = document.querySelector('.createButton');
createButton.addEventListener('click', () => {
    userManager.showDialog();
});
