// Admin Authentication
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Simple demo authentication (in production, use proper backend authentication)
            if (username === 'admin' && password === 'admin123') {
                // Store authentication
                sessionStorage.setItem('adminAuthenticated', 'true');
                sessionStorage.setItem('adminUser', username);

                // Redirect to admin dashboard
                window.location.href = 'admin.html';
            } else {
                alert('Usuário ou senha incorretos!');
            }
        });
    }
});

// Check authentication for admin pages
function checkAuth() {
    const isAuthenticated = sessionStorage.getItem('adminAuthenticated');
    const currentPage = window.location.pathname;

    if (!isAuthenticated && currentPage.includes('admin.html')) {
        window.location.href = 'admin-login.html';
    }
}

// Call on page load
if (window.location.pathname.includes('admin.html')) {
    checkAuth();
}
