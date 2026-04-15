// @ts-check
import { expect, test } from '@jest/globals'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { genDiff } from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '__fixtures__', filename)

test('genDiff, JSON', () => {
  const path1 = getFixturePath('file1.json')
  const path2 = getFixturePath('file2.json')
  const expectedResult = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`
  const result = genDiff(path1, path2)
  expect(result).toBe(expectedResult)
})

test('genDiff, .yaml', () => {
  const path1 = getFixturePath('file1.yaml')
  const path2 = getFixturePath('file2.yaml')
  const expectedResult = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`
  const result = genDiff(path1, path2)
  expect(result).toBe(expectedResult)
})

test('genDiff, .yml', () => {
  const path1 = getFixturePath('file1.yml')
  const path2 = getFixturePath('file2.yml')
  const expectedResult = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`
  const result = genDiff(path1, path2)
  expect(result).toBe(expectedResult)
})
