const users = [
    {
        "id": "323032268",
        "username": "Hazem Habrat",
        "phone": "054343842",
        "photo": "image/idma.png"
    },
    {
        "id": "323032423",
        "username": "Mohmad Mansour",
        "phone": "054567893",
        "photo": "image/idma.png"
    },
    {
        "id": "3230322623",
        "username": "Leo Messi",
        "phone": "0503842424",
        "photo": "image/idma.png"
    },
    {
        "id": "32303223",
        "username": "Cristano Ronaldo",
        "phone": "050387712",
        "photo": "image/idma.png"
    },
    {
        "id": "3230322623",
        "username": "Neymar Jr",
        "phone": "0503877154",
        "photo": "image/idma.png"
    },
    {
        "id": "323032222",
        "username": "Alex Vidal",
        "phone": "050387714",
        "photo": "image/idma.png"
    },
    {
        "id": "3230322641",
        "username": "Luis Suarez",
        "phone": "0503877111",
        "photo": "image/idma.png"
    },
]

// Open the contact modal
function openPopup() {
    document.getElementById('contactModal').style.display = 'flex';
}

// Close the contact modal
function closePopup() {
    document.getElementById('contactModal').style.display = 'none';
}

// Open the contact info modal
function openInfoPopup() {
    document.getElementById('infoModal').style.display = 'flex';
}

// Close the contact info modal
function closeInfoPopup() {
    document.getElementById('infoModal').style.display = 'none';
}

// Load and display contacts
function loadContacts() {
    const contactList = document.querySelector('.contact-list');
    contactList.innerHTML = '';

    // Sort users alphabetically by name
    const sortedUsers = [...users].sort((a, b) => a.username.localeCompare(b.username));

    sortedUsers.forEach(user => {
        const contactItem = document.createElement('li');
        contactItem.classList.add('contact-item');
        contactItem.innerHTML = `
            <div class="contact-info">
                <img src="${user.photo}" alt="Contact Image" class="contact-img">
                <div>
                    <span class="contact-name">${user.username}</span>
                </div>
            </div>
            <div class="actions">
                <button class="info icon" onclick="showContactInfo('${user.id}')"><img src="image/info (3).png" alt=""></button>
                <button class="edit icon" onclick="editContact('${user.id}')"><img src="image/plus.png" alt=""></button>
                <button class="delete icon" onclick="deleteContact('${user.id}')"><img src="image/trash-bin (1).png" alt=""></button>
            </div>
        `;
        contactList.appendChild(contactItem);
    });
    updatePeopleCount();
}

// Save a contact
function saveContact() {
    const id = document.getElementById('contactId').value;
    const name = document.getElementById('contactName').value;
    const phone = document.getElementById('contactPhone').value;
    const imageInput = document.getElementById('contactImage');
    let photo = '';

    // Check for duplicate
    if (!id) {
        const isDuplicate = users.some(user => user.username === name && user.phone === phone);
        if (isDuplicate) {
            alert('This contact already exists!');
            return;
        }
    }

    if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            photo = e.target.result;
            if (id) {
                const user = users.find(u => u.id === id);
                user.username = name;
                user.phone = phone;
                user.photo = photo;
            } else {
                users.push({
                    id: Date.now().toString(),
                    username: name,
                    phone: phone,
                    photo: photo
                });
            }
            closePopup();
            loadContacts();
        }
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        if (id) {
            const user = users.find(u => u.id === id);
            user.username = name;
            user.phone = phone;
        } else {
            users.push({
                id: Date.now().toString(),
                username: name,
                phone: phone,
                photo: 'image/default.png'
            });
        }
        closePopup();
        loadContacts();
    }
}

// Edit a contact
function editContact(id) {
    const user = users.find(u => u.id === id);
    document.getElementById('contactId').value = user.id;
    document.getElementById('contactName').value = user.username;
    document.getElementById('contactPhone').value = user.phone;
    openPopup();
}

// Confirm before deleting a contact
function deleteContact(id) {
    const user = users.find(u => u.id === id);
    const confirmation = confirm(`Are you sure you want to delete ${user.username} from the contacts?`);
    if (confirmation) {
        const userIndex = users.findIndex(u => u.id === id);
        if (userIndex > -1) {
            users.splice(userIndex, 1);
            loadContacts();
        }
    }
}

// Confirm before deleting all contacts
function deleteAllContacts() {
    const confirmation = confirm('Are you sure you want to delete all contacts?');
    if (confirmation) {
        users.length = 0;
        loadContacts();
    }
}

// Show contact info
function showContactInfo(id) {
    const user = users.find(u => u.id === id);
    document.getElementById('infoName').textContent = `Name: ${user.username}`;
    document.getElementById('infoPhone').textContent = `Phone: ${user.phone}`;
    openInfoPopup();
}

// Update the count of people
function updatePeopleCount() {
    const count = users.length;
    document.getElementById('peopleCount').textContent = `${count} People`;
}

// Load contacts on page load
document.addEventListener('DOMContentLoaded', () => {
    loadContacts();
});


function searchContacts() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchValue) ||
        user.phone.includes(searchValue)
    );

    // Sort filtered users alphabetically by name
    const sortedFilteredUsers = filteredUsers.sort((a, b) => a.username.localeCompare(b.username));
    displayFilteredContacts(sortedFilteredUsers);
}

// Display filtered contacts
function displayFilteredContacts(filteredUsers) {
    const contactList = document.querySelector('.contact-list');
    contactList.innerHTML = '';
    filteredUsers.forEach(user => {
        const contactItem = document.createElement('li');
        contactItem.classList.add('contact-item');
        contactItem.innerHTML = `
            <div class="contact-info">
                <img src="${user.photo}" alt="Contact Image" class="contact-img">
                <div>
                    <span class="contact-name">${user.username}</span>
                </div>
            </div>
            <div class="actions">
                <button class="info icon" onclick="showContactInfo('${user.id}')"><img src="image/info (3).png" alt=""></button>
                <button class="edit icon" onclick="editContact('${user.id}')"><img src="image/plus.png" alt=""></button>
                <button class="delete icon" onclick="deleteContact('${user.id}')"><img src="image/trash-bin (1).png" alt=""></button>
            </div>
        `;
        contactList.appendChild(contactItem);
    });
    updatePeopleCount();
}

// Attach search function to search input field
document.getElementById('searchInput').addEventListener('input', searchContacts);
