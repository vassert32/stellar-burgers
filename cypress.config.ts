import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3434',
    setupNodeEvents(eventRegistrar, currentConfig) {
      // можно зарегистрировать обработчики событий, если нужно
      return currentConfig;
    }
  }
});
