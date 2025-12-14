// This file will be used to inject environment variables at runtime
export const environment = {
  production: false,
  backgroundColor: '#ffffff'
};

// Define window interface extension
declare global {
  interface Window {
    ENV_BACKGROUND_COLOR?: string;
  }
}

// Function to load environment variables from window object
// These can be injected at container startup
export function getEnvironment() {
  return {
    ...environment,
    backgroundColor: window.ENV_BACKGROUND_COLOR || environment.backgroundColor
  };
}
