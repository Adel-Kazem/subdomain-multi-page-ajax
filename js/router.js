// router.js - Client-side router with dynamic component loading and base path support

// Base path for the application
const getBasePath = () => {
    return window.PrimeBeefConfig ? window.PrimeBeefConfig.basePath : '';
};

// Define routes configuration
const routes = {
    '/': {
        title: 'Prime Beef Lebanon - Premium Beef Butchery',
        templateId: 'home-template',
        templatePath: 'home.html',
        init: initHomePage
    },
    '/products': {
        title: 'Our Products - Prime Beef Lebanon',
        templateId: 'products-template',
        templatePath: 'products.html',
        init: initProductsPage
    },
    '/product/:id': {
        title: 'Product Details - Prime Beef Lebanon',
        templateId: 'product-detail-template',
        templatePath: 'product-detail.html',
        init: initProductDetailPage
    },
    '/cart': {
        title: 'Your Cart - Prime Beef Lebanon',
        templateId: 'cart-template',
        templatePath: 'cart.html',
        init: initCartPage
    },
    '/checkout': {
        title: 'Checkout - Prime Beef Lebanon',
        templateId: 'checkout-template',
        templatePath: 'checkout.html',
        init: initCheckoutPage
    },
    '/about': {
        title: 'About Us - Prime Beef Lebanon',
        templateId: 'about-template',
        templatePath: 'about.html',
        init: initStaticPage
    },
    '/contact': {
        title: 'Contact Us - Prime Beef Lebanon',
        templateId: 'contact-template',
        templatePath: 'contact.html',
        init: initContactPage
    },
    '/services': {
        title: 'Our Services - Prime Beef Lebanon',
        templateId: 'services-template',
        templatePath: 'services.html',
        init: initServicesPage
    },
    '/404': {
        title: 'Page Not Found - Prime Beef Lebanon',
        templateId: 'not-found-template',
        templatePath: 'not-found.html',
        init: () => {}
    }
};

// Router state
let currentRoute = null;
let params = {};

// Initialize router
function initRouter() {
    console.log('Initializing router with base path:', getBasePath());

    // Listen for route changes using History API
    window.addEventListener('popstate', handleRouteChange);

    // Handle clicks on links
    document.addEventListener('click', e => {
        // Find closest anchor tag
        const link = e.target.closest('a');

        // Only handle links with 'data-spa-link' attribute
        if (link && link.hasAttribute('data-spa-link')) {
            e.preventDefault();
            const href = link.getAttribute('href');
            navigateTo(href);
        }
    });

    // Initial route handling
    handleRouteChange();

    // Preload some common templates
    preloadCommonTemplates();
}

// Preload commonly used templates
function preloadCommonTemplates() {
    window.ComponentLoader.preload([
        routes['/'].templatePath,
        routes['/404'].templatePath
    ]);
}

// Handle route changes
// Updated handleRouteChange function in router.js

// Handle route changes
async function handleRouteChange() {
    // Get current path
    let path = window.location.pathname;

    console.log('Original path:', path);

    // Handle direct index.html access
    if (path.endsWith('index.html')) {
        console.log('Converting index.html path to root path');
        // Replace index.html with empty string to get the directory path
        path = path.replace(/index\.html$/, '');

        // Ensure path ends with a slash if it's not the root
        if (path !== '/' && !path.endsWith('/')) {
            path = path + '/';
        }
    }

    // Remove base path if present
    const basePath = getBasePath();
    if (basePath && path.startsWith(basePath)) {
        path = path.substring(basePath.length);
    }

    // Ensure path starts with a slash
    if (!path.startsWith('/')) {
        path = '/' + path;
    }

    // Default to home for empty paths
    if (path === '/' || path === '') {
        path = '/';
    }

    console.log('Processed path for routing:', path);

    // Find matching route
    let matchedRoute = null;
    let matchedParams = {};

    // Check for exact route match first
    if (routes[path]) {
        matchedRoute = routes[path];
    } else {
        // Check for parameterized routes
        for (const routePath in routes) {
            if (routePath.includes(':')) {
                const routeParts = routePath.split('/');
                const pathParts = path.split('/');

                if (routeParts.length === pathParts.length) {
                    let isMatch = true;
                    const params = {};

                    for (let i = 0; i < routeParts.length; i++) {
                        if (routeParts[i].startsWith(':')) {
                            // This is a parameter
                            const paramName = routeParts[i].substring(1);
                            params[paramName] = pathParts[i];
                        } else if (routeParts[i] !== pathParts[i]) {
                            isMatch = false;
                            break;
                        }
                    }

                    if (isMatch) {
                        matchedRoute = routes[routePath];
                        matchedParams = params;
                        break;
                    }
                }
            }
        }
    }

    // If route found, render it
    if (matchedRoute) {
        currentRoute = matchedRoute;
        params = matchedParams;
        await renderRoute(matchedRoute, matchedParams);
    } else {
        // Not found - redirect to 404
        console.error('Route not found:', path);
        currentRoute = routes['/404'];
        params = {};
        await renderRoute(routes['/404'], {});
    }
}

