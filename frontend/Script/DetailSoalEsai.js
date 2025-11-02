const dataDefault = {
  id: 1,
  pertanyaan: "Satu keranjang berisi 5 apel. Jika kamu mengambil 2 apel, berapa apel yang kamu miliki?",
  jawaban: "3"
};

async function loadSoal() {
  try {
    const saved = JSON.parse(localStorage.getItem("soalEsai"));

    const data = saved || dataDefault;

    document.getElementById("pertanyaan-box").textContent = data.pertanyaan;
    document.getElementById("jawaban-box").textContent = data.jawaban;

    if (!saved) {
      localStorage.setItem("soalEsai", JSON.stringify(dataDefault));
    }

  } catch (error) {
    console.error("Gagal memuat data soal:", error);
  }
}

document.getElementById("edit-btn").addEventListener("click", () => {
  window.location.href = "EditSoalEsai.html";
});

loadSoal();
