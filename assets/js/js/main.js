document.addEventListener('DOMContentLoaded', () => {
    
    // 1. FUNGSI MENU MOBILE (PRIORITAS UTAMA AGAR TIDAK MACET)
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Hindari layar loncat
            mainNav.classList.toggle('active');
            mobileMenuBtn.innerHTML = mainNav.classList.contains('active') ? '✕' : '☰';
        });
    }
        
    // 2. TOGGLE SIDEBAR MOBILE (Admin Panel)
    const adminToggle = document.getElementById('adminToggle');
    const adminSidebar = document.getElementById('adminSidebar');
    if (adminToggle && adminSidebar) {
        adminToggle.addEventListener('click', (e) => {
            e.preventDefault();
            adminSidebar.classList.toggle('active');
            adminToggle.innerHTML = adminSidebar.classList.contains('active') ? '✕ Tutup' : '☰ Menu Admin';
        });
    }

    // 3. HIGHLIGHT MENU NAVIGASI AKTIF
    try {
        const currentLocation = window.location.href;
        const menuItems = document.querySelectorAll('nav a');
        menuItems.forEach(item => {
            const href = item.getAttribute('href');
            if (href && href !== '#' && currentLocation.includes(href)) {
                item.classList.add('active');
            }
        });
    } catch(err) { console.error("Error Navigasi:", err); }

    // 4. SISTEM LOGIN ADMIN
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const user = loginForm.username.value;
            const pass = loginForm.password.value;

            // Kredensial Akses
            if (user === 'admin' && pass === 'anakindo123') {
                try { localStorage.setItem('isAdmin', 'true'); } catch(err) {}
                window.location.href = 'admin.html?auth=sukses';
            } else {
                alert('Akses Ditolak: Username atau Kata Sandi salah!');
            }
        });
    }

    // 5. FUNGSI FORM PEMESANAN
    const pesanForm = document.getElementById('pesanForm');
    if (pesanForm) {
        pesanForm.addEventListener('submit', (e) => {
            e.preventDefault();
            try {
                const formData = new FormData(pesanForm);
                const data = Object.fromEntries(formData.entries());
                
                data.id = 'TRX-' + Math.floor(1000 + Math.random() * 9000);
                data.status = 'Menunggu';

                let orders = JSON.parse(localStorage.getItem('anakindo_orders')) || [];
                orders.unshift(data); 
                localStorage.setItem('anakindo_orders', JSON.stringify(orders));

                alert(`Terima kasih ${data.nama}! Formulir pesanan untuk ${data.layanan} berhasil dikirim.`);
                pesanForm.reset();
            } catch (err) {
                alert("Terjadi kesalahan saat memproses pesanan.");
            }
        });
    }

    // 6. FUNGSI FORM KONTAK
    const kontakForm = document.getElementById('kontakForm');
    if (kontakForm) {
        kontakForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Terima kasih! Pesan Anda telah terkirim ke tim layanan pelanggan kami.');
            kontakForm.reset();
        });
    }

    // 7. RENDER DATA KE TABEL ADMIN PANEL
    const adminTableBody = document.getElementById('adminTableBody');
    if (adminTableBody) {
        try {
            let orders = JSON.parse(localStorage.getItem('anakindo_orders')) || [];
            const totalPesananEl = document.getElementById('totalPesanan');
            if (totalPesananEl) totalPesananEl.innerText = orders.length;
            
            if (orders.length === 0) {
                adminTableBody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding: 30px; color: #888;">Belum ada pesanan masuk.</td></tr>';
            } else {
                adminTableBody.innerHTML = '';
                orders.forEach(order => {
                    adminTableBody.innerHTML += `
                        <tr>
                            <td style="font-weight: bold; color: var(--brand-green);">#${order.id}</td>
                            <td>${order.nama}</td>
                            <td>${order.layanan}</td>
                            <td><span class="badge badge-pending">${order.status}</span></td>
                            <td><button class="btn-sm" style="background: var(--fade-green);" onclick="alert('Fitur tinjau segera hadir!')">Tinjau</button></td>
                        </tr>
                    `;
                });
            }
        } catch (err) { console.error("Error Render Admin:", err); }
    }
    
});