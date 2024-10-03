

const partidos = [
    { hora: "17:15 - 18:30", equipo1: "Juanan/Victor", equipo2: "Adri/Javi", dia: 'dia1' },
    { hora: "18:30 - 19:45", equipo1: "Mario/Carlos", equipo2: "Jaime/Manu", dia: 'dia1' },
    { hora: "19:45 - 21:00", equipo1: "Victor/Jaime", equipo2: "David/Luis", dia: 'dia1' },
    { hora: "21:00 - 22:15", equipo1: "Peri/Raico", equipo2: "Jaime/Manu", dia: 'dia1' },
    { hora: "9:30 - 10:45", equipo1: "Paco/Rafa", equipo2: "Angelo/Jose Luis", dia: 'dia2' },
    { hora: "10:45 - 12:00", equipo1: "Mario/Carlos", equipo2: "David M/Sergio M", dia: 'dia2' },
    { hora: "12:00 - 13:15", equipo1: "Paco/Rafa", equipo2: "Victor/Jaime", dia: 'dia2' },
    { hora: "16:00 - 17:15", equipo1: "Peri/Raico", equipo2: "David M/Sergio M", dia: 'dia2' },
    { hora: "17:15 - 18:30", equipo1: "Vissen/Sergio", equipo2: "Adri/Javi", dia: 'dia2' },
    { hora: "18:30 - 19:45", equipo1: "Peri/Raico", equipo2: "Mario/Carlos", dia: 'dia2' },
    { hora: "19:45 - 21:00", equipo1: "Jaime/Manu", equipo2: "David M/Sergio M", dia: 'dia2' },
    { hora: "21:00 - 22:15", equipo1: "David/Luis", equipo2: "Angelo/Jose Luis", dia: 'dia2' },
    { hora: "9:30 - 10:45", equipo1: "Angelo/Jose Luis", equipo2: "Victor/Jaime", dia: 'dia3' },
    { hora: "10:45 - 12:00", equipo1: "Juanan/Victor", equipo2: "Vissen/Sergio", dia: 'dia3' },
    { hora: "12:00 - 13:15", equipo1: "David/Luis", equipo2: "Paco/Rafa", dia: 'dia3' }
];

// Función para cargar los partidos en las tablas
function cargarPartidos() {
    partidos.forEach(partido => {
        const matchesDia = document.querySelector(`#${partido.dia}`);
        const matchBox = document.createElement("div");
        matchBox.className = "match";
        matchBox.id = `${partido.dia}-${partido.hora}`;

        // Obtener resultado del localStorage
        const matchId = `${partido.dia}-${partido.hora}`;
        const resultadoGuardado = JSON.parse(localStorage.getItem(matchId));

        // Si hay resultado guardado, mostrarlo
        if (resultadoGuardado) {
            matchBox.innerHTML = `
                <span>${partido.equipo1} vs ${partido.equipo2}</span>
                <span>${resultadoGuardado.puntosEquipo1} - ${resultadoGuardado.puntosEquipo2}</span>
                <button class="btnReset" data-match-id="${matchId}">Resetear</button>
            `;
        } else {
            matchBox.innerHTML = `
                <span>${partido.hora}</span>
                <span>${partido.equipo1} vs ${partido.equipo2}</span>
                <button class="btnResultado" data-equipo1="${partido.equipo1}" data-equipo2="${partido.equipo2}" data-hora="${partido.hora}" data-dia="${partido.dia}">Añadir resultado</button>
            `;
        }

        matchesDia.appendChild(matchBox);
    });
}

// Modal
const modal = document.getElementById("modalResultado");
const spanClose = document.getElementsByClassName("close")[0];
let partidoSeleccionado;

// Abrir el modal
document.addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("btnResultado")) {
        partidoSeleccionado = {
            equipo1: e.target.getAttribute("data-equipo1"),
            equipo2: e.target.getAttribute("data-equipo2"),
            hora: e.target.getAttribute("data-hora"),
            dia: e.target.getAttribute("data-dia")
        };

        document.getElementById("modalPartido").textContent = `Resultado: ${partidoSeleccionado.equipo1} vs ${partidoSeleccionado.equipo2}`;
        modal.style.display = "block";
    }
});

// Cerrar el modal
spanClose.onclick = function () {
    modal.style.display = "none";
};

// Confirmar el resultado
document.getElementById("confirmarResultado").addEventListener("click", () => {
    const puntosEquipo1 = document.getElementById("puntosEquipo1").value;
    const puntosEquipo2 = document.getElementById("puntosEquipo2").value;

    if (puntosEquipo1 && puntosEquipo2) {
        // Crear una clave única para el resultado
        const matchId = `${partidoSeleccionado.dia}-${partidoSeleccionado.hora}`;

        // Guardar resultado en el localStorage
        const resultado = { puntosEquipo1, puntosEquipo2 };
        localStorage.setItem(matchId, JSON.stringify(resultado));

        // Actualizar la caja del partido con el resultado
        const matchBox = document.getElementById(matchId);
        matchBox.innerHTML = `
            <span>${partidoSeleccionado.equipo1} vs ${partidoSeleccionado.equipo2}</span>
            <span>${puntosEquipo1} - ${puntosEquipo2}</span>
            <button class="btnReset" data-match-id="${matchId}">Resetear</button>
        `;

        modal.style.display = "none";
    } else {
        alert("Por favor, introduce los puntos de ambos equipos.");
    }
});

// Resetear el resultado del partido
document.addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("btnReset")) {
        const matchId = e.target.getAttribute("data-match-id");
        localStorage.removeItem(matchId); // Eliminar resultado guardado

        // Resetear la caja del partido
        const partido = partidos.find(p => `${p.dia}-${p.hora}` === matchId); // Encontrar el partido original
        const matchBox = document.getElementById(matchId);
        matchBox.innerHTML = `
            <span>${partido.hora}</span>
            <span>${partido.equipo1} vs ${partido.equipo2}</span>
            <button class="btnResultado" data-equipo1="${partido.equipo1}" data-equipo2="${partido.equipo2}" data-hora="${partido.hora}" data-dia="${partido.dia}">Añadir resultado</button>
        `;
    }
});

// Cargar los partidos al cargar la página
window.onload = cargarPartidos;
