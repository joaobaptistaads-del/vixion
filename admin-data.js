// Admin Data Management
class AdminData {
    constructor() {
        this.initializeData();
    }

    initializeData() {
        // Initialize with demo data if not exists
        if (!localStorage.getItem('orders')) {
            const demoOrders = [
                { id: 1, customer: 'Maria Silva', items: 'Risoto de Funghi, Tiramisu', total: 123.00, status: 'completed', date: new Date().toISOString() },
                { id: 2, customer: 'João Santos', items: 'Filé Mignon, Vinho Tinto', total: 245.00, status: 'completed', date: new Date(Date.now() - 86400000).toISOString() },
                { id: 3, customer: 'Ana Costa', items: 'Salmão Grelhado, Cheesecake', total: 156.00, status: 'pending', date: new Date().toISOString() }
            ];
            localStorage.setItem('orders', JSON.stringify(demoOrders));
        }

        if (!localStorage.getItem('reservations')) {
            const demoReservations = [
                { id: 1, name: 'Carlos Oliveira', email: 'carlos@email.com', phone: '(11) 98765-4321', guests: 4, date: '2026-02-15', time: '19:00', status: 'confirmed' },
                { id: 2, name: 'Patricia Lima', email: 'patricia@email.com', phone: '(11) 98765-1234', guests: 2, date: '2026-02-16', time: '20:00', status: 'pending' },
                { id: 3, name: 'Roberto Alves', email: 'roberto@email.com', phone: '(11) 98765-5678', guests: 6, date: '2026-02-17', time: '19:30', status: 'confirmed' }
            ];
            localStorage.setItem('reservations', JSON.stringify(demoReservations));
        }

        if (!localStorage.getItem('menuItems')) {
            const demoMenuItems = [
                { id: 1, category: 'Entradas', name: 'Bruschetta de Tomate', description: 'Pão italiano com tomate fresco e manjericão', price: 35.00 },
                { id: 2, category: 'Entradas', name: 'Carpaccio de Salmão', description: 'Salmão fresco em fatias finas', price: 55.00 },
                { id: 3, category: 'Pratos Principais', name: 'Risoto de Funghi Porcini', description: 'Risoto cremoso com cogumelos importados', price: 85.00 },
                { id: 4, category: 'Pratos Principais', name: 'Filé Mignon ao Molho Madeira', description: 'Filé mignon premium com molho especial', price: 145.00 },
                { id: 5, category: 'Sobremesas', name: 'Tiramisu Clássico', description: 'Sobremesa italiana tradicional', price: 28.00 },
                { id: 6, category: 'Sobremesas', name: 'Petit Gateau', description: 'Bolo de chocolate com sorvete', price: 32.00 },
                { id: 7, category: 'Bebidas', name: 'Vinho Tinto Reserva', description: 'Vinho selecionado da casa', price: 120.00 },
                { id: 8, category: 'Bebidas', name: 'Café Especial', description: 'Café gourmet premium', price: 18.00 }
            ];
            localStorage.setItem('menuItems', JSON.stringify(demoMenuItems));
        }

        if (!localStorage.getItem('salesData')) {
            this.generateSalesData();
        }
    }

    generateSalesData() {
        const salesData = {
            today: [],
            week: [],
            month: [],
            quarter: []
        };

        const now = new Date();
        
        // Generate today's sales (last 12 hours)
        for (let i = 0; i < 12; i++) {
            const time = new Date(now.getTime() - (i * 3600000));
            salesData.today.push({
                time: time.toISOString(),
                amount: Math.random() * 500 + 100
            });
        }

        // Generate week's sales
        for (let i = 0; i < 7; i++) {
            const date = new Date(now.getTime() - (i * 86400000));
            salesData.week.push({
                date: date.toISOString(),
                amount: Math.random() * 3000 + 1000
            });
        }

        // Generate month's sales
        for (let i = 0; i < 30; i++) {
            const date = new Date(now.getTime() - (i * 86400000));
            salesData.month.push({
                date: date.toISOString(),
                amount: Math.random() * 3000 + 1000
            });
        }

        // Generate quarter's sales
        for (let i = 0; i < 90; i++) {
            const date = new Date(now.getTime() - (i * 86400000));
            salesData.quarter.push({
                date: date.toISOString(),
                amount: Math.random() * 3000 + 1000
            });
        }

        localStorage.setItem('salesData', JSON.stringify(salesData));
    }

