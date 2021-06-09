export type KindEnum =
  'SCALAR'
  | 'OBJECT'
  | 'INTERFACE'
  | 'UNION'
  | 'ENUM'
  | 'INPUT_OBJECT'
  | 'LIST'
  | 'NON_NULL'

export interface TypeRef {
  kind: KindEnum,
  name: string,
  ofType: TypeRef,
}

export interface Field {
  name: string,
  args: InputValue[],
  type: TypeRef
}

export interface InputValue {
  name: string,
  description: string,
  type: TypeRef,
  defaultValue: string,
}

export interface FullType {
  kind: KindEnum,
  name: string,
  fields: Field[],
  inputFields: InputValue[],
  interfaces: TypeRef[],
  enumValues: string[],
  possibleTypes: TypeRef[],
}

export interface SchemaDefinition {
  __schema: {
    types: FullType[],
  },
}
