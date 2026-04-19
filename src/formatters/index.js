import stylish from './stylish.js'

const format = (tree, formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish(tree)
    default:
      return stylish(tree)
  }
}
export default format
