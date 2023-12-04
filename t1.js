document.addEventListener('DOMContentLoaded', function() {
    // Function to load users from a specific page
    function loadUsers(page = 1) {
        fetch(`https://reqres.in/api/users?page=${page}`)
            .then(response => response.json())
            .then(data => {
                const userTableBody = document.getElementById('user-list');
                userTableBody.innerHTML = '';
                data.data.forEach(user => {
                    const userRow = document.createElement('tr');
                    userRow.id = 'user-row-' + user.id;
                    userRow.innerHTML = `
                        <td>${user.id}</td>
                        <td><img src="${user.avatar}" class="rounded-circle" width="30"></td>
                        <td>${user.email}</td>
                        <td>${user.first_name}</td>
                        <td>${user.last_name}</td>
                        <td>
                            <button id="edit-user-${user.id}" class="btn btn-warning btn-sm">Edit</button>
                            <button id="delete-user-${user.id}" class="btn btn-danger btn-sm">Delete</button>
                        </td>
                    `;
                    userTableBody.appendChild(userRow);
                });

                data.data.forEach(user => {
                    const editBtn = document.getElementById('edit-user-' + user.id);
                    const deleteBtn = document.getElementById('delete-user-' + user.id);

                    editBtn.addEventListener('click', () => editUser(user.id));
                    deleteBtn.addEventListener('click', () => deleteUser(user.id));
                });

                const paginationUl = document.getElementById('pagination');
                paginationUl.innerHTML = '';
                for (let i = 1; i <= data.total_pages; i++) {
                    const pageItem = document.createElement('li');
                    pageItem.className = `page-item ${i === page ? 'active' : ''}`;
                    const pageLink = document.createElement('a');
                    pageLink.className = 'page-link';
                    pageLink.href = '#';
                    pageLink.innerText = i;
                    pageLink.addEventListener('click', (e) => {
                        e.preventDefault();
                        loadUsers(i);
                    });
                    pageItem.appendChild(pageLink);
                    paginationUl.appendChild(pageItem);
                }
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }

    // Function to handle Edit button click
    function editUser(userId) {
        console.log('Editing user with ID:', userId);
        $('#editUserModal').modal('show');
    }

    // Function to handle Delete button click
    function deleteUser(userId) {
        const userRow = document.getElementById('user-row-' + userId);
        if (userRow) {
            userRow.remove();
        }
    }

    // Function to register a new user (SignUp)
    function signUp() {
        fetch('https://reqres.in/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'eve.holt@reqres.in',
                password: 'pistol'
            })
        })
        .then(response => response.json())
        .then(data => {
            const messageDiv = document.getElementById('message');
            messageDiv.textContent = 'Registration successful. Status: ' + (data.id ? '200' : '400') + ', Token: ' + data.token;
            messageDiv.style.display = 'block';
        })
        .catch(error => {
            console.error('Error during registration:', error);
        });
    }

    // Function to log in a user (Login)
    function logIn() {
        fetch('https://reqres.in/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'eve.holt@reqres.in',
                password: 'cityslicka'
            })
        })
        .then(response => response.json())
        .then(data => {
            const messageDiv = document.getElementById('message');
            messageDiv.textContent = 'Login successful. Status: ' + (data.token ? '200' : '400') + ', Token: ' + data.token;
            messageDiv.style.display = 'block';
        })
        .catch(error => {
            console.error('Error during login:', error);
        });
    }

    // Function to create a new user (Create User)
    function createUser() {
        $('#createUserModal').modal('show');    
    }

        // Function to handle saving user changes from the edit modal
    function saveUserChanges() {
        const email = document.getElementById('userEmail').value;
        const firstName = document.getElementById('userFirstName').value;
        const lastName = document.getElementById('userLastName').value;

        // Log the values to the console (or send them to a server)
        console.log('Saving changes:', email, firstName, lastName);

        // Simulate a server response for editing user
        const editServerResponse = {
            email: email,
            first_name: firstName,
            last_name: lastName,
            updatedAt: new Date().toISOString()
        };

        // Display the server response for edit
        displayMessage(`Operation succeeded! Server response: ${JSON.stringify(editServerResponse)}`);

        // Close the modal after saving changes
        $('#editUserModal').modal('hide');
    }

    // Function to handle saving new user from the create modal
    function saveNewUser() {
        const email = document.getElementById('newUserEmail').value;
        const firstName = document.getElementById('newUserFirstName').value;
        const lastName = document.getElementById('newUserLastName').value;

        // Log the values to the console (or send them to a server)
        console.log('Creating new user:', email, firstName, lastName);

        // Simulate a server response for creating user
        const createServerResponse = {
            email: email,
            first_name: firstName,
            last_name: lastName,
            createdAt: new Date().toISOString()
        };

        // Display the server response for create
        displayMessage(`User creation succeeded! Server response: ${JSON.stringify(createServerResponse)}`);

        // Close the modal after saving changes
        $('#createUserModal').modal('hide');
    }

    // Utility function to display messages
    function displayMessage(message) {
        const messageDiv = document.getElementById('message');
        messageDiv.textContent = message;
        messageDiv.style.display = 'block';
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }

    // Attach event listeners for button clicks
    document.getElementById('load-users').addEventListener('click', () => loadUsers());
    document.getElementById('create-user').addEventListener('click', createUser);
    document.getElementById('signup-btn').addEventListener('click', signUp);
    document.getElementById('login-btn').addEventListener('click', logIn);

    // Attach the event listener for the Save Changes button on the edit modal
    document.getElementById('saveChangesBtn').addEventListener('click', saveUserChanges);

    // Attach the event listener for the Save Changes button on the create modal
    document.getElementById('createUserSaveBtn').addEventListener('click', saveNewUser);
});

