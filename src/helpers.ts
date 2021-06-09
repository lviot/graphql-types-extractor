import { ScalarType } from "./introspectionTypes"

const typesMap = new Map<ScalarType, string>([
  ['Int', 'number'],
  ['Float', 'number'],
  ['Long', 'number'],
  ['String', 'string'],
  ['Boolean', 'boolean'],
  ['ID', 'string'],
])

export const graphqlScalarToTypescript = (graphqlType: ScalarType): string => typesMap.get(graphqlType) || graphqlType
