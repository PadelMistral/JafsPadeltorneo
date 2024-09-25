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
            stats
        };

        localStorage.setItem(playerName, JSON.stringify(playerProfile));
        alert("Perfil guardado con éxito.");
        displayPlayerCard(playerProfile);
    }

    // Mostrar la carta del jugador con las estadísticas
    function displayPlayerCard(profile) {
        playerCard.innerHTML = `
            <h2>${profile.playerName}</h2>
            <p>Pala: ${profile.paddleName}</p>
            <p>Posición Favorita: ${profile.favPosition}</p>
            <p>Mano Dominante: ${profile.dominantHand}</p>
            <p>Estatura: ${profile.height}m</p>
            <h3>Estadísticas:</h3>
            <p>Defensa: ${profile.stats.defensa}</p>
            <p>Velocidad: ${profile.stats.velocidad}</p>
            <p>Ataque: ${profile.stats.ataque}</p>
            <p>Posicionamiento: ${profile.stats.posicionamiento}</p>
            <p>Visión de Juego: ${profile.stats.visionJuego}</p>
            <p>Intuición: ${profile.stats.intuicion}</p>
            <p>Reflejos: ${profile.stats.reflejos}</p>
            <p>Resto: ${profile.stats.resto}</p>
            <p>Fondo Pista: ${profile.stats.fondoPista}</p>
            <p>Saque: ${profile.stats.saque}</p>
            <p>Golpe Controlado: ${profile.stats.golpeControlado}</p>
            <p>Volea: ${profile.stats.volea}</p>
            <p>Bandeja/Víbora: ${profile.stats.bandejaVibora}</p>
            <p>Bloqueo: ${profile.stats.bloqueo}</p>
            <p>Smash: ${profile.stats.smash}</p>
            <p>Lectura de Rebotes: ${profile.stats.lecturaRebotes}</p>
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
