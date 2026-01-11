const config = {
  preset: 'jest-preset-angular',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/cypress/',
  ],
  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/src/app/components/$1',
    '^@services/(.*)$': '<rootDir>/src/app/services/$1',
    '^@data/(.*)$': '<rootDir>/src/data/$1',
    '^@pages/(.*)$': '<rootDir>/src/app/pages/$1',
    '^@env/(.*)$': '<rootDir>/src/environments/$1',
    '^@utils$': '<rootDir>/src/utils.ts',
  },
};

export default config;
