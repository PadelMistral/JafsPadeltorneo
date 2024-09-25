document.addEventListener('DOMContentLoaded', function() {
    // Obtener el nombre del usuario y la imagen de perfil de localStorage
    const userName = localStorage.getItem('loggedInUser');
    const userProfilePic = localStorage.getItem('userProfilePic') || 'ruta-a-imagen-default.jpg'; // Reemplazar con la imagen predeterminada

    // Actualizar la información del perfil en la página
    document.getElementById('user-name').textContent = userName || 'Usuario';
    document.getElementById('user-profile-pic').src = userProfilePic;

    // Cerrar sesión al hacer clic en "Cerrar sesión"
    document.getElementById('logout').addEventListener('click', function() {
        // Eliminar los datos de la sesión del usuario de localStorage
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('userProfilePic');

        // Redirigir a la página de inicio de sesión
        window.location.href = 'login.html'; // Cambia la ruta si tu archivo de login tiene otro nombre
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const profileImage = document.querySelector('.user-profile img');
    const profileMenu = document.querySelector('.profile-menu');

    profileImage.addEventListener('click', (event) => {
        event.stopPropagation(); // Evita que el clic se propague
        profileMenu.classList.toggle('show');
    });

    // Cerrar el menú si se hace clic fuera de él
    document.addEventListener('click', () => {
        profileMenu.classList.remove('show');
    });
});
