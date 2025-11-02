document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logout-btn');
    
    if (logoutButton) {
        logoutButton.addEventListener('click', (event) => {
            const isConfirmed = confirm('Apakah Anda yakin ingin keluar?');
            
            if (isConfirmed) {
                console.log('Pengguna telah logout.');
                alert('Anda telah berhasil logout.');
                window.location.href = 'Login.html'; 
            }
        });
    }

    const addButton = document.getElementById('add-section-btn');
    const tableBody = document.querySelector('table tbody');
    //Tambah Section
    if (addButton && tableBody) {
        addButton.addEventListener('click', () => {
            const newName = prompt('Masukkan nama section baru:');
            if (!newName || newName.trim() === '') {
                console.log('Tambah section dibatalkan (nama kosong).');
                return; 
            }

            const levelCountInput = prompt(`Masukkan jumlah level untuk "${newName}" (misal: 10):`);
            const levelNum = parseInt(levelCountInput); 
            if (isNaN(levelNum) || levelNum <= 0) {
                alert('Input tidak valid. Jumlah level harus berupa angka positif.');
                console.log('Tambah section dibatalkan (level tidak valid).');
                return;
            }

            const levelString = `1 - ${levelNum}`;
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${newName}</td>
                <td>${levelString}</td>
                <td>
                    <div class="action-buttons">
                        <button class="rename-btn">Rename</button>
                        <button class="delete-btn">Delete</button>
                    </div>
                </td>
            `;
            tableBody.append(newRow);
            console.log(`Section baru "${newName}" telah ditambahkan.`);
        });
    }

    if (tableBody) {
        tableBody.addEventListener('click', (event) => {
            const target = event.target; 
            //Rename Section
            if (target.classList.contains('rename-btn')) {
                const row = target.closest('tr');
                const sectionCell = row.querySelector('td:first-child');
                const currentName = sectionCell.textContent;
                const newName = prompt(`Masukkan nama baru untuk "${currentName}":`, currentName);

                if (newName && newName.trim() !== '' && newName !== currentName) {
                    sectionCell.textContent = newName;
                    alert('Nama section berhasil diubah!');
                } else {
                    console.log('Proses rename dibatalkan.');
                }
            }

            //Delete Section
            if (target.classList.contains('delete-btn')) {
                const row = target.closest('tr');
                const sectionName = row.querySelector('td:first-child').textContent;
                
                const isConfirmed = confirm(`Apakah Anda yakin ingin menghapus "${sectionName}"?`);
                
                if (isConfirmed) {
                    row.remove();
                    alert(`"${sectionName}" telah berhasil dihapus.`);
                } else {
                    console.log('Proses delete dibatalkan.');
                }
            }
        });
    }

}); 