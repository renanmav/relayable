jest.mock('../src/core/logger')

global.fetch = require('jest-fetch-mock')

jest.setTimeout(30000)
