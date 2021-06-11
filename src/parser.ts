import { createWriteStream, WriteStream } from 'fs'

import {
  SchemaDefinition,
  KindEnum,
  FullType,
  Field,
} from './introspectionTypes'
import {
  enumWrapper,
  interfaceWrapper, unionWrapper,
} from "./wrappers";
import { graphqlScalarToTypescript } from "./helpers";

export interface ParserConfig {
  excludeNames: string[],
  excludeKinds: KindEnum[],
  outputFile: string,
  enumAsTypes: boolean,
}

const defaultConfig: ParserConfig = {
  excludeNames: ['Query', 'Mutation', 'Subscription'],
  excludeKinds: [],
  outputFile: 'types.ts',
  enumAsTypes: true,
}

class Parser {
  config: ParserConfig
  outputFileStream: WriteStream

  constructor(config: ParserConfig = defaultConfig) {
    this.config = config
    this.outputFileStream = createWriteStream(config.outputFile)
  }

  _cleanup = () => this.outputFileStream.close()

  isNestedType = (typeKind: KindEnum) => {
    return typeKind === 'NON_NULL' || typeKind === 'LIST'
  }

  processFields = (fieldIterator: IterableIterator<Field>, types: string[] = [], isNextList?: boolean): string[] => {
    const { name: fieldName, type } = fieldIterator.next().value ?? {}

    if (type === undefined) return types

    const isNestedType = this.isNestedType(type.kind)
    const convertedType = graphqlScalarToTypescript(!isNestedType ? type.name : type.ofType.name)

    return this.processFields(
      fieldIterator,
      [
        ...types,
        `${fieldName}: ${convertedType}${type.kind === 'LIST' ? '[]' : ''}`,
      ]
    )
  }

  processFullType = (type: FullType): string => {
    switch (type.kind) {
      case "ENUM":
        return enumWrapper(type, this.config.enumAsTypes)
      case "INTERFACE":
      case "OBJECT":
        return interfaceWrapper(type.name, this.processFields(type.fields[Symbol.iterator]()).join(',\n  '))
      case "UNION":
        return unionWrapper(type)
      default:
        break
    }
  }

  isTypeHandled = ({kind, name}: FullType) => !this.config.excludeKinds.includes(kind)
    && !this.config.excludeNames.includes(name);

  parse = ({__schema: {types}}: SchemaDefinition) => {
    types.map((type) => {
      if (!this.isTypeHandled(type)) return

      const processedType = this.processFullType(type)

      if (typeof processedType === 'string' && processedType.length)
        this.outputFileStream.write(processedType + '\n')
    })
    this._cleanup()
  }
}

export default Parser
