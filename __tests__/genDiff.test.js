// @ts-check
import { expect, test } from '@jest/globals';
import path from 'path'; 
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { genDiff } from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..','__tests__',  '__fixtures__', filename);

test('genDiff ', () => {
  const path1 = getFixturePath('file1.json')
  const path2 = getFixturePath('file2.json')
  const expectedResult = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
  const result = genDiff(path1, path2)
  expect(result).toBe(expectedResult)
});
