let attempts = [];

async function loadData() {
  try {
    const res = await fetch("../data/attempts.json");
    attempts = await res.json();
    renderAttempts();
  } catch (e) {
    console.error("Gagal load attempts:", e);
  }
}
  
function renderAttempts() {
  const list = document.getElementById("attemptList");
  list.innerHTML = attempts.length
    ? attempts.map(a => `
      <div class="card">
        <h3>${a.name}</h3>
        <p class="small">Section: ${a.section} | Level: ${a.level}</p>
        <button>Lihat Detail</button>
      </div>`).join("")
    : "<p class='small'>Belum ada attempt.</p>";
}

window.onload = loadData;