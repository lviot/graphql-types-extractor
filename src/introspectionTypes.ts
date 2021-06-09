export type KindEnum =
  'SCALAR'
  | 'OBJECT'
  | 'INTERFACE'
  | 'UNION'
  | 'ENUM'
  | 'INPUT_OBJECT'
  | 'LIST'
  | 'NON_NULL'

export type ScalarType =
  'Int'
  | 'Float'
  | 'Long'
  | 'String'
  | 'Boolean'
  | 'ID'

export interface TypeRef {
  name: string,
  kind: KindEnum,
  ofType: TypeRef,
}

export interface InputValue {
  name: string,
  type: TypeRef,
  defaultValue: string,
}

export interface Field {
  name: string,
  args: InputValue[],
  type: TypeRef
}

export interface EnumValue {
  name: string,
}

export interface FullType {
  kind: KindEnum,
  name: string,
  fields: Field[],
  inputFields: InputValue[],
  interfaces: TypeRef[],
  enumValues: EnumValue[],
  possibleTypes: TypeRef[],
}

export interface SchemaDefinition {
  __schema: {
    types: FullType[],
  },
}
