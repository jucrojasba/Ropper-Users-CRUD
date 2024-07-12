//Global Class ignore

import { IResponseUsers } from "../interfaces/IResponseUsers";


export class User implements IResponseUsers{
    constructor(public id: string, public name: string, public email: string, public avatar: string){}

    public updateUser = async (updatedUser: any) => {
        const updateResponse = await fetch(`http://localhost:3000/users/${this.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        });
    
        if (updateResponse.ok) {
            console.log('User updated successfully');
        } else {
            console.error('Failed to update user');
        }
    };

    public showUserDialog = () => {
        const dialog = document.createElement('dialog');
        dialog.innerHTML = /*html*/`
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
    
        const form = dialog.querySelector('form') as HTMLFormElement;
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
    
            const nameInput = form.querySelector('#name') as HTMLInputElement;
            const emailInput = form.querySelector('#email') as HTMLInputElement;
            const imgInput = form.querySelector('#img') as HTMLInputElement;
    
            if (nameInput.value === '' || emailInput.value === '' || imgInput.value === '') {
                alert('Please complete all fields.');
                return;
            }
    
            const updatedUser = {
                name: nameInput.value,
                email: emailInput.value,
                avatar: imgInput.value
            };
    
            await this.updateUser(updatedUser);
            dialog.remove();
    
    
        });
    
        document.body.appendChild(dialog);
        dialog.showModal();
        dialog.addEventListener('cancel', () => {
            dialog.remove();
        });
    };

    public deleteUser = async () => {
        const deleteResponse = await fetch(`http://localhost:3000/users/${this.id}`, {
            method: 'DELETE'
        });
    
        if (deleteResponse.ok) {
            alert('User deleted successfully');
            document.location.reload();
        } else {
            console.error('Failed to delete user');
            alert('Failed to delete user');
        }
    };
    
}