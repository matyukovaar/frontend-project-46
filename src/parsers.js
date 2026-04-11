import path from 'path'
import fs from 'fs'

export function parseFile(filepath) {
    const content = fs.readFileSync(filepath, 'utf-8')
    const format = path.extname(filepath)
    if(format === ".json") {
        return JSON.parse(content)
    }
}
