let attempt = null;

async function loadDetail() {
  try {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");
    if (!name) {
      document.getElementById("attemptDetail").innerHTML =
        "<p class='small'>Tidak ada attempt dipilih.</p>";
      return;
    }

    const res = await fetch("../data/attempts.json");
    const data = await res.json();
    attempt = data.find(a => a.name === name);

    if (!attempt) {
      document.getElementById("attemptDetail").innerHTML =
        "<p class='small'>Attempt tidak ditemukan.</p>";
      return;
    }

    renderDetail();
  } catch (e) {
    console.error("Gagal load attempt:", e);
  }
}

function renderDetail() {
  const div = document.getElementById("attemptDetail");
  div.innerHTML = `
    <div class="card">
      <h3>${attempt.name}</h3>
      <p class="small">Section: ${attempt.section} | Level: ${attempt.level}</p>
    </div>

    ${attempt.answers
      .map(
        (a, i) => `
        <div class="card">
          <h4>${i + 1}. ${a.q}</h4>
          <p>Jawaban: <b>${a.a}</b></p>
          ${
            a.type === "PG"
              ? `<p>${a.correct ? "✅ Benar" : "❌ Salah"}</p>`
              : `
                <label>Nilai Esai:</label>
                <input class="input" type="number" placeholder="0-100" value="${a.score ?? ""}">
                <label>Feedback:</label>
                <textarea class="input" rows="2">${a.feedback ?? ""}</textarea>
              `
          }
        </div>`
      )
      .join("")}
  `;
}

window.onload = loadDetail;
``