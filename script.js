const API_URL = 'https://jsonplaceholder.typicode.com/users';
const userListDiv = document.getElementById('user-list');
const statusDiv = document.getElementById('status');

        function setStatus(message) {
            statusDiv.textContent = message;
        }

        
        function renderUserCard(user, isFirstUser = false) {
            const card = document.createElement('div');
            card.className = 'user-card';
            card.id = `user-${user.id}`;

            card.innerHTML = `
                <h3>${user.name}</h3>
                <p>Email: <span class="user-email">${user.email}</span></p>
                ${isFirstUser ? `<button onclick="updateUserEmail(${user.id})">Update Email</button>` : ''}
                <button onclick="deleteUser(${user.id})">Delete</button>
            `;
            return card;
        }

      
        async function loadUsers() {
            setStatus("Loading...");
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error(`Failed to fetch users: ${response.status}`);
                }
                const users = await response.json();
                userListDiv.innerHTML = ''; 
                
                users.forEach((user, index) => {
                    const isFirstUser = index === 0;
                    const card = renderUserCard(user, isFirstUser);
                    userListDiv.appendChild(card);
                });
                setStatus(""); 
            } catch (error) {
                setStatus(`Error: ${error.message}. Please try again.`);
            }
        }

        // TASK 2: CREATE USER (POST)
        document.getElementById('btn-create').addEventListener('click', async () => {
            setStatus("Loading...");
            const newUser = {
                name: "John Doe",
                email: "john@example.com"
            };

            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                });

                if (!response.ok) {
                    throw new Error(`Failed to add user: ${response.status}`);
                }

                const createdUser = await response.json();
           
                createdUser.id = Date.now(); 
                
                const card = renderUserCard(createdUser, false);
                userListDiv.appendChild(card);
                setStatus("User added successfully!");
            } catch (error) {
                setStatus(`Error: ${error.message}`);
            }
        });

     
        async function updateUserEmail(userId) {
            setStatus("Loading...");
            const updatedData = {
                name: "Leanne Graham", // मौजूदा फ़ील्ड्स को सुरक्षित रखना (PUT नियम)
                email: "updated@example.com"
            };

            try {
                const response = await fetch(`${API_URL}/${userId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedData)
                });

                if (!response.ok) {
                    throw new Error(`Failed to update email: ${response.status}`);
                }

                const updatedUser = await response.json();
                
             
                const card = document.getElementById(`user-${userId}`);
                if (card) {
                    card.querySelector('.user-email').textContent = updatedUser.email;
                }
                setStatus("Email updated successfully!");
            } catch (error) {
                setStatus(`Error: ${error.message}`);
            }
        }

        
        async function deleteUser(userId) {
            setStatus("Loading...");
            try {
                const response = await fetch(`${API_URL}/${userId}`, {
                    method: 'DELETE'
                });

                if (!response.ok) {
                    throw new Error(`Failed to delete user: ${response.status}`);
                }

               
                const card = document.getElementById(`user-${userId}`);
                if (card) {
                    card.remove();
                }
                setStatus("User deleted successfully!");
            } catch (error) {
                setStatus(`Error: ${error.message}`);
            }
        }

        
        loadUsers();
