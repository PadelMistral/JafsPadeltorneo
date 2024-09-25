document.addEventListener("DOMContentLoaded", function() {
    const currentMatch = document.getElementById('current-match');
    currentMatch.textContent = "Partido actual: Mario / Carlos vs Peri / Raico";

    // Cargar resultados del localStorage o usar valores predeterminados
    loadResults();
});

const defaultResults = [
    { player: "Mario / Carlos", points: 0, played: 0, won: 0, lost: 0, setDiff: 0, group: 'A' },
    { player: "Peri / Raico", points: 0, played: 0, won: 0, lost: 0, setDiff: 0, group: 'A' },
    { player: "Jaime / Manu", points: 0, played: 0, won: 0, lost: 0, setDiff: 0, group: 'A' },
    { player: "Sergio / David", points: 0, played: 0, won: 0, lost: 0, setDiff: 0, group: 'A' },
    { player: "Angelo / Jose Luis", points: 0, played: 0, won: 0, lost: 0, setDiff: 0, group: 'B' },
    { player: "David / Luis", points: 0, played: 0, won: 0, lost: 0, setDiff: 0, group: 'B' },
    { player: "Paco / Rafa", points: 0, played: 0, won: 0, lost: 0, setDiff: 0, group: 'B' },
    { player: "Victor / Jaime", points: 0, played: 0, won: 0, lost: 0, setDiff: 0, group: 'B' },
    { player: "Vissen / Sergio", points: 0, played: 0, won: 0, lost: 0, setDiff: 0, group: 'C' },
    { player: "Adri / Javi", points: 0, played: 0, won: 0, lost: 0, setDiff: 0, group: 'C' },
    { player: "Juanan / Victor", points: 0, played: 0, won: 0, lost: 0, setDiff: 0, group: 'C' }
];

let matchHistory = []; // Historial de los partidos

document.addEventListener('DOMContentLoaded', () => {
    const groupABody = document.getElementById('group-a-body');
    const groupBBody = document.getElementById('group-b-body');
    const groupCBody = document.getElementById('group-c-body');

    // Función para poblar la tabla
    function populateTable(groupBody, groupResults) {
        groupBody.innerHTML = ''; // Limpiar la tabla antes de llenarla
        groupResults.forEach(result => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${result.player}</td>
                <td>${result.points}</td>
                <td>${result.played}</td>
                <td>${result.won}</td>
                <td>${result.lost}</td>
                <td>${result.setDiff}</td>
            `;
            groupBody.appendChild(row);
        });
    }

    // Función para cargar los resultados del localStorage o los valores predeterminados
    function loadResults() {
        const savedResults = JSON.parse(localStorage.getItem('tournamentResults'));
        const savedMatchHistory = JSON.parse(localStorage.getItem('matchHistory'));
        
        // Si no hay resultados guardados, usa los valores predeterminados
        const results = savedResults || defaultResults;
        matchHistory = savedMatchHistory || [];

        // Ordenar los resultados por puntos y diferencia de sets
        results.sort((a, b) => {
            if (b.points !== a.points) return b.points - a.points;
            return b.setDiff - a.setDiff; // Mayor diferencia de sets es mejor
        });

        // Poblar las tablas de los grupos
        populateTable(groupABody, results.filter(r => r.group === 'A'));
        populateTable(groupBBody, results.filter(r => r.group === 'B'));
        populateTable(groupCBody, results.filter(r => r.group === 'C'));
    }

    // Aquí sigue el resto del código para actualizar los resultados, añadir partidos, etc.
    // No es necesario modificar estas secciones.
    document.getElementById('submit-result').addEventListener('click', () => {
        const player1 = document.getElementById('player1').value;
        const player2 = document.getElementById('player2').value;
        const score1 = parseInt(document.getElementById('score1').value) || 0;
        const score2 = parseInt(document.getElementById('score2').value) || 0;

        const results = JSON.parse(localStorage.getItem('tournamentResults')) || defaultResults;

        const playerData1 = results.find(r => r.player === player1);
        const playerData2 = results.find(r => r.player === player2);

        if (!playerData1 || !playerData2) {
            alert("Ambos jugadores deben ser válidos.");
            return;
        }

        if (playerData1.group !== playerData2.group) {
            alert("Los jugadores deben pertenecer al mismo grupo.");
            return;
        }

        // Actualizar las estadísticas de los jugadores
        if (player1 && player2) {
            const matchResult = [{ player: player1, score: score1 }, { player: player2, score: score2 }];

            matchResult.forEach(match => {
                const playerData = results.find(r => r.player === match.player);
                if (playerData) {
                    playerData.played++;
                    playerData.setDiff += (match.player === player1 ? score1 - score2 : score2 - score1);
                    if (match.player === player1 && score1 > score2) {
                        playerData.won++;
                        playerData.points += 3;
                    } else if (match.player === player2 && score2 > score1) {
                        playerData.won++;
                        playerData.points += 3;
                    } else if (score1 === score2) {
                        playerData.points += 1; // Empate
                    } else {
                        playerData.lost++;
                    }
                }
            });

            // Guardar el historial del partido
            matchHistory.push({ player1, player2, score1, score2 });
            localStorage.setItem('matchHistory', JSON.stringify(matchHistory));
            localStorage.setItem('tournamentResults', JSON.stringify(results));
            loadResults();
        } else {
            alert("Por favor, ingresa los nombres de ambos jugadores.");
        }
    });

    // Botón para borrar el último partido
    document.getElementById('clear-results').addEventListener('click', () => {
        const adminKey = prompt("Introduce la clave de administrador:");
        if (adminKey === "981") { // Cambia "981" por la clave real
            if (matchHistory.length > 0) {
                const lastMatch = matchHistory.pop(); // Obtén el último partido registrado
                const results = JSON.parse(localStorage.getItem('tournamentResults')) || defaultResults;

                // Restar los cambios de las estadísticas del último partido
                const playerData1 = results.find(r => r.player === lastMatch.player1);
                const playerData2 = results.find(r => r.player === lastMatch.player2);

                if (playerData1 && playerData2) {
                    playerData1.played--;
                    playerData1.setDiff -= (lastMatch.score1 - lastMatch.score2);
                    if (lastMatch.score1 > lastMatch.score2) {
                        playerData1.won--;
                        playerData1.points -= 3;
                    } else if (lastMatch.score1 === lastMatch.score2) {
                        playerData1.points -= 1;
                    } else {
                        playerData1.lost--;
                    }

                    playerData2.played--;
                    playerData2.setDiff -= (lastMatch.score2 - lastMatch.score1);
                    if (lastMatch.score2 > lastMatch.score1) {
                        playerData2.won--;
                        playerData2.points -= 3;
                    } else if (lastMatch.score2 === lastMatch.score1) {
                        playerData2.points -= 1;
                    } else {
                        playerData2.lost--;
                    }
                }

                // Guardar los resultados actualizados
                localStorage.setItem('matchHistory', JSON.stringify(matchHistory));
                localStorage.setItem('tournamentResults', JSON.stringify(results));
                loadResults();
                alert('Último partido borrado exitosamente.');
            } else {
                alert('No hay registros de partidos para borrar.');
            }
        } else {
            alert('Clave de administrador incorrecta.');
        }
    });
});

