#!/usr/bin/env node

import { Command } from 'commander'
import genDiff from '../src/index.js'

const program = new Command()

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, --version', 'output the version number')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .helpOption('-h, --help', 'display help for command')
  .action((filepath1, filepath2, options) => {
    const format = options.format === true ? 'stylish' : options.format
    const result = genDiff(filepath1, filepath2, format)
    console.log(result)
  })

program.parse(process.argv)
