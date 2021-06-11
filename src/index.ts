#!/usr/bin/env node

import { request } from 'graphql-request'
import query from './introspection.gql'
import Parser, { ParserConfig } from './parser'
import { SchemaDefinition } from './introspectionTypes'

(async () => {
  if (process.argv.length !== 3) throw new Error('Usage: ./script <https://random-url/graphql>')

  const parser = new Parser()
  const [, , url] = process.argv

  try {
    const response = await request<SchemaDefinition>(url, query)
    parser.parse(response)
  } catch (e) {
    console.warn('Unable to fetch/parse schema')
  }
})()
