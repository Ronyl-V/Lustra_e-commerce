module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['import'],
    extends: [
      'eslint:recommended',
      'plugin:import/errors',
      'plugin:import/warnings',
      'plugin:import/typescript',
    ],
    rules: {
      'import/no-duplicates': 'error',
    },
  };
  