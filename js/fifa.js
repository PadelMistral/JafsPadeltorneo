// Función para cargar la clasificación
function cargarClasificacion() {
    const grupos = {
        A: ["Jaime/Manu", "Peri/Raico", "Mario/Carlos", "David M/Sergio M"], // Jugadores Grupo A
        B: ["David/Luis", "Angelo/Jose Luis", "Victor/Jaime", "Paco/Rafa"], // Jugadores Grupo B
        C: ["Vissen/Sergio", "Juanan/Victor", "Adri/Javi"] // Jugadores Grupo C
    };

    // Crear un objeto para almacenar las estadísticas por grupo
    const clasificacion = {
        A: inicializarClasificacion(grupos.A),
        B: inicializarClasificacion(grupos.B),
        C: inicializarClasificacion(grupos.C)
    };

    // Obtener los resultados de los partidos y actualizar las estadísticas
    const partidos = [
        { matchId: 'dia1-17:15 - 18:30', equipo1: "Juanan/Victor", equipo2: "Adri/Javi" },
        { matchId: 'dia1-18:30 - 19:45', equipo1: "Mario/Carlos", equipo2: "Jaime/Manu" },
        { matchId: 'dia1-19:45 - 21:00', equipo1: "Victor/Jaime", equipo2: "David/Luis" },
        { matchId: 'dia1-21:00 - 22:15', equipo1: "Peri/Raico", equipo2: "Jaime/Manu" },
        { matchId: 'dia2-09:30 - 10:45', equipo1: "Paco/Rafa", equipo2: "Angelo/Jose Luis" },
        { matchId: 'dia2-10:45 - 12:00', equipo1: "Mario/Carlos", equipo2: "David M/Sergio M" },
        { matchId: 'dia2-12:00 - 13:15', equipo1: "Paco/Rafa", equipo2: "Victor/Jaime" },
        { matchId: 'dia2-16:00 - 17:15', equipo1: "Peri/Raico", equipo2: "David M/Sergio M" },
        { matchId: 'dia2-17:15 - 18:30', equipo1: "Vissen/Sergio", equipo2: "Adri/Javi" },
        { matchId: 'dia2-18:30 - 19:45', equipo1: "Peri/Raico", equipo2: "Mario/Carlos" },
        { matchId: 'dia2-19:45 - 21:00', equipo1: "Jaime/Manu", equipo2: "David M/Sergio M" },
        { matchId: 'dia2-21:00 - 22:15', equipo1: "David/Luis", equipo2: "Angelo/Jose Luis" },
        { matchId: 'dia3-09:30 - 10:45', equipo1: "Angelo/Jose Luis", equipo2: "Victor/Jaime" },
        { matchId: 'dia3-10:45 - 12:00', equipo1: "Juanan/Victor", equipo2: "Vissen/Sergio" },
        { matchId: 'dia3-12:00 - 13:15', equipo1: "David/Luis", equipo2: "Paco/Rafa" }
    ];

    partidos.forEach(partido => {
        const resultadoGuardado = JSON.parse(localStorage.getItem(partido.matchId));
        
        if (resultadoGuardado) {
            const { puntosEquipo1, puntosEquipo2 } = resultadoGuardado;
            const { equipo1, equipo2 } = partido;

            // Actualizar estadísticas para el equipo1
            actualizarEstadisticas(clasificacion, equipo1, puntosEquipo1, puntosEquipo2);
            // Actualizar estadísticas para el equipo2
            actualizarEstadisticas(clasificacion, equipo2, puntosEquipo2, puntosEquipo1);
        }
    });

    // Ordenar y mostrar la clasificación en las tablas correspondientes
    mostrarClasificacion("tablaGrupoA", clasificacion.A);
    mostrarClasificacion("tablaGrupoB", clasificacion.B);
    mostrarClasificacion("tablaGrupoC", clasificacion.C);
    
    // Mostrar todos los resultados de los partidos
    mostrarResultados(partidos);
}

