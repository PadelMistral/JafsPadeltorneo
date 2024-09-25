document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("profile-form");
    const saveBtn = document.getElementById("save-profile");
    const editBtn = document.getElementById("edit-stats");
    const playerCard = document.getElementById("player-card");
    let isAdmin = false;

    // Función para guardar el perfil en localStorage
    function saveProfile() {
        const playerName = document.getElementById("player-name").value;
        const paddleName = document.getElementById("paddle-name").value;
        const favPosition = document.getElementById("fav-position").value;
        const dominantHand = document.getElementById("dominant-hand").value;
        const height = document.getElementById("height").value;

        // Subir imagen de perfil
        const playerPhoto = document.getElementById("player-photo").files[0];
        const reader = new FileReader();
        reader.onloadend = function () {
            const photoBase64 = reader.result;

            const stats = {
                defensa: document.getElementById("defensa").value,
                velocidad: document.getElementById("velocidad").value,
                ataque: document.getElementById("ataque").value,
                posicionamiento: document.getElementById("posicionamiento").value,
                visionJuego: document.getElementById("vision-juego").value,
                intuicion: document.getElementById("intuicion").value,
                reflejos: document.getElementById("reflejos").value,
                resto: document.getElementById("resto").value,
                fondoPista: document.getElementById("fondo-pista").value,
                saque: document.getElementById("saque").value,
                golpeControlado: document.getElementById("golpe-controlado").value,
                volea: document.getElementById("volea").value,
                bandejaVibora: document.getElementById("bandeja-vibora").value,
                bloqueo: document.getElementById("bloqueo").value,
                smash: document.getElementById("smash").value,
                lecturaRebotes: document.getElementById("lectura-rebotes").value,
            };

            const playerProfile = {
                playerName,
                paddleName,
                favPosition,
                dominantHand,
                height,
                photo: photoBase64,
                stats
            };

            localStorage.setItem(playerName, JSON.stringify(playerProfile));
            alert("Perfil guardado con éxito.");
            displayPlayerCard(playerProfile);
        };

        if (playerPhoto) {
            reader.readAsDataURL(playerPhoto);
        }
    }

    // Calcular la nota general basada en las estadísticas
    function calculateRating(stats) {
        const statValues = Object.values(stats).map(Number);
        const total = statValues.reduce((acc, curr) => acc + curr, 0);
        const average = total / statValues.length;

        // Escalar la nota entre 65 y 98
        return Math.round(65 + (average / 10) * (98 - 65));
    }

    // Mostrar la carta del jugador con las estadísticas
    function displayPlayerCard(profile) {
        const rating = calculateRating(profile.stats);

        playerCard.innerHTML = `
            <div class="player-rating">${rating}</div>
            <img class="player-photo" src="${profile.photo}" alt="Foto del jugador">
            <h2 class="player-name">${profile.playerName}</h2>
            <p>Pala: ${profile.paddleName}</p>
            <p>Posición: ${profile.favPosition}</p>
            <p>Mano: ${profile.dominantHand}</p>
            <p>Estatura: ${profile.height}m</p>
            <div class="card-stats">
                <div class="stat"><span class="stat-label">Defensa</span><span class="stat-value">${profile.stats.defensa}</span></div>
                <div class="stat"><span class="stat-label">Velocidad</span><span class="stat-value">${profile.stats.velocidad}</span></div>
                <div class="stat"><span class="stat-label">Ataque</span><span class="stat-value">${profile.stats.ataque}</span></div>
                <div class="stat"><span class="stat-label">Posicionamiento</span><span class="stat-value">${profile.stats.posicionamiento}</span></div>
                <div class="stat"><span class="stat-label">Visión</span><span class="stat-value">${profile.stats.visionJuego}</span></div>
                <div class="stat"><span class="stat-label">Intuición</span><span class="stat-value">${profile.stats.intuicion}</span></div>
                <!-- Continuar con las demás estadísticas -->
            </div>
        `;
        playerCard.style.display = "block";
    }

    // Evento para guardar el perfil
    saveBtn.addEventListener("click", saveProfile);

    // Evento para permitir edición solo al administrador
    editBtn.addEventListener("click", function () {
        const password = prompt("Introduce la clave de administrador:");
        if (password === "admin123") {
            isAdmin = true;
            alert("Modo Administrador activado. Puedes modificar las estadísticas.");
        } else {
            alert("Contraseña incorrecta.");
        }
    });
});
