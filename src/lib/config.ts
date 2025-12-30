// Centralized configuration for environment variables

const getEnvVar = (key: string, defaultValue?: string): string => {
    const value = import.meta.env[key];
    if (value === undefined || value === null) {
        if (defaultValue !== undefined) {
            return defaultValue;
        }
        console.warn(`Missing environment variable: ${key}`);
        return '';
    }
    return value;
};

export const config = {
    // Backend API URL. Priority: VITE_API_BASE_URL -> VITE_STRATEGY_API_URL -> /api (proxy)
    apiBaseUrl: getEnvVar('VITE_API_BASE_URL', getEnvVar('VITE_STRATEGY_API_URL', '')),

    // Strategy API URL. Priority: VITE_STRATEGY_API_URL -> VITE_API_BASE_URL
    strategyApiUrl: getEnvVar('VITE_STRATEGY_API_URL', getEnvVar('VITE_API_BASE_URL', '')),

    // Ghost Blog Configuration
    ghost: {
        apiUrl: getEnvVar('VITE_GHOST_API_URL'),
        contentApiKey: getEnvVar('VITE_GHOST_CONTENT_API_KEY'),
    },

    // App Configuration
    appUrl: getEnvVar('VITE_APP_URL', 'https://worldsun-official-website.zeabur.app'),
};

// Helper to ensure API URL doesn't have trailing slash
export const getApiUrl = () => {
    let url = config.apiBaseUrl;
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    return url;
};

export const getStrategyApiUrl = () => {
    let url = config.strategyApiUrl;
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    return url;
};
