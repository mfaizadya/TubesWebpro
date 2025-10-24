document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logout-btn');
    
    if (logoutButton) {
        logoutButton.addEventListener('click', (event) => {
            event.preventDefault(); // Mencegah link berpindah
            const isConfirmed = confirm('Apakah Anda yakin ingin keluar?');
            
            if (isConfirmed) {
                console.log('Pengguna telah logout.');
                alert('Anda telah berhasil logout.');
                // Ganti 'login.html' dengan halaman login Anda
                window.location.href = 'login.html'; 
            }
        });
    }

    // ===================================================
    // == INI ADALAH KODE UNTUK FUNGSI RENAME SECTION ==
    // ===================================================
    
    // 1. Ambil semua tombol dengan kelas .rename-btn
    const allRenameButtons = document.querySelectorAll('.rename-btn');
    
    // 2. Loop setiap tombol dan berikan fungsi 'click'
    allRenameButtons.forEach(button => {
        button.addEventListener('click', () => {
            
            // 3. Cari baris <tr> terdekat dari tombol yang diklik
            const row = button.closest('tr');
            
            // 4. Dari baris itu, cari sel <td> pertama (yang berisi nama)
            const sectionCell = row.querySelector('td:first-child');
            const currentName = sectionCell.textContent;

            // 5. Tampilkan popup 'prompt' untuk meminta nama baru
            // Nama lama (currentName) akan muncul sebagai nilai default
            const newName = prompt(`Masukkan nama baru untuk "${currentName}":`, currentName);
            
            // 6. Validasi input baru
            // Cek apakah:
            // - Pengguna tidak menekan "Cancel" (newName tidak null)
            // - Nama baru tidak kosong (setelah di-trim)
            // - Nama baru berbeda dari nama lama
            if (newName && newName.trim() !== '' && newName !== currentName) {
                
                // 7. Jika valid, perbarui teks di dalam sel tabel
                sectionCell.textContent = newName;
                alert('Nama section berhasil diubah!');
                console.log(`Section diubah menjadi "${newName}"`);

            } else if (newName === currentName) {
                // Jika nama sama, tidak terjadi apa-apa
                console.log('Nama sama, tidak ada perubahan.');
            } else {
                // Jika pengguna menekan "Cancel" atau mengosongkan input
                console.log('Proses rename dibatalkan.');
            }
        });
    });

    // --- Logika untuk Tombol Delete ---
    // (Kode ini bisa dibiarkan saja untuk nanti)
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