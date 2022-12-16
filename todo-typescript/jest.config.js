module.exports = {
  preset: 'ts-jest',
  // テスト環境を設定
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
  // パスの起点を設定
  roots: ['src'],
  // テスト用のファイルを指定
  testMatch: ['**/?(*.)+(spec|test).+(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleDirectories: ['node_modules', 'src'],
  // moduleNameMapper: {
  //   'src/(.*)': '<rootDir>/src/$1',
  // },
};
