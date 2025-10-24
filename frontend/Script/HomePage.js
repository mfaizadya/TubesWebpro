// Menunggu sampai seluruh konten HTML dimuat
document.addEventListener('DOMContentLoaded', () => {

    // --- Logika untuk Tombol Logout ---
    const logoutButton = document.getElementById('logout-btn');
    
    if (logoutButton) {
        logoutButton.addEventListener('click', (event) => {
            // Mencegah link berpindah halaman (karena href="#")
            event.preventDefault(); 
            
            // Tampilkan konfirmasi
            const isConfirmed = confirm('Apakah Anda yakin ingin keluar?');
            
            if (isConfirmed) {
                // Jika dikonfirmasi, lakukan aksi logout
                console.log('Pengguna telah logout.');
                alert('Anda telah berhasil logout.');
                
                // Arahkan ke halaman login (ganti 'login.html' jika perlu)
                window.location.href = 'login.html';
            }
        });
    }

    // --- Logika untuk Tombol Details ---
    const allDetailButtons = document.querySelectorAll('.details-btn');
    
    allDetailButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Ambil URL tujuan dari atribut 'data-url'
            const targetPage = button.getAttribute('data-url');
            
            if (targetPage) {
                // Arahkan pengguna ke halaman yang sesuai
                console.log(`Navigasi ke halaman: ${targetPage}`);
                window.location.href = targetPage;
            } else {
                console.error('Atribut data-url tidak ditemukan pada tombol.');
            }
        });
    });

});