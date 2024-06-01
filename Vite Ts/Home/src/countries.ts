const api_url = "https://api.escuelajs.co/api/v1/users";

type User = {
  id: number;
  email: string;
  name: string;
  role: string;
  avatar: string;
};

async function fetchUsers(): Promise<User[]> {
  try {
    const response = await fetch(api_url);
    console.log('Response status:', response.status); // Log the response status
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const users: User[] = await response.json();
    console.log('Fetched users:', users); // Debugging line
    return users;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return [];
  }
}

async function renderUsers(): Promise<void> {
  const container = document.querySelector(".container");
  if (!container) {
    console.error("Container element not found");
    return;
  }

  const users = await fetchUsers();
  if (users.length === 0) {
    container.innerHTML = '<p>No users found or failed to fetch users.</p>';
    return;
  }

  users.forEach((user) => {
    const userCard = document.createElement("div");
    userCard.className = "user-card";

    const avatar = document.createElement("img");
    avatar.src = user.avatar;
    avatar.alt = `${user.name}'s avatar`;

    const userName = document.createElement("h2");
    userName.textContent = user.name;

    const userEmail = document.createElement("p");
    userEmail.textContent = `Email: ${user.email}`;

    const userRole = document.createElement("p");
    userRole.textContent = `Role: ${user.role}`;

    userCard.appendChild(avatar);
    userCard.appendChild(userName);
    userCard.appendChild(userEmail);
    userCard.appendChild(userRole);

    container.appendChild(userCard);
  });
}

document.addEventListener("DOMContentLoaded", renderUsers);
