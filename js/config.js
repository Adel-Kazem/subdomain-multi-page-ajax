// config.js - Dynamic application configuration

/**
 * Determine the correct base path based on the current environment
 * @returns {string} The base path for the current environment
 */
function determineBasePath() {
    const hostname = window.location.hostname;
    const pathname = window.location.pathname;

    // Check if running on GitHub Pages custom domain
    if (hostname === 'multi-page-ajax.revunova.net') {
        console.log('Running on production custom domain');
        return ''; // Empty base path for root domain
    }

    // Check if running on github.io domain
    if (hostname.endsWith('github.io')) {
        console.log('Running on GitHub Pages');
        // Extract repository name from the path for github.io domain
        const pathParts = pathname.split('/');
        if (pathParts.length > 1) {
            return '/' + pathParts[1]; // e.g., /repository-name
        }
        return '';
    }

    // Local development - check if we're in a subdirectory
    if (pathname.includes('/subdomain-multi-page-ajax/')) {
        console.log('Running in local development subdirectory');
        return '/subdomain-multi-page-ajax';
    }

    // Default case - no base path
    console.log('Running in root directory');
    return '';
}

/**
 * Application configuration settings
 */
const PrimeBeefConfig = {
    // Base path for the application (dynamically determined)
    basePath: determineBasePath(),

    // WhatsApp phone number
    whatsappNumber: '96170608543',

    // Debug mode (helpful for development)
    debug: true
};

// Set up template paths based on base path
PrimeBeefConfig.templates = {
    base: PrimeBeefConfig.basePath + '/templates'
};

// Set up asset paths based on base path
PrimeBeefConfig.assets = {
    images: PrimeBeefConfig.basePath + '/images',
    css: PrimeBeefConfig.basePath + '/css',
    js: PrimeBeefConfig.basePath + '/js'
};

// Log the configuration if in debug mode
if (PrimeBeefConfig.debug) {
    console.log('PrimeBeef Configuration:', PrimeBeefConfig);
}

// Helper function to resolve paths
PrimeBeefConfig.resolvePath = function(path) {
    // If path already starts with the base path, return it as is
    if (path.startsWith(this.basePath)) {
        return path;
    }

    // If path starts with a slash and we have a base path, append it to the base path
    if (path.startsWith('/') && this.basePath) {
        return this.basePath + path;
    }

    // If path starts with a slash and we don't have a base path, return the path as is
    if (path.startsWith('/') && !this.basePath) {
        return path;
    }

    // Otherwise, add a slash between base path and the provided path
    return this.basePath + '/' + path;
};

// Helper function to resolve template paths
PrimeBeefConfig.resolveTemplatePath = function(templateName) {
    return this.templates.base + '/' + templateName;
};

// Export the configuration
window.PrimeBeefConfig = PrimeBeefConfig;