import _ from 'lodash'

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return `${value}`
  }
  const indentSize = depth * 4
  const currentIndent = ' '.repeat(indentSize + 4)
  const bracketIndent = ' '.repeat(indentSize)

  const lines = Object.entries(value).map(
    ([key, val]) => `${currentIndent}${key}: ${stringify(val, depth + 1)}`,
  )

  return ['{', ...lines, `${bracketIndent}}`].join('\n')
}

function stylish(tree, depth = 1) {
  const indentSize = depth * 4
  const beforeOperatirIndent = ' '.repeat(indentSize - 2)
  const currentIndent = ' '.repeat(indentSize)
  const lines = _.flatMap(tree, (node) => {
    switch (node.type) {
      case 'nested':
        return `${currentIndent}${node.key}: ${stylish(node.children, depth + 1)}`
      case 'updated':
        return [
          `${beforeOperatirIndent}- ${node.key}: ${stringify(node.oldValue, depth)}`,
          `${beforeOperatirIndent}+ ${node.key}: ${stringify(node.newValue, depth)}`,
        ]
      case 'equal':
        return `${currentIndent}${node.key}: ${stringify(node.value, depth)}`
      case 'added':
        return `${beforeOperatirIndent}+ ${node.key}: ${stringify(node.value, depth)}`
      case 'removed':
        return `${beforeOperatirIndent}- ${node.key}: ${stringify(node.value, depth)}`
      default:
        throw new Error(`Unknown type: ${node.type}`)
    }
  })

  const beforeBracketIndent = ' '.repeat(indentSize - 4)
  return ['{', ...lines, `${beforeBracketIndent}}`].join('\n')
}

export default stylish
