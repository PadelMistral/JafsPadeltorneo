// clasificacion.js

function cargarClasificacion() {
    const grupos = {
        A: [],
        B: [],
        C: []
    };

    const partidos = [
        { equipo1: "Juanan/Victor", equipo2: "Adri/Javi", grupo: "C" },
        { equipo1: "Mario/Carlos", equipo2: "Jaime/Manu", grupo: "A" },
        { equipo1: "Victor/Jaime", equipo2: "David/Luis", grupo: "B" },
        { equipo1: "Peri/Raico", equipo2: "Jaime/Manu", grupo: "A" },
        { equipo1: "Paco/Rafa", equipo2: "Angelo/Jose Luis", grupo: "B" },
        { equipo1: "Mario/Carlos", equipo2: "David M/Sergio M", grupo: "A" },
        { equipo1: "Paco/Rafa", equipo2: "Victor/Jaime", grupo: "B" },
        { equipo1: "Peri/Raico", equipo2: "David M/Sergio M", grupo: "C" },
        { equipo1: "Vissen/Sergio", equipo2: "Adri/Javi", grupo: "C" },
        { equipo1: "Peri/Raico", equipo2: "Mario/Carlos", grupo: "A" },
        { equipo1: "Jaime/Manu", equipo2: "David M/Sergio M", grupo: "B" },
        { equipo1: "David/Luis", equipo2: "Angelo/Jose Luis", grupo: "C" },
        { equipo1: "Angelo/Jose Luis", equipo2: "Victor/Jaime", grupo: "B" },
        { equipo1: "Juanan/Victor", equipo2: "Vissen/Sergio", grupo: "C" },
        { equipo1: "David/Luis", equipo2: "Paco/Rafa", grupo: "B" }
    ];

    partidos.forEach(partido => {
        const matchId = `${partido.equipo1} vs ${partido.equipo2}`;
        const resultadoGuardado = JSON.parse(localStorage.getItem(matchId));

        if (resultadoGuardado) {
            const { puntosEquipo1, puntosEquipo2 } = resultadoGuardado;
            const { equipo1, equipo2, grupo } = partido;

            // Actualizar puntos
            actualizarClasificacion(grupos[grupo], equipo1, parseInt(puntosEquipo1));
            actualizarClasificacion(grupos[grupo], equipo2, parseInt(puntosEquipo2));
        }
    });

    mostrarClasificacion("tablaGrupoA", grupos.A);
    mostrarClasificacion("tablaGrupoB", grupos.B);
    mostrarClasificacion("tablaGrupoC", grupos.C);
}

// Actualizar la clasificación por equipo
function actualizarClasificacion(grupo, equipo, puntos) {
    let equipoClasificado = grupo.find(e => e.equipo === equipo);

    if (!equipoClasificado) {
        equipoClasificado = { equipo, puntos: 0 };
        grupo.push(equipoClasificado);
    }

    equipoClasificado.puntos += puntos;
}

// Mostrar la clasificación en la tabla
function mostrarClasificacion(idTabla, grupo) {
    const tabla = document.getElementById(idTabla);
    tabla.querySelector('tbody').innerHTML = ""; // Limpiar el cuerpo de la tabla

    grupo.sort((a, b) => b.puntos - a.puntos);

    grupo.forEach(equipo => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${equipo.equipo}</td>
            <td>${equipo.puntos}</td>
        `;
        tabla.querySelector('tbody').appendChild(fila);
    });
}

// Cargar la clasificación al cargar la página
window.onload = cargarClasificacion;

// Botón de actualizar
document.getElementById("actualizarClasificacion").addEventListener("click", cargarClasificacion);