// Inicializar la clasificación para los grupos
function inicializarClasificacion(grupo) {
    return grupo.map(equipo => ({
        equipo,
        partidosJugados: 0,
        partidosGanados: 0,
        partidosPerdidos: 0,
        puntosFavor: 0,
        puntosContra: 0,
        puntos: 0
    }));
}

// Función para mostrar todos los resultados de los partidos
function mostrarResultados(partidos) {
    const resultadosContainer = document.getElementById("resultadosContainer");
    resultadosContainer.innerHTML = ""; // Limpiar antes de agregar nuevos resultados

    partidos.forEach(partido => {
        const resultadoGuardado = JSON.parse(localStorage.getItem(partido.matchId));
        const { equipo1, equipo2 } = partido;

        let resultadoTexto = `${equipo1} vs ${equipo2}: Sin resultado`;

        if (resultadoGuardado) {
            const { puntosEquipo1, puntosEquipo2 } = resultadoGuardado;
            resultadoTexto = `${equipo1} vs ${equipo2}: ${puntosEquipo1} - ${puntosEquipo2}`;
        }

        const resultadoDiv = document.createElement("div");
        resultadoDiv.textContent = resultadoTexto;
        resultadosContainer.appendChild(resultadoDiv);
    });
}

// Función para actualizar las estadísticas por equipo
function actualizarEstadisticas(clasificacion, equipo, puntos, puntosEnContra) {
    // Actualizar las estadísticas del equipo
    const equipoData = clasificacion.A.concat(clasificacion.B, clasificacion.C).find(e => e.equipo === equipo);
    equipoData.partidosJugados++;
    equipoData.puntosFavor += puntos;
    equipoData.puntosContra += puntosEnContra;

    // Asignar puntos según el resultado
    if (puntos > puntosEnContra) {
        equipoData.partidosGanados++;
        equipoData.puntos += 3; // Ganador
    } else {
        equipoData.partidosPerdidos++;
    }
}

// Determinar a qué grupo pertenece un equipo
function determinarGrupo(equipo) {
    const grupos = {
        A: ["Jaime/Manu", "Peri/Raico", "Mario/Carlos", "David M/Sergio M"],
        B: ["David/Luis", "Angelo/Jose Luis", "Victor/Jaime", "Paco/Rafa"],
        C: ["Vissen/Sergio", "Juanan/Victor", "Adri/Javi"]
    };

    for (const grupo in grupos) {
        if (grupos[grupo].includes(equipo)) {
            return grupo;
        }
    }
    return null; // Si no se encuentra el grupo
}

// Función para ordenar la clasificación
function ordenarClasificacion(clasificacion) {
    return clasificacion.sort((a, b) => {
        if (b.puntos !== a.puntos) {
            return b.puntos - a.puntos; // Ordenar por puntos de forma descendente
        }
        return b.puntosFavor - a.puntosFavor; // En caso de empate, ordenar por puntos a favor
    });
}

// Mostrar la clasificación en la interfaz
function mostrarClasificacion(idTabla, clasificacion) {
    const tablaClasificacion = document.getElementById(idTabla).getElementsByTagName('tbody')[0];
    tablaClasificacion.innerHTML = ""; // Limpiar tabla antes de agregar nuevas filas

    // Ordenar la clasificación antes de mostrar
    const clasificacionOrdenada = ordenarClasificacion(clasificacion);

    // Añadir cada equipo a la tabla
    clasificacionOrdenada.forEach(item => {
        const fila = `
            <tr>
                <td>${item.equipo}</td>
                <td>${item.partidosJugados}</td>
                <td>${item.partidosGanados}</td>
                <td>${item.partidosPerdidos}</td>
                <td>${item.puntosFavor}</td>
                <td>${item.puntosContra}</td>
                <td>${item.puntos}</td>
            </tr>
        `;
        tablaClasificacion.innerHTML += fila;
    });
}

// Cargar la clasificación al cargar la página
window.onload = cargarClasificacion;