// Render the current route
async function renderRoute(route, params) {
    // Update page title
    document.title = route.title;

    // Add a fade-out class to main content
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        mainContent.classList.add('fade-out');

        // Wait for transition
        await new Promise(resolve => setTimeout(resolve, 300));
    }

    // Get the template
    try {
        // Load the template
        const template = await window.ComponentLoader.load(route.templatePath);

        if (mainContent) {
            // Clear and update main content
            mainContent.innerHTML = '';
            mainContent.appendChild(template.cloneNode(true));

            // Initialize the page with params
            if (typeof route.init === 'function') {
                route.init(params);
            }

            // Scroll to top
            window.scrollTo(0, 0);

            // Re-initialize Alpine.js on new DOM content
            if (window.Alpine) {
                window.Alpine.initTree(mainContent);
            }

            // Remove the fade-out class
            setTimeout(() => {
                mainContent.classList.remove('fade-out');
            }, 50);
        } else {
            console.error('Main content container not found');
        }
    } catch (error) {
        console.error('Error rendering route:', error);

        // Handle template loading error by showing 404 page
        if (route.templateId !== 'not-found-template') {
            await renderRoute(routes['/404'], {});
        }
    }
}

// Navigate to a specific route
function navigateTo(path) {
    // Ensure path starts with a slash
    if (!path.startsWith('/')) {
        path = '/' + path;
    }

    // Add base path if configured
    const basePath = getBasePath();
    const fullPath = basePath + path;

    console.log('Navigating to:', fullPath);

    // Update browser history
    window.history.pushState({}, '', fullPath);

    // Handle the route change
    handleRouteChange();
}

// Page initialization functions
function initHomePage() {
    console.log('Home page initialized');
    // Initialize home page specific functionality
}

function initProductsPage(params) {
    console.log('Products page initialized');
    // Initialize products listing with optional category filter
    const category = new URLSearchParams(window.location.search).get('category');
    if (category) {
        // Filter products by category
        console.log('Filtering by category:', category);

        // Set category in Alpine.js data
        const mainContent = document.getElementById('main-content');
        if (mainContent && mainContent.__x) {
            mainContent.__x.$data.selectedCategory = category;
        }
    }
}

function initProductDetailPage(params) {
    console.log('Product detail page initialized for product ID:', params.id);
    // Load specific product data
    // This would fetch the product by ID and update the UI
}

function initCartPage() {
    console.log('Cart page initialized');
    // Initialize cart functionality
}

function initCheckoutPage() {
    console.log('Checkout page initialized');
    // Initialize checkout functionality
}

function initStaticPage() {
    console.log('Static page initialized');
    // For pages with minimal interactivity
}

function initContactPage() {
    console.log('Contact page initialized');
    // Initialize contact form validation, etc.
}

function initServicesPage() {
    console.log('Services page initialized');
    // Initialize services page specific functionality
}

// Export router functions
window.PrimeBeefRouter = {
    init: initRouter,
    navigateTo: navigateTo,
    getCurrentRoute: () => currentRoute,
    getParams: () => params
};