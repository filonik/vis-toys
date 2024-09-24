import {iso, type Isomorphism} from "@/lib/morphisms"

import JSON5 from 'json5'

type JsonOptions = {
  reviver?: any
  replacer?: any
  space?: number
}

const json5Encode: (options?: JsonOptions) => (value: string) => any = ({reviver} = {}) => (value) => JSON5.parse(value, reviver)
const json5Decode: (options?: JsonOptions) => (value: any) => string = ({replacer, space} = {})=> (value) => JSON5.stringify(value, replacer, space)

export const stringToJson5: (options?: JsonOptions) => Isomorphism<string, any> = (options) => iso(json5Encode(options), json5Decode(options))


const base64UrlEncode: (value: string) => string = (value) => {
  return btoa(value).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

const base64UrlDecode: (value: string) => string = (value) => {
  return atob(value.replace(/-/g, '+').replace(/_/g, '/'));
}

export const stringToBase64Url: Isomorphism<string, string> = iso(base64UrlEncode, base64UrlDecode)
export const base64UrlToString: Isomorphism<string, string> = iso(base64UrlDecode, base64UrlEncode)
