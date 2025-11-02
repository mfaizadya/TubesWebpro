let soalPGBaru = {
    id: null,
    pertanyaan: "",
    opsi: ["", ""], 
    benar: 0,
};

const pertanyaanInput = document.getElementById("pertanyaan-input");
const optionsList = document.getElementById("options-list");
const correctSelect = document.getElementById("correct-answer");
const addBtn = document.getElementById("add-option");

function renderOptions() {
  optionsList.innerHTML = "";
  soalPGBaru.opsi.forEach((opt, i) => {
    const div = document.createElement("div");
    div.style.display = "flex";
    div.style.gap = "10px";
    div.style.marginBottom = "8px";

    const input = document.createElement("input");
    input.className = "input-box";
    input.style.flex = "1";
    input.value = opt;
    input.placeholder = `Opsi ${i + 1}`;
    input.addEventListener("input", (e) => (soalPGBaru.opsi[i] = e.target.value));

    const delBtn = document.createElement("button");
    delBtn.textContent = "X";
    delBtn.style.border = "none";
    delBtn.style.background = "#f44336";
    delBtn.style.color = "#fff";
    delBtn.style.borderRadius = "8px";
    delBtn.style.cursor = "pointer";
    delBtn.style.width = "40px";
    delBtn.style.height = "40px";
    delBtn.style.display = "flex";
    delBtn.style.alignItems = "center";
    delBtn.style.justifyContent = "center";
    delBtn.style.fontSize = "18px";
    delBtn.style.flexShrink = "0";
    delBtn.type = "button"; 

    delBtn.addEventListener("click", () => {
      if (soalPGBaru.opsi.length > 2) {
        soalPGBaru.opsi.splice(i, 1);
        renderOptions();
        updateCorrectSelect();
      } else {
        alert("Minimal harus ada 2 opsi jawaban!");
      }
    });

    div.appendChild(input);
    div.appendChild(delBtn);
    optionsList.appendChild(div);
  });

  updateCorrectSelect();
}

function updateCorrectSelect() {
  correctSelect.innerHTML = "";
  soalPGBaru.opsi.forEach((_, i) => {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = `Opsi ${i + 1}`;
    correctSelect.appendChild(option);
  });
  correctSelect.value = soalPGBaru.benar; 
}

addBtn.addEventListener("click", () => {
  soalPGBaru.opsi.push("");
  renderOptions();
});

document.getElementById("save-btn").addEventListener("click", () => {
  const pertanyaan = pertanyaanInput.value.trim();
  const opsi = soalPGBaru.opsi.map(o => o.trim());

  if (!pertanyaan) {
    alert("Pertanyaan tidak boleh kosong!");
    return;
  }
  if (opsi.length < 2) {
    alert("Minimal harus ada 2 opsi jawaban!");
    return;
  }
  if (opsi.some(o => o === "")) {
    alert("Semua opsi jawaban harus diisi!");
    return;
  }

  soalPGBaru.id = Date.now();
  soalPGBaru.pertanyaan = pertanyaan;
  soalPGBaru.opsi = opsi;
  soalPGBaru.benar = parseInt(correctSelect.value);

  console.log("Data Soal PG Baru:", soalPGBaru);
  
  alert("Soal Pilihan Ganda baru berhasil ditambahkan!");

  window.location.href = "EditLevel.html";
});

renderOptions();