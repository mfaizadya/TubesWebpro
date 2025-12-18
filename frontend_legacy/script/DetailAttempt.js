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
        <div class="card" data-question-index="${i}">
          <h4>${i + 1}. ${a.q}</h4>
          <p>Jawaban: <b>${a.a}</b></p>
          ${
            a.type === "PG"
              ? `<p style="color: ${a.correct ? "green" : "red"};">${a.correct ? "✅ Benar" : "❌ Salah"}</p>`
              : `
                <label>Nilai Esai:</label>
                <input class="input essay-score" 
                       id="score-${i}" 
                       type="number" 
                       placeholder="0-100" 
                       value="${a.score ?? ""}"
                       min="0" max="100">
                
                <label>Feedback:</label>
                <textarea class="input essay-feedback" 
                          id="feedback-${i}" 
                          rows="2">${a.feedback ?? ""}</textarea>
                
                <button class="save-essay-btn" 
                        data-index="${i}" 
                        style="margin-top: 15px; padding: 10px; background-color: #2977ff; color: white; border: none; border-radius: 8px; cursor: pointer;">
                    Simpan Nilai & Feedback
                </button>
              `
          }
        </div>`
      )
      .join("")}
  `;

  const saveButtons = div.querySelectorAll(".save-essay-btn");

  saveButtons.forEach(button => {
    button.addEventListener("click", function() {
      const index = parseInt(this.getAttribute("data-index"));
      const scoreInput = document.getElementById(`score-${index}`);
      const feedbackInput = document.getElementById(`feedback-${index}`);
      
      const newScore = scoreInput.value.trim();
      const newFeedback = feedbackInput.value.trim();
      
      if (newScore === "" || newScore < 0 || newScore > 100) {
        alert("Nilai harus diisi dan berada dalam rentang 0-100!");
        scoreInput.focus();
        return;
      }

      attempt.answers[index].score = newScore;
      attempt.answers[index].feedback = newFeedback;

      alert(`✅ Data soal ke-${index + 1} berhasil disimpan!\nNilai: ${newScore}\nFeedback: ${newFeedback}`);
      
    });
  });
}

window.onload = loadDetail;
``