import path from 'path'
import fs from 'fs'
import yaml from 'js-yaml'

export function parseFile(filepath) {
  const content = fs.readFileSync(path.resolve(filepath), 'utf-8')
  const format = path.extname(filepath).toLowerCase()

  if (format === '.json') {
    return JSON.parse(content)
  }
  if (format === '.yml' || format === '.yaml') {
    return yaml.load(content) || {}
  }
}
