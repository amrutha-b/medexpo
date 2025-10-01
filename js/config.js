// Environment Configuration for Med Expo
// This file handles environment variables and API configuration

class Config {
    constructor() {
        // Default configuration
        this.config = {
            // API Endpoints
            rxnormApiUrl: 'https://rxnav.nlm.nih.gov/REST',
            
            // Future API configurations (when you add API keys)
            fdaApiUrl: 'https://api.fda.gov',
            fdaApiKey: this.getEnvVar('FDA_API_KEY', null),
            
            // Application settings
            appName: this.getEnvVar('APP_NAME', 'Med Expo'),
            appVersion: this.getEnvVar('APP_VERSION', '2.0'),
            environment: this.getEnvVar('NODE_ENV', 'development'),
            
            // Feature flags
            enableRxNormAPI: true,
            enableFDAAPI: false,
            enableOfflineMode: true,
            
            // Rate limiting
            apiCallDelay: 100, // ms between API calls
            maxRetries: 3,
            
            // UI Configuration
            theme: this.getEnvVar('APP_THEME', 'professional'),
            enableDebug: this.getEnvVar('DEBUG', 'false') === 'true'
        };
    }

    // Get environment variable with fallback
    getEnvVar(key, defaultValue = null) {
        // In a browser environment, you might get these from:
        // 1. Build-time environment variables (Webpack, Vite, etc.)
        // 2. Runtime configuration loaded from a config endpoint
        // 3. Local storage for user preferences
        
        if (typeof process !== 'undefined' && process.env) {
            return process.env[key] || defaultValue;
        }
        
        // Fallback for browser environment
        return defaultValue;
    }

    // Get configuration value
    get(key) {
        return this.config[key];
    }

    // Set configuration value
    set(key, value) {
        this.config[key] = value;
    }

    // Check if feature is enabled
    isFeatureEnabled(feature) {
        return this.config[`enable${feature}`] || false;
    }

    // Get API configuration
    getAPIConfig(apiName) {
        switch(apiName.toLowerCase()) {
            case 'rxnorm':
                return {
                    baseUrl: this.config.rxnormApiUrl,
                    requiresKey: false,
                    enabled: this.config.enableRxNormAPI
                };
            case 'fda':
                return {
                    baseUrl: this.config.fdaApiUrl,
                    apiKey: this.config.fdaApiKey,
                    requiresKey: true,
                    enabled: this.config.enableFDAAPI && !!this.config.fdaApiKey
                };
            default:
                return null;
        }
    }

    // Debug logging
    log(message, data = null) {
        if (this.config.enableDebug) {
            console.log(`[${this.config.appName}] ${message}`, data || '');
        }
    }
}

// Create global config instance
const AppConfig = new Config();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AppConfig;
}