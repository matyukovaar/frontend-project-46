const stringify = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]'
  }
  if (typeof value === 'string') {
    return `'${value}'`
  }
  return `${value}`
}

const plain = (tree, ancestry = []) => {
  const result = tree
    .filter(node => node.type !== 'unchanged')
    .map((node) => {
      const propertyName = [...ancestry, node.key].join('.')
      switch (node.type) {
        case 'nested':
          return plain(node.children, [...ancestry, node.key])
        case 'added':
          return `Property '${propertyName}' was added with value: ${stringify(node.value)}`
        case 'removed':
          return `Property '${propertyName}' was removed`
        case 'updated':
          return `Property '${propertyName}' was updated. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}`
        default:
          throw new Error(`Unknown type: ${node.type}`)
      }
    })
  return result.join('\n')
}

export default plain
