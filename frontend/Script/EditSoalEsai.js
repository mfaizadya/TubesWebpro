let soalEsai = JSON.parse(localStorage.getItem("soalEsai")) || {
  id: 1,
  pertanyaan: "Satu keranjang berisi 5 apel. Jika kamu mengambil 2 apel, berapa apel yang kamu miliki?",
  jawaban: "3"
};

document.getElementById("pertanyaan-input").value = soalEsai.pertanyaan;
document.getElementById("jawaban-input").value = soalEsai.jawaban;

document.getElementById("save-btn").addEventListener("click", function () {
  const pertanyaanBaru = document.getElementById("pertanyaan-input").value.trim();
  const jawabanBaru = document.getElementById("jawaban-input").value.trim();

  if (!pertanyaanBaru || !jawabanBaru) {
    alert("Pertanyaan dan kunci jawaban tidak boleh kosong!");
    return;
  }

  soalEsai = {
    ...soalEsai,
    pertanyaan: pertanyaanBaru,
    jawaban: jawabanBaru
  };

  localStorage.setItem("soalEsai", JSON.stringify(soalEsai));

  alert("Soal berhasil disimpan!");
});