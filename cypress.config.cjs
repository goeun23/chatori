const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173', // Vite 기본 포트

    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config;
    },
  },
});
