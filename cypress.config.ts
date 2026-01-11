import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: false, // Disabling support file for simplicity if not needed
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
