// Admin Dashboard Script
document.addEventListener('DOMContentLoaded', () => {
    // Check authentication
    checkAuth();

    // Initialize dashboard
    initializeDashboard();
    initializeNavigation();
    initializeModals();
    loadDashboardData();
});

function checkAuth() {
    const isAuthenticated = sessionStorage.getItem('adminAuthenticated');
    if (!isAuthenticated) {
        window.location.href = 'admin-login.html';
    }
}

function initializeDashboard() {
    // Set admin user name
    const userName = sessionStorage.getItem('adminUser') || 'Administrador';
    const userNameElement = document.getElementById('adminUserName');
    if (userNameElement) {
        userNameElement.textContent = userName.charAt(0).toUpperCase() + userName.slice(1);
    }

    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            sessionStorage.removeItem('adminAuthenticated');
            sessionStorage.removeItem('adminUser');
            window.location.href = 'admin-login.html';
        });
    }
}

function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item[data-page]');
    const pages = document.querySelectorAll('.page-content');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            // Show corresponding page
            const pageName = item.dataset.page;
            pages.forEach(page => page.classList.remove('active'));
            const targetPage = document.getElementById(`${pageName}Page`);
            if (targetPage) {
                targetPage.classList.add('active');
            }

            // Update page title
            const pageTitle = document.getElementById('pageTitle');
            if (pageTitle) {
                pageTitle.textContent = item.textContent.trim();
            }

            // Load page-specific data
            loadPageData(pageName);
        });
    });
}

function loadDashboardData() {
    loadStats();
    loadSalesChart('today');
    loadRecentActivity();
    setupPeriodButtons();
}

function loadStats() {
    const stats = adminData.getTodayStats();
    
    document.getElementById('salesToday').textContent = formatCurrency(stats.sales);
    document.getElementById('ordersToday').textContent = stats.orders;
    document.getElementById('reservationsToday').textContent = stats.reservations;
    document.getElementById('activeCustomers').textContent = stats.customers;
}

function loadSalesChart(period) {
    const salesData = adminData.getSalesData(period);
    const canvas = document.getElementById('salesChart');
    
    if (!canvas) return;

    // Simple bar chart visualization
    const ctx = canvas.getContext('2d');
    const width = canvas.parentElement.clientWidth;
    const height = 300;
    
    canvas.width = width;
    canvas.height = height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    if (salesData.length === 0) return;

    const maxAmount = Math.max(...salesData.map(d => d.amount));
    const barWidth = width / salesData.length - 10;
    const chartHeight = height - 40;

    salesData.reverse().forEach((data, index) => {
        const barHeight = (data.amount / maxAmount) * chartHeight;
        const x = index * (barWidth + 10);
        const y = height - barHeight - 20;

        // Draw bar
        ctx.fillStyle = '#c49b63';
        ctx.fillRect(x, y, barWidth, barHeight);
    });

    // Update summary
    const total = salesData.reduce((sum, d) => sum + d.amount, 0);
    const average = total / salesData.length;
    
    document.getElementById('periodTotal').textContent = formatCurrency(total);
    document.getElementById('dailyAverage').textContent = formatCurrency(average);
    document.getElementById('totalOrders').textContent = salesData.length;
}

function setupPeriodButtons() {
    const periodButtons = document.querySelectorAll('.period-btn');
    
    periodButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            periodButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const period = btn.dataset.period;
            loadSalesChart(period);
        });
    });
}

function loadRecentActivity() {
    const activityList = document.getElementById('activityList');
    if (!activityList) return;

    const orders = adminData.getOrders().slice(-5).reverse();
    
    activityList.innerHTML = '';
    
    orders.forEach(order => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.innerHTML = `
            <div class="activity-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
            </div>
            <div class="activity-content">
                <p><strong>${order.customer}</strong> fez um pedido de ${formatCurrency(order.total)}</p>
                <span class="activity-time">${formatDate(order.date)}</span>
            </div>
        `;
        activityList.appendChild(activityItem);
    });
}

function loadPageData(pageName) {
    switch(pageName) {
        case 'orders':
            loadOrdersTable();
            break;
        case 'reservations':
            loadReservationsTable();
            break;
        case 'menu':
            loadMenuItems();
            break;
        case 'settings':
            loadSettings();
            break;
    }
}

