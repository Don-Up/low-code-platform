// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
    dir: './', // Next.js 项目根目录
})

const customJestConfig = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testEnvironment: 'jsdom',
}

module.exports = createJestConfig(customJestConfig)