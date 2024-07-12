var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { User } from "./classes/user.js";
import { Users } from "./classes/users.js";
import { UserManager } from "./classes/userManager.js";
document.addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    const users = new Users(); //**Instanciar */
    const items = document.querySelector('.item-list');
    const listUsers = yield users.getUser();
    listUsers.forEach((userItem) => {
        const user = new User(userItem.id, userItem.name, userItem.email, userItem.avatar); //**Instanciar */
        const div = document.createElement('div');
        div.classList.add('item');
        div.innerHTML = /*html*/ `
            <img src="${user.avatar}" alt="${user.name}"/>
            <h3>${user.name}</h3>
            <p>${user.email}</p>
            <div class="buttons">
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </div>
        `;
        const editButton = div.querySelector('.edit');
        const deleteButton = div.querySelector('.delete');
        editButton.addEventListener('click', () => {
            user.showUserDialog();
            console.log(user);
        });
        deleteButton.addEventListener('click', () => {
            user.deleteUser();
        });
        items.appendChild(div);
    });
}));
const userManager = new UserManager(); //*Instanciar */
const createButton = document.querySelector('.createButton');
createButton.addEventListener('click', () => {
    userManager.showDialog();
});
