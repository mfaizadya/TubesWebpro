let soalEsai = JSON.parse(localStorage.getItem("soalEsai")) || {
  id: 1,
  pertanyaan: "Satu keranjang berisi 5 apel. Jika kamu mengambil 2 apel, berapa apel yang kamu miliki?!",
  jawaban: "3"
};

document.getElementById("pertanyaan-input").value = soalEsai.pertanyaan;
document.getElementById("jawaban-input").value = soalEsai.jawaban;

document.getElementById("save-btn").addEventListener("click", function () {
  soalEsai.pertanyaan = document.getElementById("pertanyaan-input").value;
  soalEsai.jawaban = document.getElementById("jawaban-input").value;

  localStorage.setItem("soalEsai", JSON.stringify(soalEsai));

  window.location.href = "DetailSoalEsai.html";
});
