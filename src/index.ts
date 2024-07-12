
document.addEventListener("DOMContentLoaded", async () => {

    const items = document.querySelector('.item-list') as HTMLDivElement;
    const data = await fetchData();

    data.forEach((item: any) => {
        const div = document.createElement('div');
        div.classList.add('item');
        div.innerHTML = /*html*/`
            <img src="${item.avatar}" alt="${item.name}"/>
            <h3>${item.name}</h3>
            <p>${item.email}</p>
            <div class="buttons">
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </div>
        `;

        const editButton = div.querySelector('.edit') as HTMLButtonElement;
        const deleteButton = div.querySelector('.delete') as HTMLButtonElement;

        editButton.addEventListener('click', () => {
            showUserDialog(item);
        });

        deleteButton.addEventListener('click', () => {
            deleteUser(item.id);
        });

        items.appendChild(div);
    });
});

//Function to fetch data
const fetchData = async () => {
    const response = await fetch('http://localhost:3000/users');
    const data = await response.json();
    return data;
};

//Function to show user dialog
const showUserDialog = (user: any) => {
    const dialog = document.createElement('dialog');
    dialog.innerHTML = /*html*/`
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

        await updateUser(user.id, updatedUser);
        dialog.remove();


    });

    document.body.appendChild(dialog);
    dialog.showModal();
    dialog.addEventListener('cancel', () => {
        dialog.remove();
    });
};

//Function to update user
const updateUser = async (userId: number, updatedUser: any) => {
    const updateResponse = await fetch(`http://localhost:3000/users/${userId}`, {
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


//Function to delete user
const deleteUser = async (userId: number) => {
    const deleteResponse = await fetch(`http://localhost:3000/users/${userId}`, {
        method: 'DELETE'
    });

    if (deleteResponse.ok) {
        console.log('User deleted successfully');
        document.location.reload();
    } else {
        console.error('Failed to delete user');
    }
};


//Class to manage user
class UserManager {
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

const userManager = new UserManager();
const createButton = document.querySelector('.createButton') as HTMLElement;
createButton.addEventListener('click', () => {
    userManager.showDialog();
});



