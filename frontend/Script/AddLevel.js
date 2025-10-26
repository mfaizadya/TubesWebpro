const form = document.getElementById("add-level-form");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nama = document.getElementById("inputNama").value;
    const section = document.getElementById("inputSection").value;

    if(nama.trim() === "" || section === ""){
    alert("Harap isi semua field!");
    } else {
    alert(`Level ${nama} section ${section} berhasil ditambahkan!`);
    }
});