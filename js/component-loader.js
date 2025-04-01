// component-loader.js - Dynamic template loading system with base path support

/**
 * Template cache to avoid redundant requests
 * @type {Object.<string, DocumentFragment>}
 */
const templateCache = {};

/**
 * Boolean tracking if templates are currently being loaded
 * @type {boolean}
 */
let isLoading = false;

/**
 * Queue of pending template loads
 * @type {Array.<{path: string, callback: Function}>}
 */
const loadQueue = [];

/**
 * Resolves a template path with the base path
 * @param {string} templatePath - Template path to resolve
 * @returns {string} - Resolved path
 */
function resolveTemplatePath(templatePath) {
    // Use config if available, otherwise use templatePath as is
    if (window.PrimeBeefConfig) {
        return window.PrimeBeefConfig.resolveTemplatePath(templatePath);
    }
    return templatePath;
}

/**
 * Loads a template from a file and caches it
 * @param {string} templatePath - Path to the template file
 * @returns {Promise<DocumentFragment>} - Promise resolving to the template content
 */
async function loadTemplate(templatePath) {
    // Resolve the template path with the base path
    const resolvedPath = resolveTemplatePath(templatePath);

    console.log('Loading template from:', resolvedPath);

    // Check cache first
    if (templateCache[templatePath]) {
        console.log('Template found in cache:', templatePath);
        return templateCache[templatePath];
    }

    // Show loader if needed
    const showLoader = !isLoading;
    if (showLoader) {
        isLoading = true;
        showPageLoader();
    }

    try {
        // Fetch the template file
        console.log('Fetching template:', resolvedPath);
        const response = await fetch(resolvedPath);

        if (!response.ok) {
            throw new Error(`Failed to load template: ${response.status} ${response.statusText}`);
        }

        const html = await response.text();

        // Create a temporary container
        const temp = document.createElement('div');
        temp.innerHTML = html;

        // Find all templates in the loaded HTML
        const templateElements = temp.querySelectorAll('template');

        // Cache each template by its ID
        templateElements.forEach(template => {
            if (template.id) {
                console.log('Caching template with ID:', template.id);
                templateCache[template.id] = document.importNode(template.content, true);
            }
        });

        // Return the first template or a fragment with all content
        if (templateElements.length > 0 && templateElements[0].id) {
            return templateCache[templateElements[0].id];
        } else {
            // If no template with ID was found, cache the entire content
            const fragment = document.createDocumentFragment();
            while (temp.firstChild) {
                fragment.appendChild(temp.firstChild);
            }
            templateCache[templatePath] = fragment;
            return fragment;
        }
    } catch (error) {
        console.error(`Error loading template ${templatePath}:`, error);
        // Return an error template
        const errorFragment = document.createDocumentFragment();
        const errorElement = document.createElement('div');
        errorElement.className = 'p-8 text-center';
        errorElement.innerHTML = `
      <h2 class="text-2xl font-bold text-red-600 mb-4">Error Loading Content</h2>
      <p class="text-gray-700 mb-4">Sorry, we couldn't load the requested content.</p>
      <p class="text-gray-500 mb-4">Path: ${resolvedPath}</p>
      <p class="text-gray-500 mb-4">Error: ${error.message}</p>
      <button onclick="window.location.href='${window.PrimeBeefConfig ? window.PrimeBeefConfig.basePath : '/'}/'" class="bg-red-800 hover:bg-red-900 text-white px-4 py-2 rounded-lg">
        Return to Home
      </button>
    `;
        errorFragment.appendChild(errorElement);
        return errorFragment;
    } finally {
        // Hide loader if we started it
        if (showLoader) {
            isLoading = false;
            hidePageLoader();

            // Process any queued loads
            processQueue();
        }
    }
}

/**
 * Process queued template loads
 */
function processQueue() {
    if (loadQueue.length > 0 && !isLoading) {
        const nextLoad = loadQueue.shift();
        loadTemplate(nextLoad.path).then(nextLoad.callback);
    }
}

/**
 * Queue a template load if another is in progress
 * @param {string} templatePath - Path to template
 * @param {Function} callback - Callback to run with loaded template
 */
function queueTemplateLoad(templatePath, callback) {
    if (isLoading) {
        loadQueue.push({ path: templatePath, callback });
    } else {
        loadTemplate(templatePath).then(callback);
    }
}

/**
 * Show a loading indicator
 */
function showPageLoader() {
    // Check if loader already exists
    let loader = document.getElementById('page-loader');

    if (!loader) {
        loader = document.createElement('div');
        loader.id = 'page-loader';
        loader.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        loader.innerHTML = `
      <div class="bg-white p-4 rounded-lg shadow-lg">
        <div class="flex items-center">
          <svg class="animate-spin h-6 w-6 text-red-800 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span class="text-gray-700 font-medium">Loading...</span>
        </div>
      </div>
    `;
        document.body.appendChild(loader);
    } else {
        loader.style.display = 'flex';
    }
}

/**
 * Hide the loading indicator
 */
function hidePageLoader() {
    const loader = document.getElementById('page-loader');
    if (loader) {
        loader.style.display = 'none';
    }
}

/**
 * Get a template from cache or load it from file
 * @param {string} templateId - Template ID to retrieve
 * @param {string} templatePath - Path to load if not in cache
 * @returns {Promise<DocumentFragment>} - The requested template
 */
async function getTemplate(templateId, templatePath) {
    // Check if template is already in cache
    if (templateCache[templateId]) {
        return templateCache[templateId];
    }

    // Load the template file
    return await loadTemplate(templatePath);
}

/**
 * Preload templates to improve performance
 * @param {Array<string>} templatePaths - Array of paths to preload
 * @returns {Promise<void>}
 */
async function preloadTemplates(templatePaths) {
    const promises = templatePaths.map(path => loadTemplate(path));
    await Promise.all(promises);
}

// Export the component loader
window.ComponentLoader = {
    load: loadTemplate,
    get: getTemplate,
    preload: preloadTemplates,
    cache: templateCache
};