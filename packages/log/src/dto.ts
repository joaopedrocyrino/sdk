export interface IObjectInput {
  [k: string]:
    | Array<any>
    | string
    | number
    | undefined
    | boolean
    | { [k: string]: any };
}
