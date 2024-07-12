//Global Class ignore
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class User {
    constructor(id, name, email, avatar) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.avatar = avatar;
        this.updateUser = (updatedUser) => __awaiter(this, void 0, void 0, function* () {
            const updateResponse = yield fetch(`http://localhost:3000/users/${this.id}`, {
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
        this.showUserDialog = () => {
            const dialog = document.createElement('dialog');
            dialog.innerHTML = /*html*/ `
            <form method="dialog">
                <label for="name">Name:</label>
                <input type="text" id="name" value="${this.name}">
                <label for="email">Email:</label>
                <input type="email" id="email" value="${this.email}">
                <label for="img">Avatar URL:</label>
                <input type="text" id="img" value="${this.avatar}">
                <button type="submit">Update</button>
            </form>
        `;
            const form = dialog.querySelector('form');
            form.addEventListener('submit', (event) => __awaiter(this, void 0, void 0, function* () {
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
                yield this.updateUser(updatedUser);
                dialog.remove();
            }));
            document.body.appendChild(dialog);
            dialog.showModal();
            dialog.addEventListener('cancel', () => {
                dialog.remove();
            });
        };
        this.deleteUser = () => __awaiter(this, void 0, void 0, function* () {
            const deleteResponse = yield fetch(`http://localhost:3000/users/${this.id}`, {
                method: 'DELETE'
            });
            if (deleteResponse.ok) {
                alert('User deleted successfully');
                document.location.reload();
            }
            else {
                console.error('Failed to delete user');
                alert('Failed to delete user');
            }
        });
    }
}
