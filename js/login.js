document.addEventListener('DOMContentLoaded', () => {
    const existingUserBtn = document.getElementById('existingUserBtn');
    const newUserBtn = document.getElementById('newUserBtn');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const userChoice = document.getElementById('user-choice');

    // Mostrar formulario de inicio de sesión
    existingUserBtn.addEventListener('click', () => {
        userChoice.classList.add('hidden');
        loginForm.classList.remove('hidden');
    });

    // Mostrar formulario de registro
    newUserBtn.addEventListener('click', () => {
        userChoice.classList.add('hidden');
        registerForm.classList.remove('hidden');
    });

    // Registrar nuevo usuario
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const username = document.getElementById('registerUsername').value;
        const password = document.getElementById('registerPassword').value;
        const profilePicture = document.getElementById('profilePicture').files[0];

        if (username && password && profilePicture) {
            const reader = new FileReader();
            reader.onload = function() {
                const profilePicUrl = reader.result;
                localStorage.setItem(username, JSON.stringify({
                    username: username,
                    password: password,
                    profilePic: profilePicUrl
                }));
                alert('Usuario registrado con éxito');
                window.location.href = 'dashboard.html'; // Redirigir al dashboard
            };
            reader.readAsDataURL(profilePicture);
        } else {
            alert('Por favor completa todos los campos.');
        }
    });

    // Iniciar sesión
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        const storedUser = localStorage.getItem(username);

        if (storedUser) {
            const userData = JSON.parse(storedUser);
            if (userData.password === password) {
                localStorage.setItem('loggedInUser', username); // Guardar el usuario autenticado
                window.location.href = 'dashboard.html'; // Redirigir al dashboard
            } else {
                alert('Contraseña incorrecta');
            }
        } else {
            alert('El usuario no existe');
        }
    });
});
