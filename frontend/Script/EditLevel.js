const save = document.getElementById("save-btn");
const cancel = document.getElementById("cancel-btn");
const questionList = document.getElementById("question-list");

// --- Fungsionalitas Save dan Cancel Level ---
save.addEventListener("click", function(event) {
    event.preventDefault();

    const nama = document.getElementById("inputNama").value;
    const section = document.getElementById("inputSection").value;

    // Logika validasi dan penyimpanan
    if(nama.trim() === "" || section === ""){
        alert("Harap isi semua field Nama dan Section!");
    } else {
        // Asumsi: Logika penyimpanan data Level ke database/API dilakukan di sini
        alert(`Level "${nama}" section "${section}" berhasil diperbarui!`);
        window.location.href = "ListLevel.html";
    }
});

cancel.addEventListener("click", function(event) {
    event.preventDefault();

    // Menggunakan window.location.href untuk navigasi
    alert(`Perubahan Level dibatalkan!`);
    window.location.href = "ListLevel.html";
});

// --- Fungsionalitas Delete Soal ---
// Menggunakan Event Delegation pada tbody (question-list)
questionList.addEventListener("click", function(event) {
    // Cek apakah elemen yang diklik adalah tombol Delete
    if (event.target.classList.contains("delete-question-btn")) {
        event.preventDefault(); // Mencegah aksi default jika ada
        
        const deleteButton = event.target;
        const questionId = deleteButton.getAttribute("data-question-id");
        const row = deleteButton.closest("tr"); // Mencari baris terdekat (<tr>)
        
        if (confirm(`Apakah Anda yakin ingin menghapus soal dengan ID: ${questionId}?`)) {
            // Logika simulasi penghapusan dari tampilan
            row.remove();
            
            // Logika penghapusan data soal dari server/array (placeholder)
            // console.log(`Soal ID ${questionId} berhasil dihapus dari data.`);
            alert(`Soal ID ${questionId} berhasil dihapus dari Level!`);

            // Setelah penghapusan, mungkin perlu diperbarui nomor urut (opsional)
            updateQuestionNumbering();
        }
    }
});

// Fungsi untuk memperbarui nomor urut soal setelah delete
function updateQuestionNumbering() {
    const rows = questionList.querySelectorAll("tr");
    rows.forEach((row, index) => {
        // Ambil elemen <td> pertama (nomor)
        row.querySelector("td:first-child").textContent = index + 1;
    });
}