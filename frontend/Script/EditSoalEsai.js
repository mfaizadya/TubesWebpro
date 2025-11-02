const saveBtn = document.getElementById("save-btn");
const addBtn = document.getElementById("add-btn");

if (addBtn) {
  addBtn.addEventListener("click", function () {
    const pertanyaan = document.getElementById("pertanyaan-input").value.trim();
    const jawaban = document.getElementById("jawaban-input").value.trim();

    if (!pertanyaan || !jawaban) {
      alert("Pertanyaan dan kunci jawaban tidak boleh kosong!");
      return;
    }

    alert("Soal berhasil ditambahkan!");
    window.location.href = "EditLevel.html";
  });
}

if (saveBtn) {
  let soalEsai = JSON.parse(localStorage.getItem("soalEsai")) || {
    id: 1,
    pertanyaan: "Satu keranjang berisi 5 apel. Jika kamu mengambil 2 apel, berapa apel yang kamu miliki?",
    jawaban: "3"
  };

  document.getElementById("pertanyaan-input").value = soalEsai.pertanyaan;
  document.getElementById("jawaban-input").value = soalEsai.jawaban;

  saveBtn.addEventListener("click", function () {
    const pertanyaanBaru = document.getElementById("pertanyaan-input").value.trim();
    const jawabanBaru = document.getElementById("jawaban-input").value.trim();

    if (!pertanyaanBaru || !jawabanBaru) {
      alert("Pertanyaan dan kunci jawaban tidak boleh kosong!");
      return;
    }

    soalEsai = {
      id: 1,
      pertanyaan: pertanyaanBaru,
      jawaban: jawabanBaru
    };

    localStorage.setItem("soalEsai", JSON.stringify(soalEsai));

    alert("Soal berhasil disimpan!");
    window.location.href = "EditLevel.html";
  });
}