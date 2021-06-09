import { FullType } from "./introspectionTypes"

export const enumWrapper = ({name, enumValues}: FullType, enumAsType: boolean): string => {
  if (enumAsType) {
    const values = enumValues.map(({name}) => `'${name}'`).join(' | ')
    return `export type ${name} = ${values}\n`
  }
  return `export enum ${name} {\n  ${enumValues.map(({name}) => name).join(',\n  ')}\n}\n`
}

export const unionWrapper = ({name, possibleTypes}: FullType): string => {
  return `type ${name} = ${possibleTypes.map(({ name }) => name).join(' | ')}\n`
}

export const interfaceWrapper = (name: string, content: string): string => {
  return `interface ${name} {\n  ${content}\n}\n`
}
