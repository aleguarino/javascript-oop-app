class User {

    constructor(name, email, age) {
        this.name = name;
        this.email = email;
        this.age = age;
    }

}

class View {
    static addUser(user) {
        const userList = document.getElementById('user-list');
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>User Name</strong>: ${user.name}
                    <strong>User Email</strong>: ${user.email}
                    <strong>User Age</strong>: ${user.age}
                    <a class="btn btn-danger" name="delete">delete</a>
                </div>
            </div>
        `;
        userList.appendChild(element);
        this.showMessage('User added', 'success');
    }

    static deleteUser(element) {
        element.parentElement.parentElement.parentElement.remove();
        this.showMessage('User deleted', 'danger');
    }

    static showMessage(message, type) {
        const element = document.createElement('div');
        element.className = `alert alert-${type} mt-2`;
        element.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const app = document.querySelector('#app');
        container.insertBefore(element, app);
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    static resetForm() {
        document.getElementById('user-form').reset();
    }
}

// DOM Events'
document.getElementById('user-form')
    .addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const age = document.getElementById('age').value;
        if (name === '' || email === '' || age === '') {
            return View.showMessage('Introduce todos los campos del usuario', 'danger');
        }
        const user = new User(name, email, age);
        View.addUser(user);
        View.resetForm();
    });

document.getElementById('user-list')
    .addEventListener('click', (e) => {
        if (e.target.name === 'delete')
            View.deleteUser(e.target);
    });