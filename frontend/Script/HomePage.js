document.addEventListener('DOMContentLoaded', () => {
    // Logout
    const logoutButton = document.getElementById('logout-btn');
    
    if (logoutButton) {
        logoutButton.addEventListener('click', (event) => {
            event.preventDefault();
            const isConfirmed = confirm('Apakah Anda yakin ingin keluar?');
            
            if (isConfirmed) {
                console.log('Pengguna telah logout.');
                alert('Anda telah berhasil logout.');
                window.location.href = 'login.html'; 
            }
        });
    }

    // Rename buttons
    const allRenameButtons = document.querySelectorAll('.rename-btn');

    allRenameButtons.forEach(button => {
        button.addEventListener('click', () => {
            const row = button.closest('tr');
            const sectionCell = row.querySelector('td:first-child');
            const currentName = sectionCell.textContent;
            const newName = prompt(`Masukkan nama baru untuk "${currentName}":`, currentName);

            if (newName && newName.trim() !== '' && newName !== currentName) {
                sectionCell.textContent = newName;
                alert('Nama section berhasil diubah!');
                console.log(`Section diubah menjadi "${newName}"`);

            } else if (newName === currentName) {
                console.log('Nama sama, tidak ada perubahan.');
            } else {
                console.log('Proses rename dibatalkan.');
            }
        });
    });

    // Delete buttons
    const allDeleteButtons = document.querySelectorAll('.delete-btn');
    allDeleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const row = button.closest('tr');
            const sectionName = row.querySelector('td:first-child').textContent;
            
            const isConfirmed = confirm(`Apakah Anda yakin ingin menghapus "${sectionName}"?`);
            
            if (isConfirmed) {
                row.remove();
                alert(`"${sectionName}" telah berhasil dihapus.`);
                console.log(`Section "${sectionName}" telah dihapus.`);
            } else {
                console.log('Proses delete dibatalkan.');
            }
        });
    });

});