function loadOrdersTable() {
    const tbody = document.getElementById('ordersTableBody');
    if (!tbody) return;

    const orders = adminData.getOrders().reverse();
    
    tbody.innerHTML = '';
    
    orders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>#${order.id}</td>
            <td>${order.customer}</td>
            <td>${order.items}</td>
            <td>${formatCurrency(order.total)}</td>
            <td><span class="status-badge status-${order.status}">${getStatusText(order.status)}</span></td>
            <td>${formatDate(order.date)}</td>
            <td class="table-actions">
                <button class="btn btn-small btn-secondary" onclick="editOrder(${order.id})">Editar</button>
                <button class="btn btn-small btn-danger" onclick="deleteOrder(${order.id})">Excluir</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function loadReservationsTable() {
    const tbody = document.getElementById('reservationsTableBody');
    if (!tbody) return;

    const reservations = adminData.getReservations().reverse();
    
    tbody.innerHTML = '';
    
    reservations.forEach(reservation => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>#${reservation.id}</td>
            <td>${reservation.name}</td>
            <td>${reservation.email}</td>
            <td>${reservation.phone}</td>
            <td>${reservation.guests}</td>
            <td>${reservation.date} ${reservation.time}</td>
            <td><span class="status-badge status-${reservation.status}">${getStatusText(reservation.status)}</span></td>
            <td class="table-actions">
                <button class="btn btn-small btn-secondary" onclick="confirmReservation(${reservation.id})">Confirmar</button>
                <button class="btn btn-small btn-danger" onclick="cancelReservation(${reservation.id})">Cancelar</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function loadMenuItems() {
    const grid = document.getElementById('menuItemsGrid');
    if (!grid) return;

    const items = adminData.getMenuItems();
    
    grid.innerHTML = '';
    
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'menu-card';
        card.innerHTML = `
            <div class="menu-card-image">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                    <line x1="6" y1="1" x2="6" y2="4"></line>
                    <line x1="10" y1="1" x2="10" y2="4"></line>
                    <line x1="14" y1="1" x2="14" y2="4"></line>
                </svg>
            </div>
            <div class="menu-card-content">
                <div class="menu-card-category">${item.category}</div>
                <h3>${item.name}</h3>
                <p class="menu-card-description">${item.description || ''}</p>
                <div class="menu-card-footer">
                    <div class="menu-card-price">${formatCurrency(item.price)}</div>
                    <div class="menu-card-actions">
                        <button class="btn btn-small btn-secondary" onclick="editMenuItem(${item.id})">Editar</button>
                        <button class="btn btn-small btn-danger" onclick="deleteMenuItem(${item.id})">Excluir</button>
                    </div>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function loadSettings() {
    const settings = adminData.getSettings();
    
    document.getElementById('restaurantName').value = settings.restaurantName || '';
    document.getElementById('restaurantAddress').value = settings.address || '';
    document.getElementById('restaurantPhone').value = settings.phone || '';
    document.getElementById('facebookUrl').value = settings.facebook || '';
    document.getElementById('instagramUrl').value = settings.instagram || '';
    document.getElementById('twitterUrl').value = settings.twitter || '';
}

function initializeModals() {
    // Order Modal
    const addOrderBtn = document.getElementById('addOrderBtn');
    const orderModal = document.getElementById('orderModal');
    const orderForm = document.getElementById('orderForm');

    if (addOrderBtn && orderModal) {
        addOrderBtn.addEventListener('click', () => {
            orderModal.classList.add('active');
        });
    }

    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const order = {
                customer: document.getElementById('orderCustomer').value,
                items: document.getElementById('orderItems').value,
                total: parseFloat(document.getElementById('orderTotal').value),
                status: 'pending'
            };
            
            adminData.addOrder(order);
            orderForm.reset();
            orderModal.classList.remove('active');
            loadOrdersTable();
            loadStats();
            
            alert('Pedido criado com sucesso!');
        });
    }

    // Menu Item Modal
    const addMenuItemBtn = document.getElementById('addMenuItemBtn');
    const menuItemModal = document.getElementById('menuItemModal');
    const menuItemForm = document.getElementById('menuItemForm');

    if (addMenuItemBtn && menuItemModal) {
        addMenuItemBtn.addEventListener('click', () => {
            menuItemModal.classList.add('active');
        });
    }

    if (menuItemForm) {
        menuItemForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const item = {
                category: document.getElementById('itemCategory').value,
                name: document.getElementById('itemName').value,
                description: document.getElementById('itemDescription').value,
                price: parseFloat(document.getElementById('itemPrice').value)
            };
            
            adminData.addMenuItem(item);
            menuItemForm.reset();
            menuItemModal.classList.remove('active');
            loadMenuItems();
            
            alert('Item adicionado ao cardápio!');
        });
    }

    // Close modals
    document.querySelectorAll('.modal-close').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            closeBtn.closest('.modal').classList.remove('active');
        });
    });

    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
        }
    });

    // Settings save buttons
    const saveSocialBtn = document.getElementById('saveSocialBtn');
    if (saveSocialBtn) {
        saveSocialBtn.addEventListener('click', () => {
            const settings = adminData.getSettings();
            settings.facebook = document.getElementById('facebookUrl').value;
            settings.instagram = document.getElementById('instagramUrl').value;
            settings.twitter = document.getElementById('twitterUrl').value;
            
            adminData.updateSettings(settings);
            alert('Redes sociais atualizadas!');
        });
    }

    const saveInfoBtn = document.getElementById('saveInfoBtn');
    if (saveInfoBtn) {
        saveInfoBtn.addEventListener('click', () => {
            const settings = adminData.getSettings();
            settings.restaurantName = document.getElementById('restaurantName').value;
            settings.address = document.getElementById('restaurantAddress').value;
            settings.phone = document.getElementById('restaurantPhone').value;
            
            adminData.updateSettings(settings);
            alert('Informações atualizadas!');
        });
    }

    // Logo and background upload handlers
    const logoUpload = document.getElementById('logoUpload');
    if (logoUpload) {
        logoUpload.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const logoPreview = document.getElementById('logoPreview');
                    logoPreview.innerHTML = `<img src="${event.target.result}" style="max-width: 100%; max-height: 100%; object-fit: contain;">`;
                    alert('Logo atualizado! (Demo - em produção seria salvo no servidor)');
                };
                reader.readAsDataURL(file);
            }
        });
    }

    const bgUpload = document.getElementById('bgUpload');
    if (bgUpload) {
        bgUpload.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                alert('Imagem de fundo atualizada! (Demo - em produção seria salva no servidor)');
            }
        });
    }
}

// Action Functions
function editOrder(id) {
    const order = adminData.getOrders().find(o => o.id === id);
    if (order) {
        const newStatus = prompt('Novo status (pending/completed/cancelled):', order.status);
        if (newStatus) {
            adminData.updateOrder(id, { status: newStatus });
            loadOrdersTable();
            loadStats();
        }
    }
}

function deleteOrder(id) {
    if (confirm('Tem certeza que deseja excluir este pedido?')) {
        adminData.deleteOrder(id);
        loadOrdersTable();
        loadStats();
    }
}

function confirmReservation(id) {
    adminData.updateReservation(id, { status: 'confirmed' });
    loadReservationsTable();
    loadStats();
}

function cancelReservation(id) {
    if (confirm('Tem certeza que deseja cancelar esta reserva?')) {
        adminData.updateReservation(id, { status: 'cancelled' });
        loadReservationsTable();
        loadStats();
    }
}

function editMenuItem(id) {
    const item = adminData.getMenuItems().find(i => i.id === id);
    if (item) {
        const newPrice = prompt('Novo preço:', item.price);
        if (newPrice) {
            adminData.updateMenuItem(id, { price: parseFloat(newPrice) });
            loadMenuItems();
        }
    }
}

function deleteMenuItem(id) {
    if (confirm('Tem certeza que deseja excluir este item do cardápio?')) {
        adminData.deleteMenuItem(id);
        loadMenuItems();
    }
}

// Utility Functions
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
}

function getStatusText(status) {
    const statusMap = {
        'pending': 'Pendente',
        'confirmed': 'Confirmado',
        'completed': 'Concluído',
        'cancelled': 'Cancelado'
    };
    return statusMap[status] || status;
}
