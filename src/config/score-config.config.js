export function saveScore(name, score) {
  const stored = JSON.parse(localStorage.getItem('scores') || '[]');

  // Buscar si ese jugador ya existe
  const existing = stored.find((entry) => entry.name === name);

  if (existing) {
    // Si existe y el nuevo score es mayor → actualizar
    if (score > existing.score) {
      existing.score = score;
    }
  } else {
    // Si no existe → añadirlo
    stored.push({ name, score });
  }

  // Ordenar de mayor a menor
  stored.sort((a, b) => b.score - a.score);

  localStorage.setItem('scores', JSON.stringify(stored));
}

export function getScores() {
  return JSON.parse(localStorage.getItem('scores') || '[]');
}
