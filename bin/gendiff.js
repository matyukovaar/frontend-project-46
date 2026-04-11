#!/usr/bin/env node

import { Command } from 'commander'
import { parseFile } from '../src/parsers.js'
import path from 'path'
const program = new Command()

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, --version', 'output the version number')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .helpOption('-h, --help', 'display help for command')
  .action((filepath1, filepath2) => {
      const fullPath1 = path.resolve(process.cwd(), filepath1)
      const fullPath2 = path.resolve(process.cwd(), filepath2)
      const data1 = parseFile(fullPath1)
      const data2 = parseFile(fullPath2)
  })

program.parse(process.argv)
