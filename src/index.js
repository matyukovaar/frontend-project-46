import { parseFile } from './parsers.js'
import buildTree from './buildTree.js'
import format from './formatters/index.js'

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = parseFile(filepath1)
  const data2 = parseFile(filepath2)
  const diffTree = buildTree(data1, data2)
  return format(diffTree, formatName)
}

export default genDiff
