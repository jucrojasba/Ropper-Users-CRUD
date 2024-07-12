export class UserManager {
    private dialog: HTMLDialogElement;
    private form: HTMLFormElement;

    constructor() {
        this.dialog = document.createElement('dialog');
        this.dialog.innerHTML = /*html*/`
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

        this.form = this.dialog.querySelector('form') as HTMLFormElement;
        this.form.addEventListener('submit', this.handleSubmit.bind(this));

        document.body.appendChild(this.dialog);
        this.dialog.addEventListener('cancel', this.handleCancel.bind(this));
    }


    public showDialog() {
        this.dialog.showModal();
        this.dialog.addEventListener('cancel', () => {
            this.dialog.remove();
            document.location.reload();
        });
    }

    private async handleSubmit(event: Event) {
        event.preventDefault();
    
        const nameInput = this.form.querySelector('#name') as HTMLInputElement;
        const emailInput = this.form.querySelector('#email') as HTMLInputElement;
        const imgInput = this.form.querySelector('#img') as HTMLInputElement;
    
        if (nameInput.value === '' || emailInput.value === '' || imgInput.value === '') {
            alert('Please complete all fields.');
            return;
        }
    
        const newUser = {
            name: nameInput.value,
            email: emailInput.value,
            avatar: imgInput.value
        };
    
        await this.addUser(newUser);
        this.dialog.remove();
    }

    private async addUser(newUser: { name: string; email: string; avatar: string }) {
        const addResponse = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        });

        if (addResponse.ok) {
            console.log('User added successfully');
            document.location.reload();
        } else {
            console.error('Failed to add user');
        }
    }

    private handleCancel() {
        this.dialog.remove();
    }
}