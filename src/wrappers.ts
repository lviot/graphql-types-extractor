import { FullType } from "./introspectionTypes"

export const enumTemplate = ({name, enumValues}: FullType, enumAsType: boolean): string => {
  if (enumAsType) {
    const values = enumValues.map(({name}) => `'${name}'`).join(' | ')
    return `export type ${name} = ${values}\n`
  }
  return `export enum ${name} {\n  ${enumValues.map(({name}) => name).join(',\n  ')}\n}\n`
}

export const interfaceTemplate = (name: string, content: string): string => {
  return `interface ${name} {\n  ${content}\n}\n`
}
