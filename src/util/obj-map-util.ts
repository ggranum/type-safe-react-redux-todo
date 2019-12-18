import {ObjMap} from './obj-map'
export class ObjMapUtil {

  static fromKeyedEntityArray<V>(values: V[], keyField: string = '$key'): ObjMap<V> {
    values = values || []
    const m: ObjMap<V> = {}
    for (let i = 0; i < values.length; i++) {
      let value:any = values[i] // it's of type V, but compiler is unhappy about referencing a key on an unknown type.
      // ( because TS cannot determine if 'V' has field 'keyField' or not )
      let x:any = value[keyField]
      m[x] = value
    }
    return m
  }

  static toKeyedEntityArray<V>(map: ObjMap<V>, keyField: string = '$key'): V[] {
    return Object.keys(map).map((key) => {
      const keyObj:any = {}
      keyObj[keyField] = key
      return Object.assign({}, map[key], keyObj)
    })
  }

  static toTruthMap<V>(map: ObjMap<V>): ObjMap<boolean> {
    const result: ObjMap<boolean> = {}
    Object.keys(map).forEach((key) => {
      result[key] = true
    })
    return result
  }

  static addAll<V>(map: ObjMap<V>, mapB: ObjMap<V>, noOverwrite: boolean = false): ObjMap<V> {
    map = map || {}
    mapB = mapB || {}
    Object.keys(mapB).forEach((key: string) => {
      if (noOverwrite && map[key] !== undefined) {
        throw new Error(`Key already exists on map, cannot replace: ${key}.`)
      }
      map[key] = mapB[key]
    })
    return map
  }

  static removeAll<V>(map: ObjMap<V>, mapB: ObjMap<V>) {
    Object.keys(mapB).forEach((key: string) => {
      if (map[key] !== undefined) {
        delete map[key]
      }
    })
  }

}
