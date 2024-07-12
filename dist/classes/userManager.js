var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class UserManager {
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
