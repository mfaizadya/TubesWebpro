const save = document.getElementById("save-btn");
const cancel = document.getElementById("cancel-btn");
const questionList = document.getElementById("question-list");

save.addEventListener("click", function(event) {
    event.preventDefault();

    const nama = document.getElementById("inputNama").value;
    const section = document.getElementById("inputSection").value;

    if(nama.trim() === "" || section === ""){
        alert("Harap isi semua field Nama dan Section!");
    } else {
        alert(`Level "${nama}" section "${section}" berhasil diperbarui!`);
        window.location.href = "ListLevel.html";
    }
});

cancel.addEventListener("click", function(event) {
    event.preventDefault();

    alert(`Perubahan Level dibatalkan!`);
    window.location.href = "ListLevel.html";
});

questionList.addEventListener("click", function(event) {
    if (event.target.classList.contains("delete-question-btn")) {
        event.preventDefault();
        
        const deleteButton = event.target;
        const questionId = deleteButton.getAttribute("data-question-id");
        const row = deleteButton.closest("tr");
        
        if (confirm(`Apakah Anda yakin ingin menghapus soal dengan ID: ${questionId}?`)) {
            row.remove();
            
            alert(`Soal ID ${questionId} berhasil dihapus dari Level!`);

            updateQuestionNumbering();
        }
    }
});

function updateQuestionNumbering() {
    const rows = questionList.querySelectorAll("tr");
    rows.forEach((row, index) => {
        row.querySelector("td:first-child").textContent = index + 1;
    });
}