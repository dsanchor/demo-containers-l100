// This file will be used to inject environment variables at runtime
export const environment = {
  production: false,
  backgroundColor: '#ffffff'
};

// Function to load environment variables from window object
// These can be injected at container startup
export function getEnvironment() {
  const win = window as any;
  return {
    ...environment,
    backgroundColor: win.ENV_BACKGROUND_COLOR || environment.backgroundColor
  };
}
