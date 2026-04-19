import _ from 'lodash'
function buildTree(data1, data2) {
  const keys = _.sortBy(_.union(_.keys(data1), _.keys(data2)))
  return keys.map((key) => {
    if (!Object.hasOwn(data2, key)) {
      return { key, type: 'removed', value: data1[key] }
    }
    if (!Object.hasOwn(data1, key)) {
      return { key, type: 'added', value: data2[key] }
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return {
        key,
        type: 'nested',
        children: buildTree(data1[key], data2[key]),
      }
    }

    if (data1[key] !== data2[key]) {
      return { key, type: 'updated', oldValue: data1[key], newValue: data2[key] }
    }

    if (data1[key] === data2[key]) {
      return { key, type: 'equal', value: data1[key] }
    }
  })
}
export default buildTree
