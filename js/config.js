// config.js - Application configuration

/**
 * Application configuration settings
 */
const PrimeBeefConfig = {
    // Base path for the application (set to empty string if running in root directory)
    basePath: '/subdomain-multi-page-ajax',

    // API endpoint (if needed in the future)
    apiEndpoint: '',

    // WhatsApp phone number
    whatsappNumber: '96170608543',

    // Template paths
    templates: {
        base: '/subdomain-multi-page-ajax/templates'
    },

    // Asset paths
    assets: {
        images: '/subdomain-multi-page-ajax/images',
        css: '/subdomain-multi-page-ajax/css',
        js: '/subdomain-multi-page-ajax/js'
    }
};

// Helper function to resolve paths
PrimeBeefConfig.resolvePath = function(path) {
    // If path already starts with the base path, return it as is
    if (path.startsWith(this.basePath)) {
        return path;
    }

    // If path starts with a slash, append it to the base path
    if (path.startsWith('/')) {
        return this.basePath + path;
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