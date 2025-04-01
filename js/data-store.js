// data-store.js - Centralized data management for the application

// Product Categories
const CATEGORIES = [
    { id: 'premium-cuts', name: 'Premium Cuts', description: 'Our finest selection of premium beef cuts' },
    { id: 'steak', name: 'Steak', description: 'Perfect steaks for any occasion' },
    { id: 'ground-beef', name: 'Ground Beef', description: 'High-quality ground beef options' },
    { id: 'roasts', name: 'Roasts', description: 'Tender and flavorful beef roasts' },
    { id: 'specialty', name: 'Specialty Items', description: 'Unique and specialty beef products' }
];

// Enhanced Products with categories and featured flag
const PRODUCTS = [
    {
        id: 1,
        name: 'Premium Ribeye Steak',
        description: 'Our most flavorful steak, the Ribeye is rich, juicy and full-flavored with generous marbling throughout. Perfect for grilling or pan-searing.',
        price: 34.99,
        rating: 4.8,
        stock: 24,
        featured: true,
        categoryIds: ['premium-cuts', 'steak'],
        images: [
            'https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        ],
        options: ['8oz', '12oz', '16oz'],
        features: [
            'Prime Grade',
            'Grass-fed',
            'Aged 21 days',
            'Locally sourced'
        ]
    },
    {
        id: 2,
        name: 'Filet Mignon',
        description: 'The most tender of all cuts, our Filet Mignon is lean yet succulent with a buttery texture. Ideal for special occasions and elegant dining.',
        price: 39.99,
        rating: 4.9,
        stock: 18,
        featured: true,
        categoryIds: ['premium-cuts', 'steak'],
        images: [
            'https://images.unsplash.com/photo-1558030006-450675393462?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1603048588665-709659814a58?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
        ],
        options: ['6oz', '8oz', '10oz'],
        features: [
            'Prime Grade',
            'Grass-fed',
            'Aged 28 days',
            'Exceptionally tender'
        ]
    },
    {
        id: 3,
        name: 'New York Strip Steak',
        description: 'A classic favorite, our New York Strip offers a perfect balance of tenderness and flavor with a firm texture. Great for grilling or broiling.',
        price: 32.99,
        rating: 4.7,
        stock: 22,
        featured: false,
        categoryIds: ['steak'],
        images: [
            'https://images.unsplash.com/photo-1529694157872-4e0c0f3b238b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1615937722923-67f6deaf2cc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
        ],
        options: ['10oz', '14oz', '16oz'],
        features: [
            'Choice Grade',
            'Grass-fed',
            'Aged 21 days',
            'Rich flavor'
        ]
    },
    {
        id: 4,
        name: 'Tomahawk Steak',
        description: 'A showstopper cut, our Tomahawk is essentially a ribeye with the entire rib bone left intact. Impressive presentation with exceptional flavor.',
        price: 49.99,
        rating: 5.0,
        stock: 12,
        featured: true,
        categoryIds: ['premium-cuts', 'steak'],
        images: [
            'https://images.unsplash.com/photo-1615937722387-cc7499419260?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1615939189929-7a2a8c7816c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
        ],
        options: ['32oz', '40oz'],
        features: [
            'Prime Grade',
            'Grass-fed',
            'Dry-aged 28 days',
            'Spectacular presentation'
        ]
    },
    {
        id: 5,
        name: 'Premium Ground Beef',
        description: 'Our premium ground beef is prepared daily from trim of our best cuts. Perfect for gourmet burgers, meatballs, or any recipe calling for quality ground beef.',
        price: 9.99,
        rating: 4.6,
        stock: 40,
        featured: false,
        categoryIds: ['ground-beef'],
        images: [
            'https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1529694157872-4e0c0f3b238b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
        ],
        options: ['1lb', '3lb', '5lb'],
        features: [
            '85% lean',
            'No fillers',
            'Freshly ground daily',
            'Perfect for burgers'
        ]
    },
    {
        id: 6,
        name: 'Beef Tenderloin Roast',
        description: 'The ultimate special occasion roast. Our whole beef tenderloin roast is exceptionally tender with a mild, buttery flavor. Perfect for holidays and celebrations.',
        price: 84.99,
        rating: 4.9,
        stock: 10,
        featured: true,
        categoryIds: ['premium-cuts', 'roasts'],
        images: [
            'https://images.unsplash.com/photo-1588791174744-7e9bf4d9a809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
        ],
        options: ['2-3lb', '4-5lb', '6-7lb'],
        features: [
            'Prime Grade',
            'Grass-fed',
            'Perfect for roasting',
            'Elegant centerpiece'
        ]
    }
    // You can add more products as needed
];

// Store Class for managing application data
class Store {
    constructor() {
        this.categories = CATEGORIES;
        this.products = PRODUCTS;
        this.cart = [];

        // Load cart from localStorage if available
        this.loadCart();
    }

    // Get all categories
    getCategories() {
        return this.categories;
    }

    // Get category by ID
    getCategoryById(id) {
        return this.categories.find(category => category.id === id);
    }

    // Get all products
    getAllProducts() {
        return this.products;
    }

    // Get featured products
    getFeaturedProducts() {
        return this.products.filter(product => product.featured);
    }

    // Get products by category
    getProductsByCategory(categoryId) {
        return this.products.filter(product =>
            product.categoryIds.includes(categoryId)
        );
    }

    // Get product by ID
    getProductById(id) {
        const numId = parseInt(id, 10);
        return this.products.find(product => product.id === numId);
    }

    // Search products
    searchProducts(query) {
        const searchTerm = query.toLowerCase().trim();
        return this.products.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
    }

    // Cart Management

    // Load cart from localStorage
    loadCart() {
        try {
            const savedCart = localStorage.getItem('primeBeefCart');
            if (savedCart) {
                this.cart = JSON.parse(savedCart);
            }
        } catch (e) {
            console.error('Error loading cart from localStorage:', e);
            this.cart = [];
        }
    }

    // Save cart to localStorage
    saveCart() {
        try {
            localStorage.setItem('primeBeefCart', JSON.stringify(this.cart));
        } catch (e) {
            console.error('Error saving cart to localStorage:', e);
        }
    }

    // Get cart contents
    getCart() {
        return this.cart;
    }

    // Add item to cart
    addToCart(productId, quantity = 1, options = {}) {
        const product = this.getProductById(productId);
        if (!product) return false;

        // Check if product already in cart
        const existingItem = this.cart.find(item =>
            item.productId === productId &&
            JSON.stringify(item.options) === JSON.stringify(options)
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({
                productId,
                quantity,
                options,
                price: product.price,
                name: product.name,
                image: Array.isArray(product.images) ? product.images[0] : product.images
            });
        }

        this.saveCart();
        return true;
    }

    // Update cart item quantity
    updateCartItemQuantity(index, quantity) {
        if (index >= 0 && index < this.cart.length) {
            if (quantity <= 0) {
                // Remove item if quantity is zero or negative
                this.cart.splice(index, 1);
            } else {
                this.cart[index].quantity = quantity;
            }
            this.saveCart();
            return true;
        }
        return false;
    }

    // Remove item from cart
    removeFromCart(index) {
        if (index >= 0 && index < this.cart.length) {
            this.cart.splice(index, 1);
            this.saveCart();
            return true;
        }
        return false;
    }

    // Clear cart
    clearCart() {
        this.cart = [];
        this.saveCart();
    }

    // Calculate cart totals
    getCartTotals() {
        const subtotal = this.cart.reduce((total, item) =>
            total + (item.price * item.quantity), 0
        );

        // Could add tax, shipping, etc. calculations here
        const tax = subtotal * 0.11; // 11% tax example
        const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
        const total = subtotal + tax + shipping;

        return {
            subtotal: subtotal.toFixed(2),
            tax: tax.toFixed(2),
            shipping: shipping.toFixed(2),
            total: total.toFixed(2),
            itemCount: this.cart.reduce((count, item) => count + item.quantity, 0)
        };
    }

    // Generate WhatsApp order message
    generateWhatsAppOrderMessage() {
        if (this.cart.length === 0) return '';

        const totals = this.getCartTotals();
        let message = '🥩 *Prime Beef Order* 🥩\n\n';

        // Add cart items
        message += '*Order Items:*\n';
        this.cart.forEach((item, index) => {
            message += `${index + 1}. ${item.name} - ${item.quantity}x $${item.price.toFixed(2)}`;

            // Add options if any
            if (Object.keys(item.options).length > 0) {
                message += ' (';
                message += Object.entries(item.options)
                    .map(([key, value]) => `${key}: ${value}`)
                    .join(', ');
                message += ')';
            }

            message += ` = $${(item.price * item.quantity).toFixed(2)}\n`;
        });

        // Add totals
        message += '\n*Order Summary:*\n';
        message += `Subtotal: $${totals.subtotal}\n`;
        message += `Tax (11%): $${totals.tax}\n`;
        message += `Shipping: $${totals.shipping}\n`;
        message += `*Total: $${totals.total}*\n\n`;

        // Customer will add their info in WhatsApp
        message += 'Please provide your delivery address and preferred delivery time. Thank you for your order!';

        return encodeURIComponent(message);
    }
}

// Create and export the store
window.PrimeBeefStore = new Store();