// config.js - Improved dynamic application configuration

/**
 * Determine the correct base path based on the current environment
 * @returns {string} The base path for the current environment
 */
function determineBasePath() {
    // Check for forced production mode
    if (window.FORCE_PRODUCTION) {
        console.log('🚀 Forced production mode - using empty base path');
        return '';
    }

    const hostname = window.location.hostname;
    const pathname = window.location.pathname;

    console.log('Environment detection - Hostname:', hostname);
    console.log('Environment detection - Pathname:', pathname);

    // PRODUCTION: Check if running on GitHub Pages custom domain
    if (hostname === 'multi-page-ajax.revunova.net') {
        console.log('🚀 Running on production custom domain');
        return ''; // Empty base path for root domain
    }

    // Rest of the function remains the same...
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

// Log the configuration in development
console.log('🔧 PrimeBeef Configuration:', PrimeBeefConfig);

// Helper function to resolve paths
PrimeBeefConfig.resolvePath = function(path) {
    // If path already starts with the base path, return it as is
    if (this.basePath && path.startsWith(this.basePath)) {
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
    if (this.basePath) {
        return this.basePath + '/' + path;
    }

    return path;
};

// Helper function to resolve template paths
PrimeBeefConfig.resolveTemplatePath = function(templateName) {
    return this.templates.base + '/' + templateName;
};

// Export the configuration
window.PrimeBeefConfig = PrimeBeefConfig;