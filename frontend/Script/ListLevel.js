const data = document.getElementById("delete-btn");

data.addEventListener("click", function(event) {
    event.preventDefault();

    const name = document.getElementById("level-name").textContent;
    const section = document.getElementById("section-name").textContent;

    alert(`Level ${name} untuk Section ${section} berhasil dihapus`);
});