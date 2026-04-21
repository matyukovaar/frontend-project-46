// @ts-check
import { expect, test, describe } from '@jest/globals'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import genDiff from '../src/gendiff.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '__fixtures__', filename)

const readFile = filename => fs.readFileSync(getFixturePath(filename), 'utf-8')

describe('Gendiff', () => {
  const expectedStylish = readFile('expectedStylish.txt').trim()
  const expectedPlain = readFile('expectedPlain.txt').trim()
  const expectedJson = readFile('expectedJson.txt').trim()

  const extensions = ['json', 'yml']
  test.each(extensions)('works with %s files', (ext) => {
    const filePath1 = getFixturePath(`file1.${ext}`)
    const filePath2 = getFixturePath(`file2.${ext}`)
    expect(genDiff(filePath1, filePath2)).toEqual(expectedStylish)
  })

  test('format test stylish', () => {
    const filePath1 = getFixturePath('file1.json')
    const filePath2 = getFixturePath('file2.json')
    expect(genDiff(filePath1, filePath2, 'stylish')).toEqual(expectedStylish)
  })

  test('format test plain', () => {
    const filePath1 = getFixturePath('file1.json')
    const filePath2 = getFixturePath('file2.json')
    expect(genDiff(filePath1, filePath2, 'plain')).toEqual(expectedPlain)
  })

  test('format test json', () => {
    const filePath1 = getFixturePath('file1.json')
    const filePath2 = getFixturePath('file2.json')
    expect(genDiff(filePath1, filePath2, 'json')).toEqual(expectedJson)
  })

  test('test stylish as default format', () => {
    const filePath1 = getFixturePath('file1.json')
    const filePath2 = getFixturePath('file2.json')
    expect(genDiff(filePath1, filePath2)).toEqual(expectedStylish)
  })
})
