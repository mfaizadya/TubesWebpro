let soalPG = JSON.parse(localStorage.getItem("soalPG")) || null;

if (!soalPG) {
  soalPG = {
    id: 1,
    pertanyaan: "Operator logika AND di JavaScript adalah?",
    opsi: ["&&", "AND", "||", "!="],
    benar: 0,
  };
} else {
  soalPG.pertanyaan = soalPG.pertanyaan || soalPG.question || "";
  soalPG.opsi = soalPG.opsi || soalPG.options || [];
  soalPG.benar = soalPG.benar ?? soalPG.correct ?? 0;
}

const pertanyaanInput = document.getElementById("pertanyaan-input");
const optionsList = document.getElementById("options-list");
const correctSelect = document.getElementById("correct-answer");
const addBtn = document.getElementById("add-option");

pertanyaanInput.value = soalPG.pertanyaan;

function renderOptions() {
  optionsList.innerHTML = "";
  soalPG.opsi.forEach((opt, i) => {
    const div = document.createElement("div");
    div.style.display = "flex";
    div.style.gap = "10px";
    div.style.marginBottom = "8px";

    const input = document.createElement("input");
    input.className = "input-box";
    input.style.flex = "1";
    input.value = opt;
    input.placeholder = `Opsi ${i + 1}`;
    input.addEventListener("input", (e) => (soalPG.opsi[i] = e.target.value));

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
      soalPG.opsi.splice(i, 1);
      renderOptions();
      updateCorrectSelect();
    });

    div.appendChild(input);
    div.appendChild(delBtn);
    optionsList.appendChild(div);
  });

  updateCorrectSelect();
}

function updateCorrectSelect() {
  correctSelect.innerHTML = "";
  soalPG.opsi.forEach((_, i) => {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = `Opsi ${i + 1}`;
    correctSelect.appendChild(option);
  });
  correctSelect.value = soalPG.benar;
}

addBtn.addEventListener("click", () => {
  soalPG.opsi.push("");
  renderOptions();
  updateCorrectSelect();
});

document.getElementById("save-btn").addEventListener("click", () => {
  const pertanyaan = pertanyaanInput.value.trim();
  const opsi = soalPG.opsi.map(o => o.trim());

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

  soalPG.pertanyaan = pertanyaan;
  soalPG.opsi = opsi;
  soalPG.benar = parseInt(correctSelect.value);

  localStorage.setItem("soalPG", JSON.stringify(soalPG));
  alert("Soal berhasil disimpan!");
});


renderOptions();
updateCorrectSelect();