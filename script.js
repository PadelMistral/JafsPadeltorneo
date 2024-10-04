document.addEventListener("DOMContentLoaded", function() {
    const choiceContainer = document.getElementById("choiceContainer");
    const registerForm = document.getElementById("registerForm");
    const loginForm = document.getElementById("loginForm");
    
    const loginButton = document.getElementById("loginButton");
    const registerButton = document.getElementById("registerButton");
    
    const regUsernameInput = document.getElementById("regUsername");
    const regPasswordInput = document.getElementById("regPassword");
    const loginUsernameInput = document.getElementById("loginUsername");
    const loginPasswordInput = document.getElementById("loginPassword");
    
    const backToChoice = document.getElementById("backToChoice");
    const backToChoiceLogin = document.getElementById("backToChoiceLogin");

    // Mostrar formulario de registro o inicio de sesión
    loginButton.addEventListener("click", function() {
        choiceContainer.classList.add("hidden");
        loginForm.classList.remove("hidden");
    });

    registerButton.addEventListener("click", function() {
        choiceContainer.classList.add("hidden");
        registerForm.classList.remove("hidden");
    });

    // Volver a la elección
    backToChoice.addEventListener("click", function() {
        registerForm.classList.add("hidden");
        choiceContainer.classList.remove("hidden");
    });

    backToChoiceLogin.addEventListener("click", function() {
        loginForm.classList.add("hidden");
        choiceContainer.classList.remove("hidden");
    });

    // Registro de nuevo usuario
    document.getElementById("registration").addEventListener("submit", function(event) {
        event.preventDefault();

        const username = regUsernameInput.value;
        const password = regPasswordInput.value;

        // Guardar en localStorage
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);

        alert("Registro exitoso. Ahora puedes iniciar sesión.");
        registerForm.classList.add("hidden");
        choiceContainer.classList.remove("hidden");
    });

    // Iniciar sesión de usuario
    document.getElementById("login").addEventListener("submit", function(event) {
        event.preventDefault();

        const username = loginUsernameInput.value;
        const password = loginPasswordInput.value;

        // Verificar si el usuario existe en localStorage
        const storedUsername = localStorage.getItem("username");
        const storedPassword = localStorage.getItem("password");

        if (username === storedUsername && password === storedPassword) {
            // Mostrar pantalla de carga con el nombre de usuario
            showLoadingScreen(username);
            setTimeout(() => {
                window.location.href = 'inicio.html';
            }, 5000); // 5 segundos de espera
        } else {
            alert("Nombre de usuario o contraseña incorrectos.");
        }
    });

    function showLoadingScreen(username) {
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'loading';
        loadingDiv.innerHTML = `
            <img src="imagenes/images.png" alt="Cargando...">
            <div class="loading-message">Bienvenido, <span class="username"> ${username} </span> estas uniéndote a la mejor comunidad de pádel...</div>
        `;
        document.body.appendChild(loadingDiv);
    }
});