    getOrders() {
        return JSON.parse(localStorage.getItem('orders') || '[]');
    }

    addOrder(order) {
        const orders = this.getOrders();
        order.id = orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1;
        order.date = new Date().toISOString();
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));
        return order;
    }

    updateOrder(id, updates) {
        const orders = this.getOrders();
        const index = orders.findIndex(o => o.id === id);
        if (index !== -1) {
            orders[index] = { ...orders[index], ...updates };
            localStorage.setItem('orders', JSON.stringify(orders));
            return orders[index];
        }
        return null;
    }

    deleteOrder(id) {
        const orders = this.getOrders().filter(o => o.id !== id);
        localStorage.setItem('orders', JSON.stringify(orders));
    }

    getReservations() {
        return JSON.parse(localStorage.getItem('reservations') || '[]');
    }

    updateReservation(id, updates) {
        const reservations = this.getReservations();
        const index = reservations.findIndex(r => r.id === id);
        if (index !== -1) {
            reservations[index] = { ...reservations[index], ...updates };
            localStorage.setItem('reservations', JSON.stringify(reservations));
            return reservations[index];
        }
        return null;
    }

    deleteReservation(id) {
        const reservations = this.getReservations().filter(r => r.id !== id);
        localStorage.setItem('reservations', JSON.stringify(reservations));
    }

    getMenuItems() {
        return JSON.parse(localStorage.getItem('menuItems') || '[]');
    }

    addMenuItem(item) {
        const items = this.getMenuItems();
        item.id = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
        items.push(item);
        localStorage.setItem('menuItems', JSON.stringify(items));
        return item;
    }

    updateMenuItem(id, updates) {
        const items = this.getMenuItems();
        const index = items.findIndex(i => i.id === id);
        if (index !== -1) {
            items[index] = { ...items[index], ...updates };
            localStorage.setItem('menuItems', JSON.stringify(items));
            return items[index];
        }
        return null;
    }

    deleteMenuItem(id) {
        const items = this.getMenuItems().filter(i => i.id !== id);
        localStorage.setItem('menuItems', JSON.stringify(items));
    }

    getSalesData(period = 'today') {
        const allData = JSON.parse(localStorage.getItem('salesData') || '{}');
        return allData[period] || [];
    }

    getTodayStats() {
        const orders = this.getOrders();
        const today = new Date().toDateString();
        const todayOrders = orders.filter(o => new Date(o.date).toDateString() === today);
        
        const totalSales = todayOrders.reduce((sum, order) => sum + order.total, 0);
        const totalOrders = todayOrders.length;

        const reservations = this.getReservations();
        const todayReservations = reservations.filter(r => new Date(r.date).toDateString() === today);

        return {
            sales: totalSales,
            orders: totalOrders,
            reservations: todayReservations.length,
            customers: Math.floor(Math.random() * 50) + 20 // Demo value
        };
    }

    getSettings() {
        return JSON.parse(localStorage.getItem('settings') || JSON.stringify({
            restaurantName: 'Great Gourmet',
            address: 'Av. Gourmet, 1234',
            phone: '(11) 1234-5678',
            facebook: '',
            instagram: '',
            twitter: ''
        }));
    }

    updateSettings(settings) {
        localStorage.setItem('settings', JSON.stringify(settings));
    }
}

// Initialize admin data
const adminData = new AdminData();
