document.getElementById('userForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
        loadUsers();
        document.getElementById('userForm').reset();
    }
});

async function loadUsers() {
    const response = await fetch('/users');
    const users = await response.json();

    const tbody = document.querySelector('#userTable tbody');
    tbody.innerHTML = '';

    users.forEach((user) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>
                <button onclick="deleteUser(${user.id})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

async function deleteUser(id) {
    await fetch(`/users/${id}`, { method: 'DELETE' });
    loadUsers();
}

loadUsers();
