
const users = JSON.parse(localStorage.getItem('users')) || [];
const posts = JSON.parse(localStorage.getItem('posts')) || [];

function saveUsers() {
    localStorage.setItem('users', JSON.stringify(users));
}

function savePosts() {
    localStorage.setItem('posts', JSON.stringify(posts));
}


function displayPosts() {
    const postsList = document.getElementById('postsList');
    postsList.innerHTML = '';
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `<strong>${post.username}</strong><p>${post.content}</p>`;
        postsList.appendChild(postElement);
    });
}


if (document.getElementById('registerForm')) {
    document.getElementById('registerForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const name = document.getElementById('name').value;
        const surname = document.getElementById('surname').value;
        
        users.push({ username, password, name, surname });
        saveUsers();
        alert('Cuenta creada exitosamente!');
        window.location.href = 'login.html';
    });
}


if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            window.location.href = 'index/indexF.html';
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    });
}


if (document.getElementById('logoutLink')) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        document.getElementById('logoutLink').style.display = 'inline';
        document.getElementById('logoutLink').addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            window.location.href = 'indexF.html';
        });
    }
}


if (document.getElementById('postsSection') && localStorage.getItem('currentUser')) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const postContent = prompt('Escribe tu publicación:');
    
    if (postContent) {
        posts.push({ username: currentUser.username, content: postContent });
        savePosts();
        displayPosts();
    }
}

if (document.getElementById('postsSection')) {
    displayPosts();
}
