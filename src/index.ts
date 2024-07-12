import { IResponseUsers } from "./interfaces/IResponseUsers.js";
import { User } from "./classes/user.js";
import { Users } from "./classes/users.js";
import { UserManager } from "./classes/userManager.js";

document.addEventListener("DOMContentLoaded", async () => {

    const users = new Users(); //**Instanciar */

    const items = document.querySelector('.item-list') as HTMLDivElement;
    const listUsers:IResponseUsers[] = await users.getUser();

    listUsers.forEach((userItem: IResponseUsers) => {
        const user = new User(userItem.id, userItem.name, userItem.email, userItem.avatar); //**Instanciar */
        const div = document.createElement('div');
        div.classList.add('item');
        div.innerHTML = /*html*/`
            <img src="${user.avatar}" alt="${user.name}"/>
            <h3>${user.name}</h3>
            <p>${user.email}</p>
            <div class="buttons">
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </div>
        `;

        const editButton = div.querySelector('.edit') as HTMLButtonElement;
        const deleteButton = div.querySelector('.delete') as HTMLButtonElement;

        editButton.addEventListener('click', () => {
            user.showUserDialog();
            console.log(user);
        });

        deleteButton.addEventListener('click', () => {
            user.deleteUser();
        });

        items.appendChild(div);
    });
});

const userManager = new UserManager(); //*Instanciar */
const createButton = document.querySelector('.createButton') as HTMLElement;
createButton.addEventListener('click', () => {
    userManager.showDialog();
});