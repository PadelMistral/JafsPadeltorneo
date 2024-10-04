// Equipos por grupo
const grupos = {
    A: [
        { equipo: "Jaime/Manu", puntosFavor: 0, puntosContra: 0, partidosJugados: 0, ganados: 0, perdidos: 0, puntuacion: 0 },
        { equipo: "Peri/Raico", puntosFavor: 0, puntosContra: 0, partidosJugados: 0, ganados: 0, perdidos: 0, puntuacion: 0 },
        { equipo: "Mario/Carlos", puntosFavor: 0, puntosContra: 0, partidosJugados: 0, ganados: 0, perdidos: 0, puntuacion: 0 },
        { equipo: "David M/Sergio M", puntosFavor: 0, puntosContra: 0, partidosJugados: 0, ganados: 0, perdidos: 0, puntuacion: 0 }
    ],
    B: [
        { equipo: "David/Luis", puntosFavor: 0, puntosContra: 0, partidosJugados: 0, ganados: 0, perdidos: 0, puntuacion: 0 },
        { equipo: "Angelo/Jose Luis", puntosFavor: 0, puntosContra: 0, partidosJugados: 0, ganados: 0, perdidos: 0, puntuacion: 0 },
        { equipo: "Victor/Jaime", puntosFavor: 0, puntosContra: 0, partidosJugados: 0, ganados: 0, perdidos: 0, puntuacion: 0 },
        { equipo: "Paco/Rafa", puntosFavor: 0, puntosContra: 0, partidosJugados: 0, ganados: 0, perdidos: 0, puntuacion: 0 }
    ],
    C: [
        { equipo: "Vissen/Sergio", puntosFavor: 0, puntosContra: 0, partidosJugados: 0, ganados: 0, perdidos: 0, puntuacion: 0 },
        { equipo: "Juanan/Victor", puntosFavor: 0, puntosContra: 0, partidosJugados: 0, ganados: 0, perdidos: 0, puntuacion: 0 },
        { equipo: "Adri/Javi", puntosFavor: 0, puntosContra: 0, partidosJugados: 0, ganados: 0, perdidos: 0, puntuacion: 0 }
    ]
};

// Función para actualizar las tablas
function actualizarClasificacion() {
    Object.keys(grupos).forEach(grupo => {
        const grupoElement = document.getElementById(`grupo${grupo}`).querySelector('tbody');
        grupoElement.innerHTML = ''; // Limpiar la tabla antes de actualizar

        const equiposGrupo = grupos[grupo];
        
        equiposGrupo.forEach(equipo => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${equipo.equipo}</td>
                <td>${equipo.partidosJugados}</td>
                <td>${equipo.ganados}</td>
                <td>${equipo.perdidos}</td>
                <td>${equipo.puntosFavor}</td>
                <td>${equipo.puntosContra}</td>
                <td>${equipo.puntuacion}</td>
            `;
            grupoElement.appendChild(fila);
        });

        // Ordenar por puntuación
        equiposGrupo.sort((a, b) => b.puntuacion - a.puntuacion);
    });
}

// Función para cargar los resultados desde localStorage
function cargarResultados() {
    const resultadosGuardados = Object.keys(localStorage)
        .filter(key => key.includes('-')) // Filtrar las claves que corresponden a los partidos
        .map(key => JSON.parse(localStorage.getItem(key)));

    resultadosGuardados.forEach(resultado => {
        const { equipo1, equipo2, puntosEquipo1, puntosEquipo2 } = resultado;

        // Encontrar los equipos y actualizar sus datos
        Object.keys(grupos).forEach(grupo => {
            let equipo1Data = grupos[grupo].find(eq => eq.equipo === equipo1);
            let equipo2Data = grupos[grupo].find(eq => eq.equipo === equipo2);

            if (equipo1Data && equipo2Data) {
                equipo1Data.partidosJugados++;
                equipo2Data.partidosJugados++;
                
                equipo1Data.puntosFavor += parseInt(puntosEquipo1);
                equipo1Data.puntosContra += parseInt(puntosEquipo2);
                equipo2Data.puntosFavor += parseInt(puntosEquipo2);
                equipo2Data.puntosContra += parseInt(puntosEquipo1);

                if (puntosEquipo1 > puntosEquipo2) {
                    equipo1Data.ganados++;
                    equipo2Data.perdidos++;
                    equipo1Data.puntuacion += 3; // Victoria suma 3 puntos
                } else if (puntosEquipo1 < puntosEquipo2) {
                    equipo2Data.ganados++;
                    equipo1Data.perdidos++;
                    equipo2Data.puntuacion += 3;
                }
            }
        });
    });

    // Actualizar las tablas
    actualizarClasificacion();
}

// Escuchar clic en el botón de "Actualizar Clasificación"
document.getElementById('actualizarClasificacion').addEventListener('click', () => {
    cargarResultados();
});

// Inicializar la tabla al cargar la página
window.onload = function() {
    cargarResultados();
};
