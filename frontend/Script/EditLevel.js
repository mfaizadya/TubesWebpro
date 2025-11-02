const save = document.getElementById("save-btn");
const cancel = document.getElementById("cancel-btn");

save.addEventListener("click", function(event) {
    event.preventDefault();

    const nama = document.getElementById("inputNama").value;
    const section = document.getElementById("inputSection").value;

    if(nama.trim() === "" || section === ""){
        alert("Harap isi semua field!");
    } else {
        alert(`Level ${nama} section ${section} berhasil disimpan!`);
        window.location.href = "ListLevel.html";
    }
});

cancel.addEventListener("click", function(event) {
    event.preventDefault();

    alert(`Perubahan Level dibatalkan!`);
    window.location.href = "ListLevel.html";
});